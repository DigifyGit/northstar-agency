# Google Apps Script + AI Studio Automation Plan

## Overview
We will build a "Zero-Infrastructure" AI Automation using Google Apps Script (GAS) and Google AI Studio (Gemini Pro/Flash). This script will live inside your Google Workspace, wake up daily, read your Gmail for LinkedIn job alerts, parse them using the NorthStar Agency scoring criteria, and email you a curated dossier of A-Tier candidates.

## 1. Setup Google Apps Script
1. Go to [script.google.com](https://script.google.com/) and create a "New Project".
2. Name the project `NorthStar Email Agent`.

## 2. The Code Structure
The GAS project will consist of three main parts:
1. `Config.gs`: Holds the API keys, search queries, and the NorthStar `CLIENT_BRIEF.md` system prompt.
2. `GmailParser.gs`: Uses `GmailApp.search()` to find recent LinkedIn job alerts and extracts the clean text from the HTML bodies.
3. `Agent.gs`: Takes the clean text, calls the Google AI Studio (Gemini) API via `UrlFetchApp`, and asks the model to evaluate the jobs against the prompt.
4. `Main.gs`: The orchestrator function that ties it all together and sends the final Markdown/HTML report back to your email.

## 3. Automation Trigger
We will configure a "Time-driven trigger" in the GAS interface to run the `Main.gs` standard execution function every morning at 8:00 AM.

## Action Items for the User
1. I will generate the complete `.gs` files for you to paste into the Google Apps Script editor.
2. You will need to get a **Google AI Studio API Key** (Gemini API key).
3. You will paste this key into the `Config.gs` file.
4. You will set up the Time-driven trigger.

I am preparing the code files now.
