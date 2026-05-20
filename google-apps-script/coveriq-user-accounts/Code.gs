/**
 * CoverIQ — User accounts Web App
 * Separate spreadsheet from quote leads (WEB_APP_URL on coveriq-site).
 *
 * FIRST TIME: In the Apps Script editor, run createSpreadsheet() once (authorize when asked).
 * Then Deploy → Web app. No need to create a Google Sheet manually.
 */

const SCRIPT_PROP_SPREADSHEET_ID = 'COVERIQ_USER_SPREADSHEET_ID';

const CONFIG = {
  /** Optional override. Leave empty — createSpreadsheet() saves the ID automatically. */
  SPREADSHEET_ID: '',
  SPREADSHEET_TITLE: 'CoverIQ User Accounts',
  SHEET_NAME: 'User Accounts',
  BRAND: 'coveriq',
  WEBSITE_URL: 'https://cover-iq.com',

  EMAIL_RECIPIENTS: ['chandler@cover-iq.com', 'chandler.hill.24@gmail.com'],
  SEND_EMAIL_NOTIFICATIONS: true,

  RATE_LIMIT_SECONDS: 180,
  MAX_LEN: {
    firstName: 80,
    lastName: 80,
    email: 120,
    phone: 20,
    street: 120,
    city: 80,
    state: 2,
    zip: 10,
    currentInsurance: 120,
    securityQ: 120,
    securityA: 200,
    accountType: 40,
    status: 40,
    source: 80,
    action: 40,
    notes: 500,
    pageUrl: 300,
    utm: 120,
    json: 8000
  }
};

const HEADERS = [
  'Account ID',
  'Date',
  'Time',
  'First Name',
  'Last Name',
  'Email',
  'Phone',
  'Street',
  'City',
  'State',
  'ZIP',
  'Current Insurance Provider',
  'Security Question 1',
  'Security Answer 1',
  'Security Question 2',
  'Security Answer 2',
  'Onboarding JSON',
  'Account Type',
  'Status',
  'Action',
  'Source',
  'Page URL',
  'UTM Source',
  'UTM Medium',
  'UTM Campaign',
  'Notes',
  'Client Timestamp'
];

function doPost(e) {
  try {
    checkBurstRateLimit_();
    const payload = parsePayload_(e);
    validatePayload_(payload);
    checkRateLimit_(payload.email);

    const sheet = getSheet_();
    const accountId = generateAccountId_(sheet);
    const now = new Date();
    const tz = Session.getScriptTimeZone();
    const dateStr = Utilities.formatDate(now, tz, 'yyyy-MM-dd');
    const timeStr = Utilities.formatDate(now, tz, 'h:mm:ss a');

    sheet.appendRow([
      accountId,
      dateStr,
      timeStr,
      payload.firstName,
      payload.lastName,
      payload.email,
      payload.phone,
      payload.street,
      payload.city,
      payload.state,
      payload.zip,
      payload.currentInsurance,
      payload.securityQ1,
      payload.securityA1,
      payload.securityQ2,
      payload.securityA2,
      payload.onboardingJson,
      payload.accountType,
      payload.status,
      payload.action,
      payload.source,
      payload.pageUrl,
      payload.utmSource,
      payload.utmMedium,
      payload.utmCampaign,
      payload.notes,
      payload.clientTimestamp
    ]);

    var emailResult = { emailSent: false, emailError: '' };
    if (CONFIG.SEND_EMAIL_NOTIFICATIONS) {
      emailResult = sendAccountNotification_(accountId, dateStr, timeStr, payload);
    }

    return jsonResponse_({
      ok: true,
      accountId: accountId,
      emailSent: emailResult.emailSent,
      emailError: emailResult.emailError || undefined
    });
  } catch (err) {
    const message = err && err.message ? err.message : 'Something went wrong.';
    return jsonResponse_({ ok: false, error: message });
  }
}

function doGet() {
  try {
    checkBurstRateLimit_();
    return jsonResponse_({
      ok: true,
      message: 'CoverIQ user accounts endpoint is running.',
      sheet: CONFIG.SHEET_NAME
    });
  } catch (err) {
    const message = err && err.message ? err.message : 'Too many requests.';
    return jsonResponse_({ ok: false, error: message });
  }
}

/**
 * Run once from the Apps Script editor. Creates the spreadsheet, tab, and headers.
 * Check View → Logs for the spreadsheet URL.
 */
