import {
  useEffect, useState, Dispatch, SetStateAction,
} from 'react';

const useChromeStorage = <S>(storageKey: string, initialState?: S | (() => S)): [S, Dispatch<SetStateAction<S>>] => {
  const [stateVal, setStateVal] = useState(initialState);
  useEffect(() => {
    chrome.storage.local.get([storageKey], (storage) => {
      // TODO: clean invalid storage?
      if (storage[storageKey]) {
        setStateVal(storage[storageKey]);
      }
    });
    chrome.storage.onChanged.addListener((changes: { [storageKey: string]: chrome.storage.StorageChange }, area: chrome.storage.AreaName) => {
      if (area === 'local' && changes[storageKey]) {
        setStateVal(changes[storageKey].newValue);
      }
    });
  }, [storageKey]);

  const setToStorage : Dispatch<S> = (newValue: S) => {
    chrome.storage.local.set({ [storageKey]: newValue });
  };

  return [stateVal, setToStorage];
};

export default useChromeStorage;
