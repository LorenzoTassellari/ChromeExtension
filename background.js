chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['contentScript.js']
    });
    chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ['styles.css']
    });
  });