function createSpreadsheet() {
  const storedId = getStoredSpreadsheetId_();
  if (storedId) {
    const ss = SpreadsheetApp.openById(storedId);
    setupSheetHeadersOnSpreadsheet_(ss);
    logSpreadsheetInfo_(ss, 'Spreadsheet already exists — headers refreshed.');
    return ss;
  }

  const ss = SpreadsheetApp.create(CONFIG.SPREADSHEET_TITLE);
  PropertiesService.getScriptProperties().setProperty(SCRIPT_PROP_SPREADSHEET_ID, ss.getId());

  const sheets = ss.getSheets();
  const sheet = sheets[0];
  sheet.setName(CONFIG.SHEET_NAME);
  applyHeadersToSheet_(sheet);

  for (var i = sheets.length - 1; i >= 1; i--) {
    ss.deleteSheet(sheets[i]);
  }

  logSpreadsheetInfo_(ss, 'Created new spreadsheet.');
  return ss;
}

/** Alias — same as createSpreadsheet() */
function setupSheetHeaders() {
  const ss = getSpreadsheet_();
  setupSheetHeadersOnSpreadsheet_(ss);
}

function setupSheetHeadersOnSpreadsheet_(ss) {
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }
  applyHeadersToSheet_(sheet);
  SpreadsheetApp.flush();
  Logger.log('Headers applied to tab: ' + CONFIG.SHEET_NAME);
}

function applyHeadersToSheet_(sheet) {
  const lastCol = HEADERS.length;
  if (sheet.getLastRow() === 0) {
    sheet.clear();
  }
  sheet.getRange(1, 1, 1, lastCol).setValues([HEADERS]);
  sheet.setFrozenRows(1);

  const headerRange = sheet.getRange(1, 1, 1, lastCol);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#030712');
  headerRange.setFontColor('#e2e8f0');
  headerRange.setHorizontalAlignment('center');

  sheet.setColumnWidth(1, 140);
  sheet.setColumnWidth(6, 220);
  sheet.setColumnWidth(8, 120);
  sheet.setColumnWidth(12, 240);
  sheet.setColumnWidth(16, 280);
}

function logSpreadsheetInfo_(ss, prefix) {
  Logger.log(prefix);
  Logger.log('Title: ' + ss.getName());
  Logger.log('URL: ' + ss.getUrl());
  Logger.log('ID: ' + ss.getId());
}

function getStoredSpreadsheetId_() {
  if (CONFIG.SPREADSHEET_ID) {
    return CONFIG.SPREADSHEET_ID;
  }
  return PropertiesService.getScriptProperties().getProperty(SCRIPT_PROP_SPREADSHEET_ID) || '';
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Missing request body.');
  }

  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (parseErr) {
    throw new Error('Invalid JSON payload.');
  }

  const accountType = normalizeAccountType_(data.accountType);
  const action = trim_(data.action, CONFIG.MAX_LEN.action) || 'signup';

  return {
    firstName: trim_(data.firstName, CONFIG.MAX_LEN.firstName),
    lastName: trim_(data.lastName, CONFIG.MAX_LEN.lastName),
    email: trim_(data.email, CONFIG.MAX_LEN.email).toLowerCase(),
    phone: cleanPhone_(data.phone),
    street: trim_(data.street || data.address, CONFIG.MAX_LEN.street),
    city: trim_(data.city, CONFIG.MAX_LEN.city),
    state: trim_(data.state, CONFIG.MAX_LEN.state).toUpperCase(),
    zip: trim_(data.zip || data.zipCode, CONFIG.MAX_LEN.zip),
    currentInsurance: trim_(
      data.currentInsurance || data.currentInsuranceProvider,
      CONFIG.MAX_LEN.currentInsurance
    ),
    securityQ1: trim_(data.securityQ1 || data.securityQuestion1, CONFIG.MAX_LEN.securityQ),
    securityA1: trim_(data.securityA1 || data.securityAnswer1, CONFIG.MAX_LEN.securityA),
    securityQ2: trim_(data.securityQ2 || data.securityQuestion2, CONFIG.MAX_LEN.securityQ),
    securityA2: trim_(data.securityA2 || data.securityAnswer2, CONFIG.MAX_LEN.securityA),
    onboardingJson: jsonField_(data, 'onboardingJson', 'onboarding'),
    accountType: accountType,
    status: trim_(data.status, CONFIG.MAX_LEN.status) || 'pending',
    action: action,
    source: trim_(data.source, CONFIG.MAX_LEN.source) || CONFIG.WEBSITE_URL,
    pageUrl: trim_(data.pageUrl || data.page_url, CONFIG.MAX_LEN.pageUrl),
    utmSource: trim_(data.utm_source || data.utmSource, CONFIG.MAX_LEN.utm),
    utmMedium: trim_(data.utm_medium || data.utmMedium, CONFIG.MAX_LEN.utm),
    utmCampaign: trim_(data.utm_campaign || data.utmCampaign, CONFIG.MAX_LEN.utm),
    notes: trim_(data.notes, CONFIG.MAX_LEN.notes),
    clientTimestamp: trim_(data.timestamp, 40)
  };
}

