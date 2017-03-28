## YHTML5 Usage

### Adjusting Your Text Editor

Some text editors have a "safe write" feature and enable this by default. As a result, saving a file will not always result in a recompile.
Each editor has a different way of disabling this. For the most common ones:
```
    Sublime Text 3 - Add "atomic_save": false to your user preferences.
    IntelliJ - use search in the preferences to find "safe write" and disable it.
    Vim - add :set backupcopy=yes in your settings.
    WebStorm - uncheck Use "safe write" in Preferences > Appearance & Behavior > System Settings
```


#### DEBUG

In the development mode, we usually need to output some information for debug,like `console.log()`.
But in a production environment, those info are not expected to appear.
So we can do like this:

```
if(DEBUG){
  console.log
}
```
