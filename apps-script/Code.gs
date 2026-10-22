/**
 * Blooming Birds form endpoint.
 *
 * Deploy this file as a Google Apps Script web app. Store deployment-specific
 * values in Script Properties; do not put spreadsheet IDs or email addresses
 * in this file when deploying.
 */

var SETTINGS = {
  spreadsheetId: "SPREADSHEET_ID",
  notificationEmail: "NOTIFICATION_EMAIL",
  acknowledgementEnabled: "ACKNOWLEDGEMENT_ENABLED",
  timezone: "TIMEZONE",
  rateLimitSeconds: "RATE_LIMIT_SECONDS",
};

var ENROLLMENT_HEADERS = [
  "Submission ID",
  "Timestamp",
  "Status",
  "Child First Name",
  "Child Last Name",
  "Date of Birth",
  "Program",
  "Parent Name",
  "Phone",
  "Email",
  "Start Date",
  "Tour Date",
  "Notes",
];

var MESSAGE_HEADERS = [
  "Submission ID",
  "Timestamp",
  "Status",
  "Name",
  "Email",
  "Subject",
  "Message",
];

var PROGRAM_RULES = [
  { name: "Infant Care", minMonths: 6, maxMonths: 18 },
  { name: "Toddler Adventures", minMonths: 18, maxMonths: 36 },
  { name: "Preschool Prep", minMonths: 36, maxMonths: 60 },
  { name: "Before and After School Club", minMonths: 60, maxMonths: 144 },
];

var DEFAULTS = {
  rateLimitSeconds: 60,
  maxNotesLength: 2000,
  maxMessageLength: 4000,
  maxNameLength: 100,
  maxEmailLength: 254,
  maxPhoneLength: 40,
  maxSubjectLength: 120,
};

/**
 * Health check. It intentionally does not expose spreadsheet configuration.
 */
function doGet() {
  return jsonResponse({ success: true, service: "blooming-birds-forms" });
}

/**
 * Receives JSON sent by the website forms.
 */
function doPost(event) {
  try {
    var payload = parsePayload(event);
    var result = processSubmission(payload);

    return jsonResponse({
      success: true,
      submissionId: result.submissionId,
      duplicate: result.duplicate,
      notificationSent: result.notificationSent,
    });
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);

    return jsonResponse({
      success: false,
      error: publicErrorMessage(error),
    });
  }
}

function processSubmission(payload) {
  var config = getConfig();
  var submission = normalizeSubmission(payload, config);
  var result;

  if (submission.formType === "enrollment") {
    result = saveEnrollment(config, submission);
  } else {
    result = saveMessage(config, submission);
  }

  if (!result.duplicate) {
    result.notificationSent = sendNotificationEmail(
      config,
      submission,
      result.timestamp,
    );
    sendAcknowledgementEmail(config, submission);
  } else {
    result.notificationSent = false;
  }

  return result;
}

function parsePayload(event) {
  if (!event || !event.postData || !event.postData.contents) {
    throw new Error("Request body is required.");
  }

  var contents = String(event.postData.contents);
  var payload;

  try {
    payload = JSON.parse(contents);
  } catch (error) {
    throw new Error("Request body must be valid JSON.");
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("Request body must be a JSON object.");
  }

  return payload;
}

function normalizeSubmission(payload, config) {
  var formType = cleanString(payload.formType, 30).toLowerCase();

  if (formType !== "enrollment" && formType !== "message") {
    throw new Error("Unsupported form type.");
  }

  if (hasHoneypotValue(payload)) {
    throw new Error("Spam check failed.");
  }

  var submission = {
    formType: formType,
    submissionId: cleanString(payload.submissionId, 100) || Utilities.getUuid(),
  };

  if (formType === "enrollment") {
    return normalizeEnrollment(payload, submission, config);
  }

  return normalizeMessage(payload, submission);
}

