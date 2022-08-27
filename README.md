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
- Figure out how host permissions work, if they are needed, and if they can be added by the user. ActiveTab is supposed to grant some of it, but doesn't seem to work so far. Found needed in some form.
- Messed up storage hook. Figure it out
- Need a better id field both for render, and the declarative network request rule
- Maybe want independent updates for each rule. Right now the whole array is updated. 
- Need to update the rule if it doesn't exist
    - check if other extensions can interfere with the id space
- Promisify everything