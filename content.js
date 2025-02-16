function processPageText() {
    // Get all text from the page
    const text = document.body.innerText;
    
    // Example processing: count words
    const wordCount = text.split(/\s+/).length;
    
    // You can add your own processing logic here
    // For example:
    // - Filter specific content
    // - Extract patterns
    // - Analyze text
    // - Send to API
    
    return wordCount;
  }