function jsonField_(data, key, altKey) {
  var raw = data[key];
  if (raw === undefined || raw === null) raw = data[altKey];
  if (typeof raw === 'object') {
    try {
      return JSON.stringify(raw).slice(0, CONFIG.MAX_LEN.json);
    } catch (e) {
      return '';
    }
  }
  return trim_(raw, CONFIG.MAX_LEN.json);
}

function validatePayload_(p) {
  if (!p.email) throw new Error('Email is required.');
  if (!isValidEmail_(p.email)) throw new Error('Please enter a valid email address.');

  if (p.action === 'onboarding') {
    if (!p.onboardingJson) throw new Error('Onboarding selections are required.');
    return;
  }

  if (!p.firstName) throw new Error('First name is required.');
  if (!p.lastName) throw new Error('Last name is required.');
  if (!p.phone) throw new Error('Phone is required.');
  if (p.phone.length < 10) throw new Error('Please enter a valid phone number.');
  if (!p.street) throw new Error('Street address is required.');
  if (!p.city) throw new Error('City is required.');
  if (!p.state || p.state.length !== 2) throw new Error('State is required (2 letters).');
  if (!p.zip) throw new Error('ZIP code is required.');
  if (!p.currentInsurance) throw new Error('Current insurance provider is required.');
  if (!p.securityQ1 || !p.securityA1) throw new Error('Security question 1 and answer are required.');
  if (!p.securityQ2 || !p.securityA2) throw new Error('Security question 2 and answer are required.');
  if (!p.accountType) throw new Error('Account type is required.');
}

function normalizeAccountType_(value) {
  const raw = trim_(value, CONFIG.MAX_LEN.accountType).toLowerCase();
  if (!raw) return '';
  if (raw === 'consumer' || raw === 'user') return 'consumer';
  if (raw === 'agent' || raw === 'producer' || raw === 'licensed_producer') return 'agent';
  return raw.slice(0, CONFIG.MAX_LEN.accountType);
}

function checkBurstRateLimit_() {
  const cache = CacheService.getScriptCache();
  const minute = Math.floor(Date.now() / 60000);
  const key = 'burst_accounts_' + minute;
  const n = parseInt(cache.get(key) || '0', 10) + 1;
  cache.put(key, String(n), 120);
  if (n > 15) {
    throw new Error('Too many requests. Please try again in a minute.');
  }
}

function checkRateLimit_(email) {
  if (!email) return;
  const cache = CacheService.getScriptCache();
  const key = 'account_' + email;
  if (cache.get(key)) {
    throw new Error('Please wait a few minutes before submitting again.');
  }
  cache.put(key, '1', CONFIG.RATE_LIMIT_SECONDS);
}

function getSpreadsheet_() {
  const id = getStoredSpreadsheetId_();
  if (id) {
    return SpreadsheetApp.openById(id);
  }
  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) {
    return active;
  }
  throw new Error('No spreadsheet yet. Run createSpreadsheet() once in the Apps Script editor.');
}

function getSheet_() {
  const ss = getSpreadsheet_();
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    applyHeadersToSheet_(sheet);
  }

  return sheet;
}

function generateAccountId_(sheet) {
  const tz = Session.getScriptTimeZone();
  const datePart = Utilities.formatDate(new Date(), tz, 'yyyyMMdd');
  const dataRows = Math.max(0, sheet.getLastRow() - 1);
  const seq = Utilities.formatString('%04d', dataRows + 1);
  return 'CIQ-ACC-' + datePart + '-' + seq;
}

function getNotificationRecipients_() {
  const raw = CONFIG.EMAIL_RECIPIENTS;
  const list = Array.isArray(raw)
    ? raw
    : String(raw || '')
        .split(',')
        .map(function (e) {
          return e.trim();
        });
  return list.filter(function (e) {
    return e && e.indexOf('@') > 0;
  });
}

