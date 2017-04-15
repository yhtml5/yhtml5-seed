## YHTML5-Seed

![npm version] ![node version] ![Build Status] ![downloads total] ![author]

### Introduction

YHTML5-Seed scaffolds out a new application. We can building a SPA or MPA.
writing your build configuration, and package manager dependencies (e.g npm) that you might need for your build

This is not only a project-seed for front-end. It is a complete set of solutions from the client to the server:
react,redux,webpack,web security,nodejs,express,api,git version,performance optimization
what you want technology stack all in one, and provides many out-of-the-box features

前端世界的变化总是惊人的，在这个项目里，我们会及时更新依赖的技术到最新最稳定版本，同时及时淘汰一些过时的技术元素
我们不建议重度依赖别人发明的轮子，我们鼓励自己重复造轮子。在编码中了解底层原理，创造出更适合团队的解决方案

Welcome to NEW front-end world and enjoy yourself

**[Document][YHTML5-Seed-document]**
**[Issue][YHTML5-Seed-issue]**

### Target

* 构建丨解决前端开发中自动化工具、性能优化、模块化框架、开发规范、代码部署、开发流程等问题
* 优化丨极致性能体验，前端性能优化，永无止境。
* 协作丨为团队提供愉悦的开发体验，提供前端开发脚手架的技术支持，专人维护解决脚手架问题
* 统一丨统一风格，统一[代码规范][codeStandard]，统一技术栈，减少代码冲突,并配套对应检测工具
* 效率丨让团队成员只需要简单培训学习使用这套框架，将精力主要放在业务需求开发上，
  而不需要额外学习研究webpack，jsx，babel，node，shell,express等等一堆概念与知识

### Solutions

There are so many problems when we start a front-end project

### Apps

我们为不同的项目类型准备了不同的开发脚手架：

type|demo|path
---|---|---
SPA|react+webpack|`apps/`|
SPA|react+webpack|`apps/`|
MPA|||

### Command Line

|Command line|Usage|
|---|---|
|npm start|install dependencies, and become building exmple program, please be patience|
|npm run build|build production|
|npm run build-debug|debug model|
|npm run dev|develop model|
|npm run test|test code|
|npm run git|commit your code to git remote repertory|
|npm i |`--registry=https://registry.npm.taobao.org`|

For detailed explanation on how things work, checkout the [YHTML5-Seed document][YHTML5-Seed-document]

### Feature (webpack)

- [x] **basic**
   - [x] 监测处理所有的前端资源：html/css/js/img/file/url
   - [x] 打包 --打包合并，压缩混淆html,css,js
   - [x] 代码切割 --分离第三方包与业务逻辑代码
     - [x] css与js分离 (延迟加载css)
     - [x] 业务代码与公共第三方包分离
     - [ ] 业务逻辑分离，根据需求切割代码，可以是[路由变化][react-router-code-splitting]、点击事件
     - [ ] 第三方包分离，自定义分离,只引用第三方包中需要的模块
     - [ ] [提取延迟加载模块中公共部分][move-common-modules-into-the-parent-chunk]
   - [x] 环境分离 --production, development, test
   - [x] 支持单页面，多页面应用，混合应用
   - [x] 模板引擎 --html模板，动态生成页面
   - [x] 绝对路径  --简化import路径，`../../../a.js`, `~/components/a.js`
   - [ ] 支持 `markdown => html`
   - [ ] support sass, less, [postCSS][postCSS],[css-modules][css-modules]
   - [ ] 支持js、jsx、ts
   - [x] css模块  --support cssModule `[modular and reusable CSS, No more conflicts, Explicit dependencies, No global scope]`
   - [ ] 提高打包速度 重定向资源路径，不打包全部引用的资源，直接引用min文件，例：`react => react/react.min.js` 
- [x] **development**
   - [x] 自动打开默认浏览器
   - [x] 热替换 --不需要刷新页面，尤其连续改一个功能不需要重复做页面操作
   - [ ] 自动刷新 --及时刷新页面
   - [x] 源码映射 --追踪错误代码到开发源码的错误一行
   - [x] 打包监测 --分析打包性能，模块内容
   - [x] 局域网访问  --开发环境允许局域网访问
   - [x] 重定向依赖 --使用第三方包提供的压缩包而不是通过webpack
   - [x] 兼容windows系统
   - [ ] mock  --mock data
- [ ] **test**
   - [ ] .eslintrc, eslint
   - [ ] .editconfig --统一编辑器格式，减少代码冲突
