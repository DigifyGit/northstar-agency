function fetchRecentJobAlerts() {
  const query = CONFIG.GMAIL_SEARCH_QUERY;
  Logger.log("Searching Gmail with query: " + query);
  
  const threads = GmailApp.search(query, 0, CONFIG.MAX_THREADS);
  Logger.log("Found " + threads.length + " matching threads.");
  
  if (threads.length === 0) {
    return null;
  }
  
  let allExtractedText = "";
  
  // Job alerts are usually the latest message in a thread
  for (let i = 0; i < threads.length; i++) {
    const messages = threads[i].getMessages();
    const latestMessage = messages[messages.length - 1];
    
    // We get the HTML body because LinkedIn emails rely heavily on HTML structure
    const htmlBody = latestMessage.getBody();
    
    // Clean it up
    const cleanText = extractTextFromHtml(htmlBody);
    
    // Add context
    allExtractedText += "\n\n--- EMAIL DATE: " + latestMessage.getDate() + " ---\n";
    allExtractedText += cleanText;
  }
  
  return allExtractedText;
}

/**
 * Strips HTML tags and excessive whitespace to save tokens
 * and give the LLM a clean text block to read.
 */
function extractTextFromHtml(html) {
  if (!html) return "";
  
  // Replace <br> and </p> with newlines to preserve some structure
  let text = html.replace(/<br\s*[\/]?>/gi, '\n');
  text = text.replace(/<\/p>/gi, '\n\n');
  text = text.replace(/<\/div>/gi, '\n');
  text = text.replace(/<\/li>/gi, '\n');
  text = text.replace(/<tr>/gi, '\n');
  
  // Strip all remaining HTML tags
  text = text.replace(/<[^>]+>/g, ' ');
  
  // Clean up whitespace (multiple spaces to single space, multiple newlines to max two)
  text = text.replace(/[ \t]+/g, ' ');
  text = text.replace(/\n\s+\n/g, '\n\n');
  text = text.trim();
  
  return text;
}
