// Inject content.js into the active tab when the popup opens
document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTab = tabs[0];
        if (activeTab) {
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                files: ['content.js']
            });
        }
    });

    // Listen for messages with themeName and update #theme-name
    chrome.runtime.onMessage.addListener(function(message) {
        if (message && message.themeName) {
            const themeNameElem = document.getElementById('theme-name');
            if (themeNameElem) {
                themeNameElem.textContent = message.themeName;
            }
        }
    });

    // Handle #copy-button click to copy #theme-name text and show 'Copied!' for 2 seconds
    const copyButton = document.getElementById('copy-button');
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            const themeNameElem = document.getElementById('theme-name');
            if (themeNameElem) {
                const textToCopy = themeNameElem.textContent;
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalText = copyButton.textContent;
                    copyButton.textContent = 'Copied!';
                    setTimeout(() => {
                        copyButton.textContent = originalText;
                    }, 2000);
                });
            }
        });
    }
});