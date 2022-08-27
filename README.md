# api-on-browser
Provides a browser extension for navigating APIs like normal web navigation

## TODO:
- Attribute the icon: <a href="https://www.flaticon.com/free-icons/api" title="api icons">Api icons created by Freepik - Flaticon</a>
- Correct the icon image sizes, I don't think Google will allow upload if they aren't right.
- Add/remove auth rules
- Load auth rules from file/S3/url
- Load auth parameters from different file formats, merge as jsom json path to extract from the merge
- More-complex rule builder
- Verify security of rules. Can other extensions read what is written? Is it persisted to disk? I believe the doc suggested there were two types, one kept only in memory. API docs suggest the rule ids are scoped to the extension
- Figure out if the user can add host permissions. Right now set to extremely broad access, would like the user to be able to say which are allowed as they configure their rules. [Chromium docs](https://chromium.googlesource.com/chromium/src/+/main/extensions/docs/permissions.md#Runtime-Host-Permissions) seems to suggest its an option, maybe can add just for Edge/Opera/etc. ActiveTab is grants some of it, but the extension needs to be "invoked" before it's enabled, meaning every navigation would need the user to say explicitly "k, you can run the rules on this site". Better than nothing. If this is the avenue we go down, explore other [options for invoking the extension more seamlessly](https://developer.chrome.com/docs/extensions/mv3/manifest/activeTab/#invoking-activeTab)
- Messed up storage hook. Figure it out
- Need a better id field both for render, and the declarative network request rule
- Maybe want independent updates for each rule. Right now the whole array is updated. 
- Need to update the rule if it doesn't exist
    - check if other extensions can interfere with the id space
- Promisify everything