/**
 * Run from the Apps Script editor (not the web URL) to test MailApp and re-authorize if needed.
 * View → Executions should show success or the exact MailApp error.
 */
function testSendEmail() {
  const result = sendAccountNotification_(
    'CIQ-ACC-TEST',
    Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd'),
    Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'h:mm:ss a'),
    {
      firstName: 'Email',
      lastName: 'Test',
      email: 'test@cover-iq.com',
      phone: '5555550100',
      street: '123 Test St',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      currentInsurance: 'Test',
      accountType: 'consumer',
      status: 'active',
      action: 'signup',
      source: 'apps-script-editor',
      pageUrl: '',
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      notes: 'Manual test from testSendEmail() — ignore'
    }
  );
  Logger.log(JSON.stringify(result));
  return result;
}

function sendAccountNotification_(accountId, dateStr, timeStr, p) {
  const recipients = getNotificationRecipients_();
  if (!recipients.length) {
    Logger.log('No EMAIL_RECIPIENTS configured — skipping email.');
    return { emailSent: false, emailError: 'No EMAIL_RECIPIENTS configured.' };
  }

  const subject =
    'New CoverIQ account — ' +
    p.firstName +
    ' ' +
    p.lastName +
    ' (' +
    p.accountType +
    ') [' +
    accountId +
    ']';

  const body = [
    'New user account record from ' + (CONFIG.WEBSITE_URL || 'cover-iq.com'),
    '',
    'Account ID: ' + accountId,
    'Date: ' + dateStr,
    'Time: ' + timeStr,
    '',
    'Contact',
    '  Name: ' + p.firstName + ' ' + p.lastName,
    '  Email: ' + p.email,
    '  Phone: ' + formatPhoneDisplay_(p.phone),
    '',
    'Address',
    '  ' +
      [p.street, p.city, p.state, p.zip].filter(Boolean).join(', ') || '—',
    '  Current insurance: ' + (p.currentInsurance || '—'),
    '',
    'Account',
    '  Type: ' + p.accountType,
    '  Status: ' + p.status,
    '  Action: ' + p.action,
    '  Source: ' + p.source,
    '  Page: ' + (p.pageUrl || '—'),
  ];

  if (p.utmSource || p.utmMedium || p.utmCampaign) {
    body.push(
      '',
      'UTM',
      '  Source: ' + (p.utmSource || '—'),
      '  Medium: ' + (p.utmMedium || '—'),
      '  Campaign: ' + (p.utmCampaign || '—')
    );
  }

  if (p.notes) {
    body.push('', 'Notes', '  ' + p.notes);
  }

  body.push('', '—', 'CoverIQ user accounts (separate from quote leads sheet)');

  const plainBody = body.join('\n');
  const errors = [];

  for (var i = 0; i < recipients.length; i++) {
    const to = recipients[i];
    try {
      GmailApp.sendEmail(to, subject, plainBody, { name: 'CoverIQ Signups' });
      Logger.log('GmailApp sent to: ' + to);
    } catch (gmailErr) {
      try {
        MailApp.sendEmail(to, subject, plainBody);
        Logger.log('MailApp sent to: ' + to);
      } catch (mailErr) {
        const msg =
          (mailErr && mailErr.message) ||
          (gmailErr && gmailErr.message) ||
          String(mailErr || gmailErr);
        Logger.log('Email failed for ' + to + ': ' + msg);
        errors.push(to + ': ' + msg);
      }
    }
  }

  // Backup copy to the Google account that owns/deploys this script
  try {
    const owner = Session.getEffectiveUser().getEmail();
    if (owner) {
      GmailApp.sendEmail(owner, '[Copy] ' + subject, plainBody, { name: 'CoverIQ Signups' });
      Logger.log('Owner copy sent to: ' + owner);
    }
  } catch (ownerErr) {
    Logger.log('Owner copy skipped: ' + (ownerErr && ownerErr.message ? ownerErr.message : ownerErr));
  }

  if (errors.length) {
    return { emailSent: false, emailError: errors.join(' | ') };
  }
  return { emailSent: true, emailError: '' };
}

function trim_(value, maxLen) {
  const s = String(value || '').trim();
  if (!maxLen) return s;
  return s.slice(0, maxLen);
}

function cleanPhone_(value) {
  return String(value || '').replace(/[^\d]/g, '').slice(0, 15);
}

function formatPhoneDisplay_(digits) {
  if (!digits) return '—';
  if (digits.length === 10) {
    return '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
  }
  return digits;
}

function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
