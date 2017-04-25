## React + Redux + Webpack2 + Ant-design


### Quick start

```
npm i yhtml5-cli -g

yhtml5 init <filename> 
cd filename

npm i 
npm run dev
npm run build
```

### 业务模块

- [x] 登录、注册、忘记密码
- [x] 权限
- [x] layout

### 开发模式

```
state => reduce => Containers => Components => CallBack => Containers event => 

dispatch(task) => dispatch(ajax) => dispatch(upstate) =>newState  
```

### import vs require

在配置webpack或需要在node环境中编译执行的时候用commonjs，
在写业务代码时候使用es6的import

### Containers
  Containers 经过connect的，redux的组件，负责向子组件传入**props**
  

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

### postCss

```
==== app.pcss ====
.login-button {
  width: 100%;
}

==== app.js ====
import styles from './form.pcss'

styles.loginButton

==== webpack ====
development:  [path][name]-[local],
production :  [local]-[hash:base64:6]
```

### bugs

### antd and code splitting
> import().then  import  require 

### Code Splitting - Using import()
```
  import('./task')
    .then((task)=>{
    console.log(task)
    })
    .catch(err)
```
### notice 

* 组件文件后缀名写上.jsx  
* react-router exact
  When true, will only match if the path matches the location.pathname exactly.
* process.env.NODE_ENV === 'production'
 Keep in mind that import() path cannot be fully dynamic (e.g., import(Math.random())). 
 Rather either completely static (e.g., import('./locale/de.json')) 
 or partially static (e.g., import('./locale/' + language + '.json')). 

### Directory Structure

合理的规范有利于项目开发速度，我们推崇高内聚低耦合的代码结构
模块化开发， 分而治之， 各模块同目录下就近维护。
这里，我们规定了项目构建，开发，测试，发布等目录及文件路径（react项目为例）：

```
 root
  ├── app                              --client source code
  │   ├── components
  │   ├── login
  │   ├── static                       --公共静态资源
  │   │     └── favicon.ico
  │   ├── global.pcss                  --公共静态资源
  │   ├── template.jsx                 --页面模板
  │   ├── index.jsx                    --公用入口
  │   └── others
  ├── build
  │   ├── webpack.config.js
  │   ├── webpack.dev.js
  │   ├── webpack.pro.js
  │   └── other.js
  ├── exmaple
  ├── dist                             --产品发布目录
  ├── node_modules
  ├── server                           --server source code
  ├── .babelrc
  ├── .editorconfig
  ├── .eslintignore
  ├── .eslintrc.js
  ├── .gitignore
  ├── .npmignore
  ├── .gitignore
  ├── CHANGELOG.md
  ├── ISSUE.md
  ├── LICENSE
  ├── package.json
  └── README.md
```
