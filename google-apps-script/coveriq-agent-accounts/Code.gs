/**
 * CoverIQ — Agent accounts Web App (licensed producers / Exchange)
 * Separate spreadsheet from quote leads AND consumer user accounts.
 *
 * FIRST TIME: In the Apps Script editor, run createSpreadsheet() once (authorize when asked).
 * Then Deploy → Web app. No need to create a Google Sheet manually.
 */

const SCRIPT_PROP_SPREADSHEET_ID = 'COVERIQ_AGENT_SPREADSHEET_ID';

const CONFIG = {
  SPREADSHEET_ID: '',
  SPREADSHEET_TITLE: 'CoverIQ Agent Accounts',
  SHEET_NAME: 'Agent Accounts',
  BRAND: 'coveriq_exchange',
  WEBSITE_URL: 'https://agents.cover-iq.com',

  EMAIL_RECIPIENTS: ['chandler@cover-iq.com', 'chandler.hill.24@gmail.com'],
  SEND_EMAIL_NOTIFICATIONS: true,

  RATE_LIMIT_SECONDS: 180,
  MAX_LEN: {
    firstName: 80,
    lastName: 80,
    email: 120,
    phone: 20,
    agencyName: 120,
    npn: 20,
    licensedStates: 80,
    status: 40,
    source: 80,
    action: 40,
    notes: 500,
    pageUrl: 300,
    utm: 120
  }
};

const HEADERS = [
  'Agent ID',
  'Date',
  'Time',
  'First Name',
  'Last Name',
  'Email',
  'Phone',
  'Agency Name',
  'NPN',
  'Licensed States',
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
    const agentId = generateAgentId_(sheet);
    const now = new Date();
    const tz = Session.getScriptTimeZone();
    const dateStr = Utilities.formatDate(now, tz, 'yyyy-MM-dd');
    const timeStr = Utilities.formatDate(now, tz, 'h:mm:ss a');

    sheet.appendRow([
      agentId,
      dateStr,
      timeStr,
      payload.firstName,
      payload.lastName,
      payload.email,
      payload.phone,
      payload.agencyName,
      payload.npn,
      payload.licensedStates,
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
      sendAgentNotification_(agentId, dateStr, timeStr, payload);
    }

    return jsonResponse_({ ok: true, agentId: agentId });
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
      message: 'CoverIQ agent accounts endpoint is running.',
      sheet: CONFIG.SHEET_NAME
    });
  } catch (err) {
    const message = err && err.message ? err.message : 'Too many requests.';
    return jsonResponse_({ ok: false, error: message });
  }
}

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
  sheet.setColumnWidth(8, 160);
  sheet.setColumnWidth(13, 240);
  sheet.setColumnWidth(18, 280);
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

  return {
    firstName: trim_(data.firstName, CONFIG.MAX_LEN.firstName),
    lastName: trim_(data.lastName, CONFIG.MAX_LEN.lastName),
    email: trim_(data.email, CONFIG.MAX_LEN.email).toLowerCase(),
    phone: cleanPhone_(data.phone),
    agencyName: trim_(data.agencyName || data.agency_name, CONFIG.MAX_LEN.agencyName),
    npn: trim_(data.npn || data.NPN, CONFIG.MAX_LEN.npn),
    licensedStates: trim_(data.licensedStates || data.licensed_states, CONFIG.MAX_LEN.licensedStates),
    status: trim_(data.status, CONFIG.MAX_LEN.status) || 'pending_verification',
    action: trim_(data.action, CONFIG.MAX_LEN.action) || 'signup',
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
}

function checkBurstRateLimit_() {
  const cache = CacheService.getScriptCache();
  const minute = Math.floor(Date.now() / 60000);
  const key = 'burst_agents_' + minute;
  const n = parseInt(cache.get(key) || '0', 10) + 1;
  cache.put(key, String(n), 120);
  if (n > 15) {
    throw new Error('Too many requests. Please try again in a minute.');
  }
}

function checkRateLimit_(email) {
  if (!email) return;
  const cache = CacheService.getScriptCache();
  const key = 'agent_' + email;
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

function generateAgentId_(sheet) {
  const tz = Session.getScriptTimeZone();
  const datePart = Utilities.formatDate(new Date(), tz, 'yyyyMMdd');
  const dataRows = Math.max(0, sheet.getLastRow() - 1);
  const seq = Utilities.formatString('%04d', dataRows + 1);
  return 'CIQ-AGT-' + datePart + '-' + seq;
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

function sendAgentNotification_(agentId, dateStr, timeStr, p) {
  const recipients = getNotificationRecipients_();
  if (!recipients.length) {
    Logger.log('No EMAIL_RECIPIENTS configured — skipping email.');
    return;
  }

  const subject =
    'New CoverIQ agent — ' + p.firstName + ' ' + p.lastName + ' [' + agentId + ']';

  const body = [
    'New licensed producer / agent account from ' + (CONFIG.WEBSITE_URL || 'agents.cover-iq.com'),
    '',
    'Agent ID: ' + agentId,
    'Date: ' + dateStr,
    'Time: ' + timeStr,
    '',
    'Contact',
    '  Name: ' + p.firstName + ' ' + p.lastName,
    '  Email: ' + p.email,
    '  Phone: ' + formatPhoneDisplay_(p.phone),
    '',
    'Producer',
    '  Agency: ' + (p.agencyName || '—'),
    '  NPN: ' + (p.npn || '—'),
    '  Licensed states: ' + (p.licensedStates || '—'),
    '  Status: ' + p.status,
    '  Action: ' + p.action,
    '  Source: ' + p.source,
    '  Page: ' + (p.pageUrl || '—'),
    '',
    '—',
    'CoverIQ agent accounts (separate from consumer accounts and quote leads)'
  ].join('\n');

  MailApp.sendEmail(recipients.join(','), subject, body);
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
