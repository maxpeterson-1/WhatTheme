// This script is injected into the webpage.
// It has access to the page's DOM.

(function() {
    function findTheme() {
        // Method 1: Object Inspection
        try {
            if (window.Shopify && window.Shopify.theme && window.Shopify.theme.name) {
                return window.Shopify.theme.name;
            }
        } catch (e) {
            // Continue to Method 2 if Method 1 fails
        }

        // Method 2: Regex Parsing
        try {
            const htmlContent = document.documentElement.innerHTML;
            const regex = /"name":\s*"([^"]+)"/;
            const match = htmlContent.match(regex);
            if (match && match[1]) {
                return match[1];
            }
        } catch (e) {
            // Continue to failure case if Method 2 fails
        }

        // Failure: If both methods fail, return null
        return null;
    }

    // Execute the detection
    const themeName = findTheme();
    
    if (themeName !== null) {
        chrome.runtime.sendMessage({ themeName: themeName });
    } else {
        chrome.runtime.sendMessage({ error: "Not a Shopify store or theme is hidden." });
    }
})();