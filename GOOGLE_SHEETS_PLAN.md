# Google Sheets Form Storage Plan

## Goal

Replace the current Firebase plus Google Apps Script form flow with Google Sheets as the only storage system.

The website will continue to use the existing custom forms. Submissions will be sent to one Google Apps Script web app, which will validate and save the data into a protected Google Spreadsheet.

## Current State

- `index.html` is the production page.
- `blooming-birds-daycare.html` is a legacy duplicate.
- `script.js` currently writes enrollment data to Firestore collection `enrollments`.
- `script.js` currently writes contact data to Firestore collection `messages`.
- Both forms also POST JSON to an existing hard-coded Google Apps Script endpoint.
- The Apps Script source is not present in this repository.
- The Apps Script request is not awaited and its response is not checked.
- The current browser validation is not a replacement for server-side validation.
- The legacy page form fields do not match the names and IDs expected by `script.js` and can fail on submission.

## Target Architecture

1. The browser validates the form for immediate user feedback.
2. The browser creates a unique `submissionId` and sends one JSON request.
3. Google Apps Script receives the request through `doPost(e)`.
4. Apps Script validates and normalizes the request again.
5. Apps Script rejects invalid, oversized, duplicate, or spam submissions.
6. Apps Script writes the record to the correct spreadsheet tab.
7. Apps Script sends an internal notification email.
8. Apps Script optionally sends an acknowledgement email to the parent.
9. The website displays a success or failure message based on the configured submission flow.

Google Sheets will be the only data store. Firebase will be removed from the website after the Apps Script flow is verified.

## Spreadsheet Design

Use one Google Spreadsheet with two tabs.

### `Enrollments`

Columns:

```text
Submission ID
Timestamp
Status
Child First Name
Child Last Name
Date of Birth
Program
Parent Name
Phone
Email
Start Date
Tour Date
Notes
```

The initial status should be `New`.

Recommended later statuses:

```text
New
Contacted
Tour Scheduled
Application Reviewed
Enrolled
Closed
```

### `Messages`

Columns:

```text
Submission ID
Timestamp
Status
Name
Email
Subject
Message
```

The initial status should be `New`.

Recommended later statuses:

```text
New
Replied
Closed
```

## Apps Script Scope

Create a local reference file at `apps-script/Code.gs` for the script that will be copied into Google Apps Script.

Create `apps-script/README.md` with deployment and configuration instructions.

The Apps Script should provide these responsibilities:

### Request handling

- Implement `doPost(e)`.
- Parse JSON from `e.postData.contents`.
- Accept only `formType` values of `enrollment` or `message`.
- Return a consistent JSON result containing `success`, `submissionId`, and an error message when applicable.
- Avoid exposing submitted personal information in logs.

### Validation

- Validate required fields on the server.
- Validate allowed program values.
- Validate email format and reasonable phone format.
- Validate date formats.
- Reject future dates where inappropriate.
- Enforce the same age and program rules as the website where practical.
- Enforce maximum lengths for every field.
- Reject empty or suspicious messages.
- Reject unknown fields only if that will not prevent future form extensions.

### Data safety

- Add a server-generated timestamp.
- Use a unique submission ID.
- Escape values beginning with `=`, `+`, `-`, or `@` before writing to Sheets to prevent formula injection.
- Store configuration in Apps Script Properties, not in the repository.
- Use `LockService` around sheet writes to reduce concurrent-write conflicts.
- Use `PropertiesService` or a sheet lookup to detect duplicate submission IDs.

### Spam protection

Initial protection:

- Add a hidden honeypot field to both website forms.
- Reject submissions when the honeypot contains text.
- Add server-side per-email throttling.
- Keep the existing client-side five-second rate limit.

Optional stronger protection:

- Add Cloudflare Turnstile.
- Store the Turnstile secret in Apps Script Properties.
- Verify the token server-side before writing to Sheets.

### Notifications

