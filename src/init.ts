chrome.runtime.onInstalled.addListener(() => {});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let someStorageValue: string;

// React to storage, initial load and changes
chrome.storage.local.get(['someStorageKey'], (storage) => {
  someStorageValue = storage.someStorageKey;
});

chrome.storage.onChanged.addListener((changes: { [storageKey: string]: chrome.storage.StorageChange }, area: chrome.storage.AreaName) => {
  if (area === 'local' && changes.someStorageKey) {
    someStorageValue = changes.someStorageKey.newValue;
  }
});

// Listen to requests to run a background task
chrome.runtime.onMessage.addListener(
  async (request, sender, sendResponse) => {
    // Probably need to check the tab and the actual message sent
    try {
      if (
        request.type === 'someMessageType'
        && (!sender.tab || sender.tab.url.includes('someSiteNameIListenTo'))
      ) {
        console.log(request.message);
      }
    } catch (e) {
      console.error(e);
    }

    // Do we need to call this everywhere? Only the listener which does something?
    sendResponse();
    return true;
  },
);
