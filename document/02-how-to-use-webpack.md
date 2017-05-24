## YHTML5 Usage

###  url-loader

```
import url from './introduction.png'

loader: 'url-loader',

=> v1.0/static/img/intro.png
```

### import vs require

在配置webpack或需要在node环境中编译执行的时候用commonjs，
在写业务代码时候使用es6的import


### Adjusting Your Text Editor

Some text editors have a "safe write" feature and enable this by default. As a result, saving a file will not always result in a recompile.
Each editor has a different way of disabling this. For the most common ones:
```
    Sublime Text 3 - Add "atomic_save": false to your user preferences.
    IntelliJ - use search in the preferences to find "safe write" and disable it.
    Vim - add :set backupcopy=yes in your settings.
    WebStorm - uncheck Use "safe write" in Preferences > Appearance & Behavior > System Settings
```
### Loading strategy

the lazy load component is in `~/app/Components/LazilyLoad`

#### Lazy Loading

`require.ensure([], require => require('a').default, 'chunkName'))`

lazy load route Components 
```
import {LazilyLoadComponent} from './Components/LazilyLoad/index.jsx'
const User = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/User/index.jsx').default, 'route-User'))
 <Route exact path="/" component={User}/>
```

#### Preload lazy execution

`require.ensure(['a'], require => require('a').default, 'chunkName'))`

```
import {LazilyLoadComponent} from './Components/LazilyLoad/index.jsx'
const User = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/User/index.jsx').default, 'route-User'))
User()
```

### [postcss][postCSS]

```
==== app.pcss ====
.login-button {
  width: 100%;
}
:global { 
  .class {
    color:#000;
  }
}

==== app.js ====
import styles from './form.pcss'

styles.loginButton

==== webpack ====
development:  [path][name]-[local],
production :  [local]-[hash:base64:6]
```

### [webpack.DefinePlugin][[define-plugin]

The DefinePlugin allows you to create global constants which can be configured at compile time. This can be useful for allowing different behavior between development builds and release builds. If you perform logging in your development build but not in the release build you might use a global constant to determine whether logging takes place. That's where DefinePlugin shines, set it and forget it rules for development and release builds.

```
const webpack = require('webpack')

new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV === 'production' ? 'production' : 'development'),
    'version': JSON.stringify(version),
    'title': JSON.stringify(title)
  },
  'DEBUG': process.env.NODE_ENV !== 'production'
}),
```

#### DEBUG

In the development mode, we usually need to output some information for debug,like `console.log()`.
But in a production environment, those info are not expected to appear.
So we can do like this:

```
process.env.NODE_ENV === 'production' || console.log('development') 

DEBUG || console.log('development') 
```


[define-plugin]:(https://webpack.js.org/plugins/define-plugin/)
[postCSS]:(https://github.com/postcss/postcss#usage)
