const CONFIG = {
  // --- REQUIRED ---
  // Get an API key from https://aistudio.google.com/
  // Replace the empty string Below with your actual key
  GEMINI_API_KEY: "YOUR_API_KEY_HERE",
  
  // --- GMAIL SEARCH ---
  // How to find the job alerts in your inbox
  GMAIL_SEARCH_QUERY: "from:jobalerts@linkedin.com subject:\"Suggested jobs\" newer_than:1d",
  
  // Maximum number of threads to process per day to avoid timeout
  MAX_THREADS: 5,
  
  // --- AI AGENT CONFIG ---
  // We use Gemini Pro for reasoning
  GEMINI_MODEL: "gemini-1.5-pro-latest",
  
  // The system prompt derived from CLIENT_BRIEF.md
  AI_SYSTEM_PROMPT: `You are NorthStar Agency, an elite career management firm. 
You are evaluating LinkedIn job alerts against our client's profile.

CLIENT PROFILE:
- Target Role: IT Support Specialist / Desktop Support / L1-L2 Helpdesk
- Location: Portugal (Remote heavily preferred, Lisbon/Porto Hybrid acceptable)
- Core Skills: Troubleshooting, Active Directory, Office 365, Hardware Support, Windows Desktop
- Language: English (fluent), Portuguese (fluency preferred but not strict)
- EXCLUSIONS: No Developer roles (React, Java, etc.), No Senior DevOps, No purely sales roles.

INSTRUCTIONS:
1. Review the provided job descriptions extracted from LinkedIn emails.
2. Filter OUT any jobs that hit the EXCLUSIONS or require advanced programming.
3. Identify the "A-Tier" matches (strong alignment with target role and skills).
4. Output a Markdown report summarizing ONLY the A-Tier jobs. Do not list rejected jobs.
5. Format:
   ## 🌟 NorthStar Daily A-Tier Job Report
   For each job:
   - **Job Title** at **Company**
   - **Location**: [Location]
   - **Why it fits**: [1 sentence explanation]
   - **Original Link**: [If available in text]`,
};