function normalizeEnrollment(payload, submission, config) {
  var childFirstName = requiredName(payload.childFirstName, "Child first name");
  var childLastName = requiredName(payload.childLastName, "Child last name");
  var parentName = requiredName(payload.parentName, "Parent name");
  var email = requiredEmail(payload.email);
  var phone = requiredPhone(payload.phone);
  var program = normalizeProgram(payload.program);
  var dob = requiredDate(payload.dob, "Date of birth");
  var startDate = optionalDate(payload.startDate, "Start date");
  var tourDate = optionalDate(payload.tourDate, "Tour date");
  var notes = cleanString(payload.notes, DEFAULTS.maxNotesLength);

  if (isFutureDate(dob, config.timezone)) {
    throw new Error("Date of birth cannot be in the future.");
  }

  var ageMonths = ageInMonths(dob, config.timezone);
  var programRule = findProgramRule(program);
  if (
    ageMonths < programRule.minMonths ||
    ageMonths > programRule.maxMonths
  ) {
    throw new Error("Child age is outside the selected program range.");
  }

  if (startDate && isBeforeToday(startDate, config.timezone)) {
    throw new Error("Start date cannot be in the past.");
  }

  if (tourDate && isBeforeToday(tourDate, config.timezone)) {
    throw new Error("Tour date cannot be in the past.");
  }

  if (payload.termsAccepted !== undefined && !isTruthy(payload.termsAccepted)) {
    throw new Error("Terms acceptance is required.");
  }

  submission.childFirstName = childFirstName;
  submission.childLastName = childLastName;
  submission.dob = dob;
  submission.program = program;
  submission.parentName = parentName;
  submission.phone = phone;
  submission.email = email;
  submission.startDate = startDate;
  submission.tourDate = tourDate;
  submission.notes = notes;

  return submission;
}

function normalizeMessage(payload, submission) {
  var name = requiredName(payload.name, "Name");
  var email = requiredEmail(payload.email);
  var subject = cleanString(payload.subject, DEFAULTS.maxSubjectLength);
  var message = cleanString(payload.message, DEFAULTS.maxMessageLength);

  if (message.length < 10) {
    throw new Error("Message must contain at least 10 characters.");
  }

  submission.name = name;
  submission.email = email;
  submission.subject = subject;
  submission.message = message;

  return submission;
}

function saveEnrollment(config, submission) {
  var timestamp = new Date();
  var row = [
    submission.submissionId,
    timestamp,
    "New",
    submission.childFirstName,
    submission.childLastName,
    submission.dob,
    submission.program,
    submission.parentName,
    submission.phone,
    submission.email,
    submission.startDate,
    submission.tourDate,
    submission.notes,
  ];

  var result = appendRecord(
    config,
    "Enrollments",
    ENROLLMENT_HEADERS,
    row,
    submission.submissionId,
    submission.email,
  );
  result.timestamp = timestamp;
  return result;
}

function saveMessage(config, submission) {
  var timestamp = new Date();
  var row = [
    submission.submissionId,
    timestamp,
    "New",
    submission.name,
    submission.email,
    submission.subject,
    submission.message,
  ];

  var result = appendRecord(
    config,
    "Messages",
    MESSAGE_HEADERS,
    row,
    submission.submissionId,
    submission.email,
  );
  result.timestamp = timestamp;
  return result;
}

function appendRecord(config, sheetName, headers, row, submissionId, email) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    var sheet = getOrCreateSheet(config.spreadsheet, sheetName, headers);
    if (hasSubmissionId(sheet, submissionId)) {
      return { submissionId: submissionId, duplicate: true };
    }

    enforceRateLimit(email, config.rateLimitSeconds);
    sheet.appendRow(row.map(safeSheetValue));

    return { submissionId: submissionId, duplicate: false };
  } finally {
    lock.releaseLock();
  }
}

function getOrCreateSheet(spreadsheet, sheetName, headers) {
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  } else {
    verifyHeaders(sheet, headers);
  }

  return sheet;
}