- Send a notification email to the configured daycare email for every accepted enrollment.
- Send a notification email for every accepted contact message.
- Include the submission ID and a link to the relevant spreadsheet tab where practical.
- Optionally send a plain acknowledgement email to the parent or visitor.
- Do not include more sensitive information in email than necessary.

### Spreadsheet management

- Open the configured spreadsheet by ID.
- Create the `Enrollments` and `Messages` tabs if they do not exist.
- Add the expected header row if a tab is new.
- Append records in a fixed column order.
- Apply basic header formatting and freeze the header row if desired.
- Keep staff workflow fields such as `Status` separate from user-submitted values.

### Optional maintenance

- Add a time-driven archive job for old records.
- Export or copy older records to a protected archive spreadsheet.
- Keep a small operational log without storing full child or message content.
- Add a health-check function for manual testing.

## Website Changes

Update `script.js` and both HTML pages as one coordinated change.

### `script.js`

- Remove Firebase `addDoc` calls.
- Create a `submissionId` for each submission.
- Send the enrollment or message payload once to the Apps Script endpoint.
- Await the request where the browser can inspect the response.
- Handle network errors separately from server validation errors.
- Do not reset the form until the configured success path is complete.
- Preserve the existing validation and rate-limit behavior.
- Keep payload field names stable unless the Apps Script schema is changed at the same time.

### HTML pages

- Remove Firebase module imports and Firebase configuration from `index.html`.
- Remove Firebase module imports and Firebase configuration from `blooming-birds-daycare.html`.
- Add the honeypot field to both forms if that protection is selected.
- Repair the legacy page form names and IDs, or redirect the legacy page to `index.html`.
- Keep both pages using the same payload names if both remain publicly accessible.

### Cross-origin response decision

Direct browser requests to an Apps Script web app can have cross-origin response limitations. The implementation must test the deployed endpoint from the real site.

Options:

1. Use a direct simple POST and rely on the Apps Script write and notification email.
2. Use a lightweight Netlify Function as a proxy if reliable browser response confirmation is required.

The proxy would not become the data store. Google Sheets would remain the only storage system.

## Configuration Needed

The following information is required before implementation:

1. Google Spreadsheet ID.
   - This is the value between `/d/` and `/edit` in the spreadsheet URL.
2. Internal notification email address.
3. Additional notification email addresses, if any.
4. Whether parent acknowledgement emails should be sent.
5. The sender/reply-to email policy for acknowledgement messages.
6. Whether to use the simple honeypot or Cloudflare Turnstile.
7. Whether `blooming-birds-daycare.html` should be repaired or redirected to `index.html`.
8. Spreadsheet timezone, preferably the daycare's local timezone.
9. Data retention period for child and parent information.
10. Whether automatic archiving should be enabled.
11. Whether the Google account is a personal account or Google Workspace account.

Do not put Google account passwords, OAuth tokens, or Apps Script secrets in this repository.

## Google Sheets and Apps Script Setup

These are the practical setup steps before the website is connected to the new endpoint.

1. Create or open the Google Spreadsheet that will store submissions.
2. Do not paste `Code.gs` into spreadsheet cells.
3. From the spreadsheet, open `Extensions` -> `Apps Script`.
4. Open the default `Code.gs` file in the Apps Script editor.
5. Delete the sample code and paste the contents of `apps-script/Code.gs`.
6. Save the Apps Script project.
7. Open `Project Settings` -> `Script Properties`.
8. Add `SPREADSHEET_ID` using the value between `/d/` and `/edit` in the spreadsheet URL.
9. Add `NOTIFICATION_EMAIL` using the internal daycare email address.
10. Optionally add `ACKNOWLEDGEMENT_ENABLED` and set it to `false` initially.
11. Optionally add `TIMEZONE` and set it to `America/Vancouver` or the daycare's actual timezone.
12. Optionally add `RATE_LIMIT_SECONDS` and set it to `60`.
13. Set the Apps Script project timezone to the daycare's local timezone.
14. Run the `doGet` function once and approve the requested Google permissions.
15. Select `Deploy` -> `New deployment`.
16. Select `Web app` as the deployment type.
17. Set `Execute as` to the spreadsheet owner.
18. Set `Who has access` to `Anyone` so the public website can submit forms.
19. Deploy the web app and copy the URL ending in `/exec`.
20. Test the endpoint using the command in `apps-script/README.md`.
21. Confirm a test row appears in the correct tab and the notification email arrives.
22. Keep the new `/exec` URL available for the later website integration step.

