function runDailyRoutine() {
  Logger.log("--- Starting NorthStar Daily Analysis ---");
  
  // 1. Fetch Job alerts from Gmail
  const jobsText = fetchRecentJobAlerts();
  
  if (!jobsText) {
    Logger.log("No new job alerts found matching criteria. Exiting.");
    return;
  }
  
  // 2. Send to Gemini for parsing
  Logger.log("Found emails, extracting intelligence...");
  const reportText = analyzeWithGemini(jobsText);
  
  if (!reportText) {
    Logger.log("Analysis failed. Exiting.");
    return;
  }
  
  // 3. Send the Dossier 
  Logger.log("Analysis complete. Sending dossier.");
  sendDossierEmail(reportText);
  
  Logger.log("--- Routine Complete ---");
}

function sendDossierEmail(reportText) {
  // Add some HTML styling to the final report
  const htmlBody = reportText.replace(/\n\n/g, "<br><br>").replace(/\n/g, "<br>");
  
  // Get the current user's email to send the report to
  const myEmail = Session.getActiveUser().getEmail();
  
  const today = new Date().toISOString().split('T')[0];
  const subject = `🌟 NorthStar A-Tier Job Fits - ${today}`;
  
  GmailApp.sendEmail(myEmail, subject, reportText, {
    htmlBody: `
      <h2>🎯 NorthStar Job Sourcing Desk</h2>
      <p>Here are today's top matches extracted from LinkedIn alerts:</p>
      <hr>
      ${htmlBody}
    `
  });
  
  Logger.log("Dossier sent to " + myEmail);
}
