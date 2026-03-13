function analyzeWithGemini(jobsText) {
  if (!CONFIG.GEMINI_API_KEY || CONFIG.GEMINI_API_KEY === "YOUR_API_KEY_HERE") {
    Logger.log("ERROR: GEMINI_API_KEY is not configured.");
    return null;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.GEMINI_MODEL}:generateContent?key=${CONFIG.GEMINI_API_KEY}`;
  
  // Prepare the payload for the Gemini API
  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: CONFIG.AI_SYSTEM_PROMPT + "\n\n=== JOB ALERTS BELOW ===\n\n" + jobsText
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.1, // low temperature for consistent evaluation
    }
  };
  
  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true // We want to log the error, not crash the script silently
  };
  
  Logger.log("Calling Gemini API...");
  try {
    const response = UrlFetchApp.fetch(url, options);
    const resultJson = JSON.parse(response.getContentText());
    
    if (resultJson.error) {
       Logger.log("API ERROR: " + JSON.stringify(resultJson.error));
       return null;
    }
    
    // Extract the generated text
    if (resultJson.candidates && resultJson.candidates.length > 0) {
      const generatedText = resultJson.candidates[0].content.parts[0].text;
      Logger.log("Gemini successfully analyzed the jobs.");
      return generatedText;
    }
    
    return null;
  } catch(e) {
    Logger.log("Request failed: " + e.toString());
    return null;
  }
}
