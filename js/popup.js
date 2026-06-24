document.addEventListener('DOMContentLoaded', function () {
    const scrollerActive = document.getElementById('scrollerActive');
    const statusText = document.getElementById('status-text');

    // Load initial state (default to true)
    chrome.storage.local.get(['scrollerActive'], function (result) {
        const isActive = result.scrollerActive !== false;
        scrollerActive.checked = isActive;
        updateStatusText(isActive);
    });

    scrollerActive.addEventListener('change', function () {
        const isActive = scrollerActive.checked;
        chrome.storage.local.set({ scrollerActive: isActive }, function () {
            updateStatusText(isActive);
        });
    });

    function updateStatusText(isActive) {
        if (isActive) {
            statusText.textContent = "Active";
            statusText.style.color = "#dc2626";
        } else {
            statusText.textContent = "Inactive";
            statusText.style.color = "#64748b";
        }
    }
});