# api-on-browser
Provides a browser extension for navigating APIs like normal web navigation

## Usage
Install as a chrome extension. Not currently published the the chrome webstore, so need to load unpacked for now. The [Github Actions](https://github.com/ryus08/api-on-browser/actions) upload a zip file with the unpacked extension in it for each commit, download the latest and unzip it. To install, [Manage chrome extensions](chrome://extensions/), enable Developer Mode (top right corner), select Load Unpacked, and navigate to the unzipped file you downloaded.

To configure specific Authorization, open the Options for the extension (click the icon in the taskbar then select "Configure" in the popup). Add as substring of the URL Filter you want to add auth to, the full auth header you want to set in requests to that domain, and save. 

Whenever you navigate to a url containing the URL Filter you configured, your specified auth header will be added.

## TODO:
- Attribute the icon: <a href="https://www.flaticon.com/free-icons/api" title="api icons">Api icons created by Freepik - Flaticon</a>
- Correct the icon image sizes, I don't think Google will allow upload if they aren't right.
- Load rules on start, assuming the session settings mean they aren't persisting
- Load auth rules from file/S3/url
- Load auth parameters from different file formats, merge as jsom json path to extract from the merge
- Auth loader strategy, not just value. Most auth should be loaded from a secure place, so the key auth data does not need to be stored in localstorage, but instead is loaded on-demand, just to set the rules
- More-complex rule builder
- Verify security of rules. Can other extensions read what is written? Is it persisted to disk? I believe the doc suggested there were two types, one kept only in memory. API docs suggest the rule ids are scoped to the extension
- Figure out if the user can add host permissions. Right now set to extremely broad access, would like the user to be able to say which are allowed as they configure their rules. [Chromium docs](https://chromium.googlesource.com/chromium/src/+/main/extensions/docs/permissions.md#Runtime-Host-Permissions) seems to suggest its an option, maybe can add just for Edge/Opera/etc. ActiveTab is grants some of it, but the extension needs to be "invoked" before it's enabled, meaning every navigation would need the user to say explicitly "k, you can run the rules on this site". Better than nothing. If this is the avenue we go down, explore other [options for invoking the extension more seamlessly](https://developer.chrome.com/docs/extensions/mv3/manifest/activeTab/#invoking-activeTab)
- Maybe want independent updates for each rule. Right now the whole array is updated. 
- Need to update the rule if it doesn't exist
    - check if other extensions can interfere with the id space
- Promisify everything