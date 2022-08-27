import { Rule } from './domain/Rule';

chrome.runtime.onInstalled.addListener(() => {});

// React to storage, initial load and changes
// chrome.storage.local.get(['someStorageKey'], (storage) => {
//   someStorageValue = storage.someStorageKey;
// });

chrome.storage.onChanged.addListener((changes: { [storageKey: string]: chrome.storage.StorageChange }, area: chrome.storage.AreaName) => {
  if (area === 'local' && changes.rules) {
    const rules: Rule[] = changes.rules.newValue;
    const oldRules: Rule[] = changes.rules.oldValue || [];
    const addRules = rules.filter((rule) => (rule.authStrategy && rule.urlFilter)).map((rule: Rule) => ({
      id: rule.id,
      priority: 1,
      action: {
        requestHeaders: [{
          operation: chrome.declarativeNetRequest.HeaderOperation.SET,
          value: rule.authStrategy,
          header: 'Authorization',
        }],
        type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
      },
      condition: {
        urlFilter: rule.urlFilter, resourceTypes: [chrome.declarativeNetRequest.ResourceType.MAIN_FRAME], // TODO: change the storage key name from domain
      },
    }));
    chrome.declarativeNetRequest.updateSessionRules({
      addRules,
      removeRuleIds: oldRules.map((x) => x.id),
    }, () => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
    });
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
