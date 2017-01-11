## Develop react application with webpack 

This is not only a project-seed for front-end. 它是一个从客户端到服务端的一整套方案：
react,redux,webpack,web security,nodejs,express,api,git version,performance optimization
what you want technology stack all in one  

前端世界的变化总是惊人的，在这个项目里，我们会及时更新依赖的技术到最新最稳定版本，同时及时淘汰一些过时的技术元素

Welcome to front-end world and enjoy yourself

### command line

> npm install webpack --save-dev
> npm install webpack@<version> --save-dev
> npm install webpack@beta --save-dev 

### problems

- [x] How to webpack Multi Page
- [x] How to custom page
- [ ] How to clear repeated css class
- [x] Allow server can accessible externally
- [x] Dynamically generated html
- [x] Custom domain name 
- [x] Create git npm script
- [ ] Code is too big after webpack, it always bigger then compressed package which provided by the third party
    * set devtool: "false" in production environment
    * set NODE_ENV=production
    * don't webpack, but use third party like `*.min.*` command
    * http://blog.csdn.net/code_for_free/article/details/51583737
    * http://www.jianshu.com/p/a64735eb0e2b
    * [Make your own React production version with webpack][webpack-optimize-production]
- [ ] It looks like you're using a minified copy of the development build of React. 
      When deploying React apps to production, 
      make sure to use the production build which skips development warnings and is faster. 
      See https://fb.me/react-minification for more details.  
      webpack + react 优化：缩小js包体积 [webpack-optimize-uglify]
    * https://github.com/mishoo/UglifyJS2#usage  
- [ ] 版本管理与升级,自定义发布包
- [x] Hot Module Replacement VS reload 
    * index.jsx | add `import {AppContainer} from 'react-hot-loader';` 
    * index.jsx | add `if (module.hot) {}` in the index.jsx
    * webpack.js | add `entry: {hot: ['react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:61200', 'webpack/hot/only-dev-server'] },`
    * webpack.js | add `new HtmlWebpackPlugin` and set `{chunks: ['index', 'vendor', 'hot', 'manifest']` 
    * webpack.js | set `devServer.hot: true`
    * [react-hot-loader][react-hot-loader]
    * [react-hot-boilerplate][react-hot-boilerplate]
    * [热更新教程][react-hot-tutorial]
- [x] externals vs resolve vs require [use resolve][webpack-optimize-resolve]
    * set `externals: { moment: true}` and add `<script src="//cdn.com/moment.min.js"></script>`
    * set `resolve: { alias: {moment: "moment/min/moment-with-locales.min.js"}}`
    * set `var moment = require('moment/min/moment-with-locales.min.js');`
- [ ] Hot Module Replacement can't work when *.css changed
    * you can use postCSS (using CSS Modules)
- [ ] 加载策略：按需加载，预加载，并线加载，异步加载
- [ ] support less sass css-module, 首屏内联样式    
- [ ] add .eslintrc, eslint
- [ ] webpack打包第三方类库的正确姿势
- [ ] 推送线上，接收脚本，自动化部署
- [ ] A CLI dashboard for webpack dev server [webpack-dashboard]
- [ ] [Development][webpack-development],Never use any of these tools in production. Ever
    * Adjusting Your Text Editor
    * Source Maps
    * devtool: "cheap-eval-source-map"
- [ ] require.ensure()    
- [ ] support markdown 
- [ ] Source Maps
- [ ] console info
- [ ] set `*.*?hash` 
    * `HtmlWebpackPlugin.hash=true`append a unique webpack compilation hash to all included scripts and CSS files. This is useful for cache busting.   
    * `webpack.filename *.*?[hash]`
- [ ] wrong chunks order[wrong-chunks-order]
- [ ] webpackJsonp is not defined
    * set multiple pages with CommonsChunkPlugin and HtmlWebpackPlugin.   
    * CommonsChunkPlugin choice chunks pack into common package  `chunks: ['vendor', 'index']`
    
```
├── dist
├── package.json
├── node_modules
├── src
│   ├── components
│   ├── libs
|   ├── favicon.png
|   ├── vendor.js             所有页面公用的第三方库
│   └── pages                 页面放这里
|       ├── foo               编译后生成 http://localhost:8100/foo.html
|       |    ├── index.html
|       |    ├── index.js
|       |    ├── style.css
|       |    └── pic.png
|       └── bar               http://localhost:8100/bar.html
|           ├── index.html
|           ├── index.js
|           ├── style.css
|           └── baz           http://localhost:8100/bar/baz.html
|               ├── index.html
|               ├── index.js
|               └── style.css
└── webpack.config.js
```    
    
[react-hot-loader]:https://github.com/gaearon/react-hot-loader
[react-hot-boilerplate]:https://github.com/gaearon/react-hot-boilerplate/tree/next
[react-hot-tutorial]:http://www.jianshu.com/p/941bfaf13be1
[webpack-dashboard]:https://github.com/FormidableLabs/webpack-dashboard
[webpack-development]:https://webpack.js.org/guides/development/
[webpack-optimize-resolve]:http://www.tuicool.com/articles/fQB3IjE
[webpack-optimize-uglify]:http://blog.csdn.net/code_for_free/article/details/51583737
[webpack-optimize-production]:http://dev.topheman.com/make-your-react-production-minified-version-with-webpack/
[wrong-chunks-order]:https://github.com/ampedandwired/html-webpack-plugin/issues/481
[template-option]:https://github.com/ampedandwired/html-webpack-plugin/blob/master/docs/template-option.md
