# CoverIQ user accounts — Apps Script

Consumer signups (MIRA) on **cover-iq.com**. Separate from quote leads and agent accounts.

## Setup (no manual spreadsheet)

1. Go to [script.google.com](https://script.google.com) → **New project**.
2. Name it `CoverIQ User Accounts`.
3. Paste all of `Code.gs` into the editor (replace default code).
4. Select **`createSpreadsheet`** in the run dropdown → **Run** → authorize.
5. **View → Logs** — copy the spreadsheet URL (also appears in your Google Drive).
6. **Deploy → New deployment → Web app** → Execute as **Me**, access **Anyone** → copy the `/exec` URL.
7. Add to Netlify **and** set server env for the proxy:
   - `VITE_USER_ACCOUNTS_WEB_APP_URL=<your /exec url>` (build-time, optional in prod)
   - `USER_ACCOUNTS_WEB_APP_URL=<same /exec url>` (Netlify → Functions)

**Verify deployment:** open the `/exec` URL in a browser. You should see JSON like  
`{"ok":true,"message":"CoverIQ user accounts endpoint is running."}`  
If you see “Page Not Found”, redeploy the web app and update both env vars.

**Gmail:** On each signup, `MailApp.sendEmail` notifies `EMAIL_RECIPIENTS` in `Code.gs`  
(default: `chandler@cover-iq.com`, `chandler.hill.24@gmail.com`). Check spam.

### Sheet row appears but no email?

Your `CONFIG` is fine. This is almost always one of these:

1. **Web app “Execute as”** must be **Me** (your Google account), not “User accessing the web app”.  
   Anonymous site visitors cannot send mail on their behalf.

2. **New deployment after pasting code** — Editor code ≠ live web app until you deploy:  
   **Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy.**

3. **MailApp not authorized** — In the editor, run **`testSendEmail`** once → approve Gmail/mail permissions → check inbox and spam.

4. **Check the API response** — After redeploying, a signup POST should return  
   `{"ok":true,"accountId":"...","emailSent":true}` or `"emailSent":false,"emailError":"..."`  
   so you can see MailApp failures without guessing.

5. **Spam / Workspace** — Mail is sent **from the Google account that owns the script** (the “Me” account). Search that account’s Sent folder too.

Run `createSpreadsheet()` again anytime to refresh headers (won’t duplicate the file).