- [ ] **production**
   - [x] 版本号管理 --小版本携带版本号+时间戳，大版本使用版本号(字母) 一个版本目录下应包含所有文件
   - [x] 删除 调试信息  console.log
   - [x] 删除 未使用的函数 tree shaking
   - [x] 删除 if(false){代码块}
   - [ ] 删除 重复css class
   - [ ] 删除 仅用于开发环境的：`['react-hot-loader','react-hot-loader/patch', 'webpack-hot-middleware/client']`
   - [x] 增加 浏览器前缀 --使用autoprefixer自动创建css的vendor prefixes
   - [ ] 优化 首屏css内联 style-loader
   - [ ] 兼容策略
      - [ ] 浏览器兼容包含html、css、js等兼容问题，涉及广泛
      - [ ] 兼容性检测
      - [ ] html5shim 
      - [ ] css浏览器前缀
      - [ ] javascript shim
      - [ ] IE 系列兼容
   - [ ] 加载策略
      - [x] 合理的加载策略能大大降低资源大小、提高用户体验、提高客户端安全性(根据后端验证返回前端业务逻辑)、提供渐进式服务
      - [x] 按需加载 在编译阶段，只打包需要的资源 (npm 各个包都有提供单独的es6模块，除非必须尽量不要引全部)
      - [x] 异步加载 lazyLoad, 根据路由，事件加载不同的资源   
      - [x] 并线加载 根据浏览器特性，可以并线加载css、js等资源，同步执行 
      - [ ] 预先加载 根据用户，预先加载一些资源
   - [ ] 缓存策略
      - [x] 合理的缓存策略能减少资源下载、保证用户每次获取的事最新的资源、提高用户体验
      - [x] 长久缓存 第三方的包、公用代码
      - [x] 及时更新 业务逻辑代码、常变动的css、js 
   - [ ] 安全策略    
      - [x] XSS、CSRF、SQL注入、ddos、开启https 不讨论
      - [ ] 哈希进行信息摘要
      - [ ] 非对称加密
      - [ ] 对称加密
      - [ ] Salt
      - [x] 压缩compression, 混淆obfuscation, 加密encryption 增加代码不可读性
      - [ ] cookie加密 md5加密token等信息
- [ ] **others**
   - [ ] 自动化部署  -- 一键推送线上
   - [ ] 编写shell脚本，制作命令行界面（CLI）
   - [ ] 发布到Npm, Bower

目前，还有一些新功能及bug需要解决，详见[问题列列表][YHTML5-Seed-issue]

### react + redux + antd

- [ ] 

### Technology Stacks

#### Technology Stacks for developing a project

|Name|Usage|Note|
|---|---|---|
|cssModule|||
|react|||
|redux|||
|react-ant|||

#### The web's scaffolding tool for build modern webapps(option)

|Name|Usage|Note|
|---|---|---|
|babel|||
|[Eslint][eslint]|||
|express|||
|[NodeJS][node]|||
|[NPM][npm]|||
|PM2|||
|postCSS|||
|react-hot-loader|||
|webpack|||

#### Development Dependencies

##### Node

name|usage|url
---|---|---
shelljs|Portable Unix shell commands for Node.js|`https://github.com/shelljs/shelljs`
ora|Elegant terminal spinner |`https://github.com/sindresorhus/ora`
opn|open browser|

**How to export logo in term?**

##### Webpack

[author]:https://img.shields.io/badge/author-yhtml5-blue.svg
[Build Status]:https://img.shields.io/travis/twbs/bootstrap/master.svg
[downloads total]:https://img.shields.io/github/downloads/atom/atom/total.svg
[npm version]:https://img.shields.io/npm/v/npm.svg
[node version]:https://img.shields.io/badge/node-v4.3.2-blue.svg

[bower]: http://bower.io
[es5-shim]:https://github.com/es-shims/es5-shim
[eslint]:http://eslint.org/
[git]: http://git-scm.com/
[http-server]: https://github.com/nodeapps/http-server
[html5shiv]:https://github.com/aFarkas/html5shiv
[iconfont-ali]:http://www.iconfont.cn/
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[modernizr]:https://github.com/Modernizr/Modernizr
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[travis]: https://travis-ci.org/
[react-router-code-splitting]:https://reacttraining.com/react-router/web/guides/code-splitting
[codeStandard]:https://github.com/yhtml5/YHTML5-Seed/blob/master/codeStandard
[document]:https://github.com/yhtml5/YHTML5-Seed/blob/master/README_EN.md
[issue]:https://github.com/yhtml5/YHTML5-Seed/blob/master/issue.md
[progress]:https://github.com/yhtml5/YHTML5-Seed/blob/master/progress.md
[problem]:https://github.com/yhtml5/FW-Dashboard/blob/master/question.md
[YHTML5-Seed]:https://github.com/yhtml5/YHTML5-Seed
[YHTML5-Seed-document]:./document/README.md
[YHTML5-Seed-issue]:./document/04-frequent-problems.md
[YHTML5-Tutorial-Git]:https://github.com/yhtml5/YHTML5-Tutorial/tree/master/app/git

[postCSS]:(https://github.com/postcss/postcss#usage)
[css-modules]:(https://github.com/css-modules/css-modules)
[move-common-modules-into-the-parent-chunk]:(https://webpack.js.org/plugins/commons-chunk-plugin/#move-common-modules-into-the-parent-chunk)
