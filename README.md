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

There are so many problems when we start a front-end project, like:

打包非常慢，不支持多页面，不知道加载了哪些模块，开发问题路径定位，
打包模块通常非常大，没有很好拆分第三方依赖包与业务逻辑代码，没有按需加载，
没有区分开发环境和生产环境，没有热更新等等。

### Feature

#### Done

- [x] 基础功能
   - [x] 打包 --打包合并，压缩混淆html,css,js
   - [x] 代码切割 --分离第三方包与业务逻辑代码
   - [x] 环境分离 --production, development, debug model
   - [x] 支持单页面，多页面应用，混合应用
   - [x] 模板引擎 --html模板，动态生成页面
   - [x] 绝对路径  --简化import路径，`../../../a.js`, `~/components/a.js`
   - [ ] 浏览器前缀 --使用autoprefixer自动创建css的vendor prefixes
   - [x] css模块  --support cssModule `[modular and reusable CSS, No more conflicts, Explicit dependencies, No global scope]`
- [x] 高级功能
   - [x] 热更新 --及时刷新页面
   - [x] 热替换 --不需要刷新页面，尤其连续改一个功能不需要重复做页面操作
   - [x] 源码映射 --追踪错误代码到开发源码的错误一行
   - [x] 打包监测 --分析打包性能，模块内容
   - [x] 局域网访问  --开发环境允许局域网访问
   - [x] 版本管理 --小版本携带版本号+时间戳，大版本使用版本号(字母)
   - [x] 重定向依赖 --使用第三方包提供的压缩包而不是通过webpack
   - [x] windows兼容
- [x] 可选功能
   - [ ] reload VS Hot Module Replacement(recommend)
   - [ ] externals VS resolve VS require
   - [ ] jade/pug VS ejs VS underscore VS handlebars VS html-loader
   - [ ] icon/iconfont/png VS css/svg/js(recommend [ali font][iconfont-ali] which provide js)

#### Doing

- [ ] 加载策略
   - [ ] 按需加载/异步加载
   - [ ] 并线加载/同步执行
   - [ ] 预加载
- [ ] 优化策略
   - [ ] 生产环境优化
   - [ ] 删除热更新模块
   - [ ] 删除调试信息  --console.log
   - [ ] 清理重复cssClass等等
   - [ ] 首屏内联样式
   - [ ] 浏览器兼容性: IE系列,html5shim,css,js,兼容性检测
   - [ ] 优化babel编译后的代码性能
   - [ ] 首屏css内联 style-loader
- [ ] 代码测试
   - [ ] .eslintrc, eslint
   - [ ] .editconfig --统一编辑器格式，减少代码冲突
   - [ ]
- [ ] server
   - [ ] docker
   - [ ] mock  --mock data
   - [ ] 外网访问  --端口映射
   - [ ] 自动化部署  -- 一键推送线上
- [ ] others
   - [ ] 支持markdown
   - [ ] support sass, less,postCSS
   - [ ] 普通页面支持热更新
   - [ ] 编写shell脚本，制作命令行界面（CLI）
   - [ ] 发布到Npm, Bower

目前，还有一些新功能及bug需要解决，详见[问题列列表][YHTML5-Seed-issue]

### Technology Stacks

#### Command Line

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

|Command line|Usage|
|---|---|
|npm start|install dependencies, and become building exmple program, please be patience|
|npm run build|build production|
|npm run build-debug|debug model|
|npm run dev|develop model|
|npm run test|test code|
|npm run git|commit your code to git remote repertory|
For detailed explanation on how things work, checkout the [YHTML5-Seed document][YHTML5-Seed-document]

### Directory Layout

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

[codeStandard]:https://github.com/yhtml5/YHTML5-Seed/blob/master/codeStandard
[document]:https://github.com/yhtml5/YHTML5-Seed/blob/master/README_EN.md
[issue]:https://github.com/yhtml5/YHTML5-Seed/blob/master/issue.md
[progress]:https://github.com/yhtml5/YHTML5-Seed/blob/master/progress.md
[problem]:https://github.com/yhtml5/FW-Dashboard/blob/master/question.md
[YHTML5-Seed]:https://github.com/yhtml5/YHTML5-Seed
[YHTML5-Seed-document]:./document/README.md
[YHTML5-Seed-issue]:./document/04-frequent-problems.md
[YHTML5-Tutorial-Git]:https://github.com/yhtml5/YHTML5-Tutorial/tree/master/app/git
