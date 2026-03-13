# 🚀 NorthStar Zero-Infrastructure Email Agent

This folder contains the Google Apps Script (GAS) code to run the **NorthStar Job Sourcing Desk** autonomously from your Google Workspace account.

It requires **no servers**, **no monthly subscriptions**, and runs directly inside your Gmail environment.

## Overview
Every morning, this script will:
1. Search your Gmail for LinkedIn "Suggested jobs" alerts.
2. Extract the text of the jobs.
3. Send the text to **Google AI Studio (Gemini)** along with your client profile and exclusions (`CLIENT_BRIEF.md`).
4. Email you a curated Markdown/HTML dossier containing **only the A-Tier jobs** that pass the NorthStar criteria.

---

## Deployment Instructions

### Step 1: Create the Google Apps Script Project
1. Open a new tab and go to [script.google.com](https://script.google.com/).
2. Click **New project** in the top left.
3. Click "Untitled project" at the top and rename it to **NorthStar Email Agent**.

### Step 2: Paste the Code
You will see a file named `Code.gs` on the left.
1. Rename `Code.gs` to `Main.gs`.
2. Click the `+` icon next to "Files" -> Select **Script** -> Name it `Config`
3. Click the `+` icon -> Select **Script** -> Name it `GmailParser`
4. Click the `+` icon -> Select **Script** -> Name it `Agent`

Now, copy the contents of the files in this folder (`src/gas_agent/`) into the corresponding files in your Google Apps Script editor.

### Step 3: Add Your Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey) and generate a free API key.
2. Open the `Config.gs` file in your Apps Script editor.
3. Replace `"YOUR_API_KEY_HERE"` with your actual API key.

### Step 4: Grant Permissions (The First Run)
1. Open `Main.gs` in the editor.
2. At the top of the screen, ensure `runDailyRoutine` is selected in the dropdown menu.
3. Click the **Run** button.
4. Google will prompt you with "Authorization required". 
5. Click **Review permissions** -> Choose your account -> Click **Advanced** -> Click **Go to NorthStar Email Agent (unsafe)** -> Click **Allow**.
   - *(Note: It says "unsafe" because you just wrote this script and it hasn't been reviewed by Google. It is 100% safe as it only runs in your account).*
6. The script will run. If you have job alerts from the last 24 hours, you should see an email appear in your inbox shortly!

### Step 5: Automate It (The Daily Trigger)
1. On the left sidebar of the Apps Script editor, click the **Triggers** icon (it looks like an alarm clock).
2. Click **+ Add Trigger** in the bottom right.
3. Configure it as follows:
   - Choose which function to run: `runDailyRoutine`
   - Choose which deployment should run: `Headless`
   - Select event source: `Time-driven`
   - Select type of time based trigger: `Day timer`
   - Select time of day: `8am to 9am` (or whenever you prefer)
4. Click **Save**.

🎉 **You are done! The NorthStar Email Agent is now fully autonomous.**
