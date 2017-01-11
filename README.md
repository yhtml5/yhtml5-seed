## YHTML5-Seed
               
![npm version] ![node version] ![Build Status] ![downloads total] ![author]

### Introduction

This is not only a project-seed for front-end. It is a complete set of solutions from the client to the server:  
react,redux,webpack,web security,nodejs,express,api,git version,performance optimization  
what you want technology stack all in one, and provides many out-of-the-box features    

YHTML5-Seed scaffolds out a new application. We can building a SPA or MPA.
writing your build configuration, and package manager dependencies (e.g npm) that you might need for your build   

前端世界的变化总是惊人的，在这个项目里，我们会及时更新依赖的技术到最新最稳定版本，同时及时淘汰一些过时的技术元素
我们不建议重度依赖别人发明的轮子，我们鼓励自己重复造轮子。在编码中了解底层原理，创造出更适合团队的解决方案

Welcome to NEW front-end world and enjoy yourself
               
### Quick start

``` bash
# install dependencies, and become building exmple program, please be patience
npm start 

# build for production with minification
npm run build

# run all tests
npm test
```
### Solutions








- [ ] [Xmind][production]
- [ ] [代码规范][codeStandard]
- [ ] 解决方案
    - [ ] 使用iconfont,css,svg代替传统图片,图标
    - [ ] 浏览器兼容性
    - [ ] 虚拟数据
    - [ ] 预制代码
    - [ ] 可定制设计Demo

### Feature
  * 遵循筑家易前端开发[代码规范][codeStandard]
  * Automagically wire-up dependencies installed with [NPM][npm],initializes the project
  * 支持阿里矢量图标 (6w+ 可自定义图标)
  * 规范项目开发, 测试, 发布等目录及文件路径
  * 样式结构、模板引擎、业务逻辑解耦, 高内聚、低耦合
  * 模块化开发, 分而治之, 各模块同目录下就近维护 
  * 支持前后端分离，使用json等交互数据(推荐)
  * 自动对CSS的标准化和通用错误进行修复, 检测并兼容大部分主流浏览器
  * 解决前端开发中自动化工具、性能优化、模块化框架、开发规范、代码部署、开发流程等问题
  * 一套前端资源加载策略, 实现资源同步加载/异步加载, 按需加载/预加载, 请求合并等机制
  * Etc,etc

### Technology Stack
根据产品的需求,功能模块,UI特色, 选择一套合适的技术栈. 以下为可选的技术元素, 可以自由组合

#### Building tools (dev)
  * bower/[NPM][npm]
  * commonjs
  * fis3
  * ProtractorJS
  * [NodeJS]
  
#### Frameworks (pro)
  * AngularJS/AngularUI/AngularUI-bootstrap/AngularUI-Router
  * Animate.css/EchartJS/signature_pad
  * Bootstrap/Jquery
  * html5-boilerplate/Modernizr/Normalize.css
  * reqwest
  * vue/vux


## Development Guides 

### Prerequisites
  
You need git to clone the [YHTML5-Seed] repository. You can get git from [http://git-scm.com/][git].
You can find git common commands from [YHTML5-Tutorial][YHTML5-Tutorial-Git].

We also use a number of [NodeJS][node] tools to initialize and test [YHTML5-Seed]. You must have node.js and
its package manager [NPM][npm] installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).
  
### Clone YHTML-Seed  

Clone the YHTML-Seed repository using [git][git]:

```
git clone git@github.com:yhtml5/YHTML5-Seed.git 
cd YHTML5-Seed/app 
```

If you just want to start a new project without the YHTML-Seed commit history then you can do:

```
bash
git clone --depth=1 https://github.com/yhtml5/YHTML5-Seed.git <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.


### Install Dependencies  

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
git checkout -b dev origin/dev

cd YHTML5-Seed
npm install
```

After everthing was installed, you should find that you have two new folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
YHTML-Seed changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Serving the Application Files

[NodeJS][node]本身就可以在本地创建一个服务器,新建一个前端应用, 而不需要一个后端的服务器
we recommend serving the project files using a local web server during development to avoid issues 
with security restrictions (sandbox) in browsers. 
The sandbox implementation varies between browsers, but quite often prevents things like cookies, xhr, etc to function properly 
when an html page is opened via `file://` scheme instead of `http://`

### Run the Application  

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
cd YHTML5-Seed/app 
fis3 server clean
fis3 server start
fis3 release -cwl
```

Now browse to the app at `http://localhost:8080`.

### Others

* **/** 为项目根目录,即fis-conf.js所在的目录. 所有文件监听, 基础构建, 项目开发都基于此
* 请更改项目名称,链接,信息. 包括但不限于: `/server/**`, `/app/fis-conf.js`, `README.md`
* 本脚手架具有俩种开发模式:
  * SPA应用, 渲染引擎在客户端, 适合开发移动端APP. 首页入口为`/start.html`; UI界面在`/view`目录下开发 
  * PG应用, 配合后台java, php使用, 适合开发WebApp. 首页入口为 `/page/start.html`; UI界面在`/page`下开发  
* **PG应用**: 
  * `/page` 下的组件**a**标签中的链接默认不监听, 注意应基于开发根目录进行定位
  * `/page/*` 为页面, 页面为UI组件的容器, 容器中只存放布局框架, 依赖关系
  * `/page/*/**` 为UI组件, 同级目录下存放与本组件相关的css, js, image, html 等所有相关信息
* 甚至整个项目可以同时存在SPA应用,PG应用
* 在这个项目中我们处理两种依赖关系: 生产环境中构建工具提供的依赖分析, 和框架提供的依赖管理。工具帮我们管理和测试应用程序

### Directory Layout

```
├── dist                             --产品发布目录 
├── node_modules 
├── package.json
├── README.md 
├── app                              --the source files for the application
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

[author]:https://img.shields.io/badge/author-yhtml5-blue.svg
[Build Status]:https://img.shields.io/travis/twbs/bootstrap/master.svg
[downloads total]:https://img.shields.io/github/downloads/atom/atom/total.svg
[npm version]:https://img.shields.io/npm/v/npm.svg
[node version]:https://img.shields.io/badge/node-v4.3.2-blue.svg

[bower]: http://bower.io
[es5-shim]:https://github.com/es-shims/es5-shim
[git]: http://git-scm.com/
[http-server]: https://github.com/nodeapps/http-server
[html5shiv]:https://github.com/aFarkas/html5shiv
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
[YHTML5-Tutorial-Git]:https://github.com/yhtml5/YHTML5-Tutorial/tree/master/app/git
[YHTML5-Seed]:https://github.com/yhtml5/YHTML5-Seed
