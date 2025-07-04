// This script is injected into the webpage.
// It has access to the page's DOM.

(function() {
    try {
        const scripts = document.getElementsByTagName('script');
        let themeName = null;

        for (let script of scripts) {
            if (script.innerText.includes('Shopify.theme')) {
                const match = script.innerText.match(/Shopify\.theme\s*=\s*\{[^}]*"name"\s*:\s*"(.*?)"/);
                if (match && match[1]) {
                    themeName = match[1];
                    break;
                }
            }
        }

        if (themeName) {
            chrome.runtime.sendMessage({ themeName });
        } else {
            chrome.runtime.sendMessage({ themeName: 'Not a Shopify Store' });
        }
    } catch (e) {
        chrome.runtime.sendMessage({ themeName: 'Detection Error' });
    }
})();