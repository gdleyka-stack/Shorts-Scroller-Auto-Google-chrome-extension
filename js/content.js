let isEnabled = true;

// Load state initially
chrome.storage.local.get(['scrollerActive'], function (result) {
    isEnabled = result.scrollerActive !== false;
});

// Listen for changes to storage
chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (changes.scrollerActive) {
        isEnabled = changes.scrollerActive.newValue !== false;
        if (isEnabled) {
            removeLoopFromAll();
        } else {
            restoreLoopOnAll();
        }
    }
});

function removeLoopFromAll() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (video.loop) {
            video.dataset.hadLoop = 'true';
            video.loop = false;
            video.removeAttribute('loop');
        }
    });
}

function restoreLoopOnAll() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (video.dataset.hadLoop === 'true') {
            video.loop = true;
            video.setAttribute('loop', 'true');
        }
    });
}

// Check loop and attach ended listener
function setupVideoListeners() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (isEnabled) {
            if (video.loop) {
                video.dataset.hadLoop = 'true';
                video.loop = false;
                video.removeAttribute('loop');
            }
        }

        if (!video.dataset.scrollerTracked) {
            video.dataset.scrollerTracked = 'true';
            
            // Listen for ended event
            video.addEventListener('ended', handleVideoEnded);
            
            // In case 'ended' is bypassed/blocked, we also check via timeupdate
            video.addEventListener('timeupdate', function() {
                if (isEnabled && video.currentTime > 0 && video.duration > 0 && video.currentTime >= video.duration - 0.25) {
                    // Trigger end early/safely if near the end
                    handleVideoEnded.call(video);
                }
            });
        }
    });
}

let lastScrollTime = 0;
function handleVideoEnded() {
    if (!isEnabled) return;
    
    // Debounce scroll to prevent double-scrolls
    const now = Date.now();
    if (now - lastScrollTime < 1500) return;
    lastScrollTime = now;

    // Scroll to next video
    // Method 1: Simulate Keyboard Down Arrow
    const downEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        keyCode: 40,
        code: 'ArrowDown',
        which: 40,
        bubbles: true,
        cancelable: true
    });
    document.dispatchEvent(downEvent);
    
    // Method 2: Fallback scroll to next reel renderer element
    setTimeout(() => {
        const activeReel = document.querySelector('ytd-reel-video-renderer[is-active]');
        if (activeReel) {
            const nextReel = activeReel.nextElementSibling;
            if (nextReel) {
                nextReel.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, 150);
}

// Periodically check for new videos (since YouTube loads them dynamically)
setInterval(setupVideoListeners, 500);
