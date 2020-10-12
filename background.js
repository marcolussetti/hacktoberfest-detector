function openSettings() {
    browser.runtime.openOptionsPage();
}

browser.browserAction.onClicked.addListener(openSettings);
