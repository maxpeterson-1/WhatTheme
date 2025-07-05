// File: popup.js

document.addEventListener('DOMContentLoaded', function() {
  const detectBtn = document.getElementById('detect-theme-btn');
  const result = document.getElementById('theme-result');

  detectBtn.addEventListener('click', function() {
    result.textContent = 'Detecting...';
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs[0]) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['content.js']
        });
      } else {
        result.textContent = 'No active tab found.';
      }
    });
  });

  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.themeName) {
      result.textContent = 'Theme: ' + message.themeName;
    } else if (message.error) {
      result.textContent = message.error;
    }
  });
});

// Helper function to handle copying text to the clipboard
function copyThemeName(themeName) {
  const copyButton = document.getElementById('copy-button');
  navigator.clipboard.writeText(themeName).then(() => {
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
      copyButton.textContent = 'Copy';
    }, 2000);
  });
}