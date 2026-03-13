# NorthStar Zero-Infrastructure Email Agent

The NorthStar Email Agent has been successfully developed as a suite of Google Apps Script files. This allows the agent to run natively within your Google Workspace without the need for external tools like Zapier, Make, or a Node.js server.

## Components Created

1. **`Config.gs`**: Centralized configuration file. It holds the `GEMINI_API_KEY`, the Gmail search query for LinkedIn alerts, and the `AI_SYSTEM_PROMPT` (derived from `CLIENT_BRIEF.md`).
2. **`GmailParser.gs`**: Interacts with the `GmailApp` service. It searches for recent job alerts, extracts the HTML bodies, and cleans the text to reduce token usage and improve AI comprehension.
3. **`Agent.gs`**: Integrates with the Google AI Studio REST API using `UrlFetchApp`. It sends the cleaned email text and the system prompt to the Gemini model for analysis.
4. **`Main.gs`**: The operational entry point. It orchestrates the flow: fetching emails, analyzing them, formatting the A-tier dossier into an HTML email, and sending it to the user.
5. **`README_GAS.md`**: Detailed, step-by-step instructions on how to deploy this code to `script.google.com`, insert the API key, and set up the daily automated trigger.

## Output Structure

The final output is an HTML-formatted email that looks like this:

🌟 **NorthStar A-Tier Job Fits - [Date]**

**🎯 NorthStar Job Sourcing Desk**
Here are today's top matches extracted from LinkedIn alerts:
___
**IT Support Specialist** at **Example Corp**
**Location**: Lisbon, Portugal
**Why it fits**: Strong match for troubleshooting and O365, with no developer requirements.
**Original Link**: [Link]

## Next Steps

Please refer to `src/gas_agent/README_GAS.md` to deploy the scripts to your Google Apps Script environment and enable the daily automation.