The Apps Script code runs in Google's Apps Script editor. The local `apps-script/Code.gs` file is the source to copy; it is not automatically connected to Google Sheets or deployed by the repository.

## Deployment Plan

1. Create or select the Google Spreadsheet.
2. Create the `Enrollments` and `Messages` tabs.
3. Create the Apps Script project from `Extensions` -> `Apps Script`, or use a standalone Apps Script project.
4. Paste `apps-script/Code.gs` into the Apps Script editor.
5. Configure the `SPREADSHEET_ID` Script Property.
6. Configure the `NOTIFICATION_EMAIL` Script Property.
7. Configure `ACKNOWLEDGEMENT_ENABLED`, `TIMEZONE`, and the optional Turnstile secret if needed.
8. Authorize the spreadsheet and email permissions.
9. Deploy as a web app.
10. Configure execution as the spreadsheet owner.
11. Restrict spreadsheet access to authorized staff.
12. Record the deployed web app URL in the website configuration.
13. Test the endpoint with valid and invalid enrollment payloads.
14. Test the endpoint with valid and invalid contact payloads.
15. Confirm rows, statuses, timestamps, and emails.
16. Remove Firebase only after Google Sheets delivery is verified.
17. Publish the website changes.

## Verification Checklist

### Enrollment

- Valid enrollment creates exactly one row in `Enrollments`.
- Invalid enrollment is rejected server-side.
- Program and date rules are enforced.
- Notes and special-needs information are stored in the correct column.
- Notification email is received.
- Optional acknowledgement email is received.
- Duplicate submission IDs do not create duplicate rows.

### Contact

- Valid message creates exactly one row in `Messages`.
- Invalid email and short messages are rejected server-side.
- Notification email is received.
- Optional acknowledgement email is received.

### Security and reliability

- Honeypot submissions are rejected.
- Oversized fields are rejected.
- Formula-like values are stored as text.
- Concurrent submissions do not overwrite one another.
- Spreadsheet access is restricted.
- Firebase is no longer contacted after migration.
- The old endpoint is not left pointing to an unmonitored or abandoned sheet.

### Website regression checks

- `node --check script.js`
- `git diff --check`
- Test `index.html` at 480, 768, and 1024 pixels.
- Test `blooming-birds-daycare.html` if it remains public.
- Check navigation, mobile menu, program tabs, forms, gallery toast, chat, reveal behavior, and scrolling.

## Capacity Guidance

Google Sheets is suitable for one daycare and normal form traffic. The expected workload of a few submissions per day is well within the practical range.

The relevant limits are operational rather than a fixed user count:

- Google Sheets supports up to 20 million cells per spreadsheet.
- Apps Script executions have a six-minute maximum execution time.
- Apps Script has simultaneous execution limits.
- Apps Script quotas vary by personal versus Workspace account.
- Website visitors do not consume form capacity unless they submit a form.

If the business later has multiple locations, thousands of daily submissions, staff logins, payments, or complex workflows, move the storage layer to a proper database while keeping Google Sheets as an export or reporting destination.

## Recommended Initial Scope

For the first implementation, use:

- One spreadsheet.
- Two tabs: `Enrollments` and `Messages`.
- Server-side validation.
- Submission IDs and duplicate detection.
- Honeypot spam protection.
- Internal notification emails.
- No automatic parent email until the notification flow is confirmed.
- Manual spreadsheet protection and staff-only access.
- Direct Apps Script submission without a proxy.

Add Turnstile, automatic acknowledgements, archiving, or a Netlify proxy only if testing or actual usage shows they are needed.
