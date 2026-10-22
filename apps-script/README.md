# Google Apps Script Form Endpoint

This directory contains the Google Apps Script backend planned for the Blooming Birds website forms.

`Code.gs` is not automatically deployed from this repository. Copy its contents into a standalone Google Apps Script project attached to the Google account that owns the destination spreadsheet.

## What It Does

- Accepts enrollment and contact JSON submissions through `doPost(e)`.
- Validates and normalizes data on the server.
- Creates or verifies the `Enrollments` and `Messages` tabs.
- Adds a server-side timestamp and status.
- Detects duplicate submission IDs.
- Applies a per-email rate limit.
- Rejects honeypot spam fields when the website sends them.
- Prevents spreadsheet formula injection.
- Sends an internal notification email when configured.
- Optionally sends a basic acknowledgement email to the submitted email address.
- Uses a script lock while checking and appending records.
- Provides a basic `doGet()` health check.

## Before Deployment

1. Create or select a Google Spreadsheet for form submissions.
2. Copy the Spreadsheet ID from its URL.
3. Restrict the spreadsheet to authorized staff only.
4. Create a standalone Apps Script project at [script.google.com](https://script.google.com/).
5. Replace the default script contents with `Code.gs`.
6. Set the Apps Script project timezone to the daycare's local timezone.
7. Configure the Script Properties listed below.

## Script Properties

Open **Project Settings**, find **Script Properties**, and add:

| Property | Required | Example | Purpose |
| --- | --- | --- | --- |
| `SPREADSHEET_ID` | Yes | `1abc...xyz` | Destination Google Spreadsheet ID |
| `NOTIFICATION_EMAIL` | Recommended | `bloomingbirds25@gmail.com` | Internal notification recipient |
| `ACKNOWLEDGEMENT_ENABLED` | No | `false` | Sends a basic acknowledgement to the submitter when `true` |
| `TIMEZONE` | No | `America/Vancouver` | Timestamp and date validation timezone |
| `RATE_LIMIT_SECONDS` | No | `60` | Minimum delay between accepted submissions from the same email |

Do not commit spreadsheet IDs, email credentials, OAuth tokens, or other secrets to the repository. The spreadsheet ID is not a password, but keeping deployment configuration in Script Properties avoids coupling it to source code.

## Deployment

1. In the Apps Script editor, run `doGet` once and complete the requested authorization.
2. Run a test submission from the editor only after the Script Properties are configured.
3. Select **Deploy**, then **New deployment**.
4. Choose **Web app** as the deployment type.
5. Set **Execute as** to the account that owns the spreadsheet.
6. Set **Who has access** to the audience that must submit the public website form. A public website normally requires access for anyone, including anonymous users.
7. Deploy and copy the web app URL ending in `/exec`.
8. Keep the deployment URL private from repository source only in the sense that it is an endpoint, not a secret. The endpoint must still have server-side validation and spam protection because anyone can send requests to it.
9. Do not replace the website endpoint until the test checklist below passes.

## Spreadsheet Tabs

The script creates these tabs automatically if they do not exist.

### `Enrollments`

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

### `Messages`

```text
Submission ID
Timestamp
Status
Name
Email
Subject
Message
```

If a tab already exists, the first row must match the expected headers exactly. The script will stop rather than silently change an existing sheet layout.

## Manual Endpoint Test

Replace `APPS_SCRIPT_WEB_APP_URL` with the deployed `/exec` URL. This test uses a contact payload and does not require the website to be updated first.

```sh
curl -L \
  -X POST \
  -H "Content-Type: text/plain;charset=utf-8" \
  --data '{"formType":"message","submissionId":"manual-test-001","name":"Test Parent","email":"test@example.com","subject":"Endpoint test","message":"This is a valid endpoint test message."}' \
  "APPS_SCRIPT_WEB_APP_URL"
```

Expected response shape:

```json
{
  "success": true,
  "submissionId": "manual-test-001",
  "duplicate": false,
  "notificationSent": true
}
```

Confirm all of the following:

- One row appears in `Messages`.
- The row has a server timestamp.
- The status is `New`.
- The internal notification arrives, if configured.
- Repeating the same request returns `duplicate: true` and does not add another row.

## Validation Behavior

Enrollment validation includes:

- Child first and last names.
- A supported program.
- Date of birth and program age range.
- Parent name, phone, and email.
- Optional start and tour dates cannot be in the past.
- Optional terms acceptance must be truthy when included in the payload.
- Notes length limit.

Contact validation includes:

- Name, email, and message.
- A minimum message length of ten characters.
- Subject length limit.

The script also rejects malformed JSON, unsupported form types, oversized values, invalid dates, invalid email addresses, invalid phone numbers, and populated honeypot fields.

## Email Behavior

Internal notification email failures do not undo a successful spreadsheet write. The response reports `notificationSent: false` so the deployment can be monitored.

Acknowledgement emails are disabled unless `ACKNOWLEDGEMENT_ENABLED` is set to `true`. They should remain disabled until the internal notification flow has been tested and the daycare approves the message.

Apps Script email quotas apply. If the site later receives high traffic, move notifications to a more suitable mail service or queue them separately from the spreadsheet write.

## Security and Operations

- Keep the spreadsheet shared only with authorized staff.
- Do not publish the spreadsheet URL in the website.
- Review Apps Script executions for failures after deployment.
- Review duplicate and spam attempts periodically.
- Do not put sensitive submission data in `console.log` statements.
- Decide how long child and parent data should be retained.
- Create a regular protected backup or archive process before the sheet becomes the operational record.
- Consider Cloudflare Turnstile if the honeypot and email throttle are not sufficient.

## Website Integration Status

The website forms and their client-side submission integrations have been
removed. This backend remains archived for reference and is not called by the
current HTML pages. The removed form workflows are documented in
`REMOVED_SECTIONS.md`.

Direct browser requests to Apps Script web apps can have cross-origin response limitations. Test the real website after integration. If a reliable browser-visible response is required, use a small site-hosted proxy while keeping Google Sheets as the only storage system.