function verifyHeaders(sheet, expectedHeaders) {
  var actualHeaders = sheet
    .getRange(1, 1, 1, expectedHeaders.length)
    .getValues()[0]
    .map(function (value) {
      return String(value).trim();
    });

  for (var i = 0; i < expectedHeaders.length; i += 1) {
    if (actualHeaders[i] !== expectedHeaders[i]) {
      throw new Error(
        "Sheet headers do not match the expected layout for " + sheet.getName() + ".",
      );
    }
  }
}

function hasSubmissionId(sheet, submissionId) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;

  var ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (var i = 0; i < ids.length; i += 1) {
    if (String(ids[i][0]) === submissionId) return true;
  }

  return false;
}

function enforceRateLimit(email, seconds) {
  var cache = CacheService.getScriptCache();
  var key = "submit_" + Utilities.base64EncodeWebSafe(email.toLowerCase());
  if (cache.get(key)) {
    throw new Error("Please wait before submitting again.");
  }

  cache.put(key, "1", seconds);
}

function sendNotificationEmail(config, submission, timestamp) {
  if (!config.notificationEmail) return false;

  var subject =
    submission.formType === "enrollment"
      ? "New Blooming Birds enrollment application"
      : "New Blooming Birds contact message";
  var body = buildNotificationBody(submission, timestamp, config.timezone);

  try {
    MailApp.sendEmail({
      to: config.notificationEmail,
      subject: subject,
      body: body,
      name: "Blooming Birds Forms",
      replyTo: submission.email,
    });
    return true;
  } catch (error) {
    console.error("Notification email failed: " + error);
    return false;
  }
}

function sendAcknowledgementEmail(config, submission) {
  if (!config.acknowledgementEnabled || !submission.email) return false;

  var subject =
    submission.formType === "enrollment"
      ? "Blooming Birds received your application"
      : "Blooming Birds received your message";
  var body =
    "Thank you for contacting Blooming Birds Childcare.\n\n" +
    "We received your submission and will follow up as soon as possible.\n\n" +
    "Reference: " +
    submission.submissionId;

  try {
    MailApp.sendEmail({
      to: submission.email,
      subject: subject,
      body: body,
      name: "Blooming Birds Childcare",
    });
    return true;
  } catch (error) {
    console.error("Acknowledgement email failed: " + error);
    return false;
  }
}

function buildNotificationBody(submission, timestamp, timezone) {
  var lines = [
    "Submission ID: " + submission.submissionId,
    "Received: " + Utilities.formatDate(timestamp, timezone, "yyyy-MM-dd HH:mm:ss"),
    "",
  ];

  if (submission.formType === "enrollment") {
    lines.push("Type: Enrollment");
    lines.push("Child: " + submission.childFirstName + " " + submission.childLastName);
    lines.push("Date of birth: " + submission.dob);
    lines.push("Program: " + submission.program);
    lines.push("Parent: " + submission.parentName);
    lines.push("Phone: " + submission.phone);
    lines.push("Email: " + submission.email);
    lines.push("Start date: " + (submission.startDate || "Not provided"));
    lines.push("Tour date: " + (submission.tourDate || "Not provided"));
    lines.push("Notes: " + (submission.notes || "None"));
  } else {
    lines.push("Type: Contact message");
    lines.push("Name: " + submission.name);
    lines.push("Email: " + submission.email);
    lines.push("Subject: " + (submission.subject || "Not provided"));
    lines.push("Message: " + submission.message);
  }

  return lines.join("\n");
}

function getConfig() {
  var properties = PropertiesService.getScriptProperties();
  var spreadsheetId = properties.getProperty(SETTINGS.spreadsheetId);
  if (!spreadsheetId) {
    throw new Error("SPREADSHEET_ID is not configured.");
  }

  var timezone =
    properties.getProperty(SETTINGS.timezone) ||
    Session.getScriptTimeZone() ||
    "America/Vancouver";
  var rateLimitValue = Number(
    properties.getProperty(SETTINGS.rateLimitSeconds),
  );

  return {
    spreadsheet: SpreadsheetApp.openById(spreadsheetId),
    notificationEmail: cleanString(
      properties.getProperty(SETTINGS.notificationEmail),
      500,
    ),
    acknowledgementEnabled: isTruthy(
      properties.getProperty(SETTINGS.acknowledgementEnabled),
    ),
    timezone: timezone,
    rateLimitSeconds:
      isFinite(rateLimitValue) && rateLimitValue >= 10
        ? Math.min(rateLimitValue, 3600)
        : DEFAULTS.rateLimitSeconds,
  };
}

