document.getElementById('processText').addEventListener('click', async () => {
    try {
      // Get the current tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Check if we can access this page
      if (!tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('edge://') || tab.url.startsWith('brave://')) {
        document.getElementById('result').innerHTML = 
          '<span class="error">Cannot access browser system pages. Please try on a regular webpage.</span>';
        return;
      }
  
      // Inject and execute our content script
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });
  
      const processResult = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: processPageText
      });
      
      document.getElementById('result').textContent = `Processed ${processResult[0].result} words`;
    } catch (error) {
      document.getElementById('result').innerHTML = 
        `<span class="error">Error: ${error.message}</span>`;
    }
  });