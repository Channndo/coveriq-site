/**
 * CoverIQ — User accounts Web App
 * Separate spreadsheet from quote leads (WEB_APP_URL on coveriq-site).
 * Paste into Apps Script bound to your "CoverIQ User Accounts" spreadsheet.
 *
 * Site POST (no-cors): JSON with firstName, lastName, email, phone, accountType, …
 * Run setupSheetHeaders() once after first deploy.
 */

const CONFIG = {
  /** Leave empty when the script is bound to the spreadsheet (Extensions → Apps Script from the sheet). */
  SPREADSHEET_ID: '',
  SHEET_NAME: 'User Accounts',
  BRAND: 'coveriq',
  WEBSITE_URL: 'https://cover-iq.com',

  EMAIL_RECIPIENTS: ['chandler@cover-iq.com'],
  SEND_EMAIL_NOTIFICATIONS: true,

  RATE_LIMIT_SECONDS: 180,
  MAX_LEN: {
    firstName: 80,
    lastName: 80,
    email: 120,
    phone: 20,
    accountType: 40,
    status: 40,
    source: 80,
    action: 40,
    notes: 500,
    pageUrl: 300,
    utm: 120
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

    if (CONFIG.SEND_EMAIL_NOTIFICATIONS) {
      sendAccountNotification_(accountId, dateStr, timeStr, payload);
    }

    return jsonResponse_({ ok: true, accountId: accountId });
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

function setupSheetHeaders() {
  const sheet = getSheet_();
  const lastCol = HEADERS.length;

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

  SpreadsheetApp.flush();
  Logger.log('Headers applied to tab: ' + CONFIG.SHEET_NAME);
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

function validatePayload_(p) {
  if (!p.firstName) throw new Error('First name is required.');
  if (!p.lastName) throw new Error('Last name is required.');
  if (!p.email) throw new Error('Email is required.');
  if (!isValidEmail_(p.email)) throw new Error('Please enter a valid email address.');
  if (!p.phone) throw new Error('Phone is required.');
  if (p.phone.length < 10) throw new Error('Please enter a valid phone number.');
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
  if (CONFIG.SPREADSHEET_ID) {
    return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  }
  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) {
    throw new Error('Set CONFIG.SPREADSHEET_ID or bind this script to a spreadsheet.');
  }
  return active;
}

function getSheet_() {
  const ss = getSpreadsheet_();
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
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

function sendAccountNotification_(accountId, dateStr, timeStr, p) {
  const recipients = getNotificationRecipients_();
  if (!recipients.length) {
    Logger.log('No EMAIL_RECIPIENTS configured — skipping email.');
    return;
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

  MailApp.sendEmail(recipients.join(','), subject, body.join('\n'));
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