function requiredName(value, label) {
  var name = cleanString(value, DEFAULTS.maxNameLength);
  if (!name || !/^[a-zA-Z]+(?:[ '\-][a-zA-Z]+)*$/.test(name)) {
    throw new Error(label + " is invalid.");
  }
  return name;
}

function requiredEmail(value) {
  var email = cleanString(value, DEFAULTS.maxEmailLength).toLowerCase();
  if (
    !email ||
    !/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9\-]{3,}(?:\.[a-zA-Z0-9\-]+)*\.[a-zA-Z]{2,}$/.test(
      email,
    )
  ) {
    throw new Error("Email address is invalid.");
  }
  return email;
}

function requiredPhone(value) {
  var phone = cleanString(value, DEFAULTS.maxPhoneLength);
  if (!phone || !/^[\d\s()\-+]{7,}$/.test(phone)) {
    throw new Error("Phone number is invalid.");
  }
  return phone;
}

function normalizeProgram(value) {
  var program = cleanString(value, 100);
  var rule = findProgramRule(program);
  if (!rule) throw new Error("Program is invalid.");
  return rule.name;
}

function findProgramRule(program) {
  for (var i = 0; i < PROGRAM_RULES.length; i += 1) {
    if (program.indexOf(PROGRAM_RULES[i].name) !== -1) {
      return PROGRAM_RULES[i];
    }
  }
  return null;
}

function requiredDate(value, label) {
  var date = parseDateOnly(value);
  if (!date) throw new Error(label + " is invalid.");
  return date;
}

function optionalDate(value, label) {
  var cleaned = cleanString(value, 20);
  if (!cleaned) return "";

  var date = parseDateOnly(cleaned);
  if (!date) throw new Error(label + " is invalid.");
  return date;
}

function parseDateOnly(value) {
  var dateString = cleanString(value, 20);
  var match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString);
  if (!match) return null;

  var year = Number(match[1]);
  var month = Number(match[2]);
  var day = Number(match[3]);
  var date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return dateString;
}

function isFutureDate(dateString, timezone) {
  return dateString > todayString(timezone);
}

function isBeforeToday(dateString, timezone) {
  return dateString < todayString(timezone);
}

function todayString(timezone) {
  return Utilities.formatDate(new Date(), timezone, "yyyy-MM-dd");
}

function ageInMonths(dateString, timezone) {
  var today = todayString(timezone).split("-").map(Number);
  var birth = dateString.split("-").map(Number);
  var months = (today[0] - birth[0]) * 12 + (today[1] - birth[1]);
  if (today[2] < birth[2]) months -= 1;
  return months;
}

function hasHoneypotValue(payload) {
  return Boolean(
    cleanString(payload.website, 200) ||
      cleanString(payload.honeypot, 200) ||
      cleanString(payload.hp, 200),
  );
}

function cleanString(value, maxLength) {
  if (value === null || value === undefined) return "";
  var result = String(value).trim();
  if (result.length > maxLength) {
    throw new Error("A submitted field is too long.");
  }
  return result;
}

function safeSheetValue(value) {
  if (value === null || value === undefined) return "";
  if (Object.prototype.toString.call(value) === "[object Date]") return value;

  var result = String(value);
  if (/^[=+\-@]/.test(result)) return "'" + result;
  return result;
}

function isTruthy(value) {
  return value === true || String(value).toLowerCase() === "true";
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function publicErrorMessage(error) {
  var message = error && error.message ? error.message : "Submission failed.";
  if (
    message.indexOf("SPREADSHEET_ID") !== -1 ||
    message.indexOf("headers") !== -1 ||
    message.indexOf("Exception") !== -1
  ) {
    return "The form service is not configured correctly.";
  }
  return message;
}
