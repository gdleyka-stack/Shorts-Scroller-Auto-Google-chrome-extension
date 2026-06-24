# YouTube Shorts Auto Scroller

A Google Chrome browser extension that automatically scrolls to the next YouTube Shorts video when the current one ends.

## Description

This extension detects when a YouTube Shorts video finishes playing, disables its loop attribute, and automatically transitions to the next video. It provides a hands-free viewing experience for YouTube Shorts.

## Features

- Detects the end of video playback.
- Simulates an ArrowDown keyboard event to trigger the next video.
- Fallback smooth scrolling to the next video renderer element.
- Easy toggle (Active/Inactive) via the extension popup menu.
- Saves the extension state in the browser's local storage.

## Installation

1. Download or clone this repository to a local directory.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top-right corner.
4. Click the "Load unpacked" button in the top-left corner.
5. Select the folder containing the extension files.

## Usage

1. Open YouTube and navigate to the Shorts section.
2. Once the current video ends, the page will automatically scroll to the next one.
3. To disable auto-scrolling, click the extension icon in the toolbar and switch the toggle to "Inactive".

## License

This project is licensed under the MIT License. See the LICENSE file for details.
