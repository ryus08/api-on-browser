// Sending messages and setting to storage
const reportData = (data, messageInfo?) => {
  chrome.storage.local.set(data, () => {
    console.log('data set to storage.');
  });

  // TODO: don't run on load, connection won't exist
  // Maybe just move to a storage onChange listener
  if (messageInfo?.type) {
    chrome.runtime.sendMessage(messageInfo);
  } else {
    chrome.runtime.sendMessage({ type: 'dataSet', ...messageInfo });
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const runOnPageAction = (onLoad) => {
  const data = {};
  // Read stuff from the page

  if (data) {
    reportData({ ...data }, { ...data });
  }
};

chrome.runtime.onMessage.addListener(
  (request) => {
    if (request.type === 'runRequest') {
      runOnPageAction(false);
    } else {
      console.warn(`Unknown message type ${request.type}`);
    }
    return true;
  },
);

runOnPageAction(true);
