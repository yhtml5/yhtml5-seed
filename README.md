## YHTML5-Seed丨[英文文档] [问题记录] [项目进度]
               
![npm version] ![node version] ![Build Status] ![downloads total] ![author]

YHTML5-Seed是一个前端脚手架工具. 我们可以借助这个种子项目来构建一个全新的前端应用.可以是多页面应用, 单页面应用, 亦或是Hybird App   
你只需要根据具体的项目进行相关的构建任务搭建和包依赖管理.

### 快速链接
- [项目简介](#项目简介)
    - [项目特点](#项目特点)
    - [技术栈](#浏览器兼容)
- [入门指南](#入门指南)
    - [开发环境](#开发环境)
    - [克隆Dashboard](#克隆Dashboard)
    - [安装依赖](#安装依赖)
    - [运行应用程序](#运行应用程序)
    - [项目进展]
    - [版本历史](https://github.com/yhtml5/FW-Dashboard/blob/master/changeLog.md)
    - [issue]

## 项目简介 

### 项目特点  
  * 遵循筑家易前端开发代码规范(待完善)
  * 使用npm全自动安装所依赖的包,构建项目初始框架
  * 支持阿里矢量图标 (6w+ 可自定义图标)
  * 规范项目开发, 测试, 发布等目录及文件路径
  * 样式结构、模板引擎、业务逻辑解耦, 高内聚、低耦合
  * 模块化开发, 分而治之, 各模块同目录下就近维护 
  * 支持前后端分离，使用json等交互数据(推荐)
  * 自动对CSS的标准化和通用错误进行修复, 检测并兼容大部分主流浏览器
  * 解决前端开发中自动化工具、性能优化、模块化框架、开发规范、代码部署、开发流程等问题
  * 一套前端资源加载策略, 实现资源同步加载/异步加载, 按需加载/预加载, 请求合并等机制
  * Etc,etc

### 技术栈
根据产品的需求,功能模块,UI特色, 选择一套合适的技术栈. 以下为可选的技术元素, 可以自由组合

#### 构建工具(开发环境)
  * bower
  * commonjs
  * Fis3
  * ProtractorJS
  * [NodeJS]
  * [NPM]

#### 前端框架/类库(生产环境)
  * AngularJS
  * AngularUI
  * AngularUI-bootstrap
  * AngularUI-Router
  * Animate.css
  * Bootstrap
  * EchartJS 
  * html5-boilerplate
  * Jquery
  * Modernizr
  * Normalize.css
  * Vue.js

## 开发指南  
### 开发环境  
首先, 你需要git去克隆[YHTML5-Seed]库. 你需要下载[git].   
我们也使用[NodeJS]工具初始化和测试cmbc2。你必须有Node环境和[NPM]

### 克隆项目

用Git克隆项目仓库

```
git clone git@github.com:yhtml5/YHTML5-Seed.git 
cd YHTML5-Seed/app 
```

如果你想开始一个没有dashboard历史命令的新项目，你可以：

```
bash
git clone --depth=1 https://github.com/yhtml5/YHTML5-WEB.git <your-project-name>
```

告诉git只下拉有历史数据的命令

### 安装依赖

**在这个项目中我们处理两种依赖关系: 生产环境中构建工具提供的依赖分析, 和框架提供的依赖管理。工具帮我们管理和测试应用程序**

* 我们通过`npm`管理开发环境依赖的构建工具及插件. [Node 包管理工具][npm].  
* 我们通过`bower`管理项目依赖的第三方包. [客户端代码包管理][bower].

我们能简单的用命令行去安装项目依赖的包

```
cd YHTML5-Seed
npm install

cd YHTML5-Seed/app
bower install
```

安装后在项目里你应该能找到两个新的文件。  
* `node_modules`-工具包含了我们需要的npm包  
* `app/bower_components`-包含了angular框架文件  

> 注意`bower_components`文件通常被安装在根文件夹，但dashboard改变位置通过`.bowerrc`文件。  
> 把它放在app文件夹中，更容易通过网络服务提供文件。  

### 服务应用程序文件  
[NodeJS]本身就可以在本地创建一个服务器,新建一个前端应用, 而不需要一个后端的服务器  
我们推荐整个项目都在一个本地的服务器中进行, 在开发过程中就避免一些线上环境将会遇到的问题.   
如在浏览器中的安全限制, 跨域请求, 资源路径, 模拟数据等等  
> sandbox实现在浏览器之间有所不同，但往往防止一些像cookies，xhr等，需要一个html页面通过一次http请求可以正常工作, 而不是本地文件直接打开.  

### 运行应用程序
我们已经配置了一个简单的开发web服务的项目。最简单的方法开始这个服务：

```
cd YHTML5-Seed/app 
fis3 server clean
fis3 server start
fis3 release -cwl
```

现在我们可以通过 `http://localhost:8080` 访问应用首页了


### 其它工作

* **/** 为项目根目录, 所有文件监听, 基础构建, 项目开发都基于此
* page下的组件**a**标签中的链接默认不监听, 注意应基于开发根目录进行定位
* 本脚手架具有俩种开发模式:
  * SPA应用, 渲染引擎在客户端, 适合开发移动端APP. 首页入口为 '/index.html'; UI界面在/view 目录下开发 
  * PG应用, 配合后台java, php使用, 适合开发WebApp. 首页入口为 '/page/index.html'; UI界面在/page下开发  


### 目录布局

```
YHTML5-Seed
|____app                              --> all of the source files for the application 所有应用程序的源文件
| |____index.html                     --> app layout file (the main html template file of the app) 应用程序布局文件（该应用程序的主要的HTML模板文件）
| |____fis-conf.js                    --> fis3 配置文件
| |____bower.json                     --> bower package manager  bower包管理
| |____bower_components               --> custom comonents for project 项目自定义组件
| |____map.json
| |____components
| | |____css                          --> app's stylesheet  应用程序的样式表
| | | |____angular.css                --> angular 特有样式
| | | |____animation.css              --> animation css  css动画
| | | |____base.css                   --> 基础css属性
| | | |____bootstrap.base.css
| | | |____bootstrap.component.css
| | | |____box.css
| | | |____custom.css
| | |____head
| | | |____index.html
| | | |____shortcut-icon.png
| | |____js
| | | |____ctrl.js
| | | |____directive.js
| | | |____filter.js
| | | |____router.js
| | |____iconfont
| | |____ie
| | |____public
| | |____require
| |____server
| | |____author.css
| | |____author.js
| | |____console.js
| |____view
| | |____browsehappy
| | |____nav
| | | |____index.html
|____blog.md
|____issue.md
|____LICENSE
|____package.json
|____progress.md
|____README.md             
|____README_ZH.md
|____node_modules    
|____dist                             --> 产品发布目录
```

[author]:https://img.shields.io/badge/author-yhtml5-blue.svg
[Build Status]:https://img.shields.io/travis/twbs/bootstrap/master.svg
[downloads total]:https://img.shields.io/github/downloads/atom/atom/total.svg
[npm version]:https://img.shields.io/npm/v/npm.svg
[node version]:https://img.shields.io/badge/node-v4.3.2-blue.svg

[bower]: http://bower.io
[git]: http://git-scm.com/
[http-server]: https://github.com/nodeapps/http-server
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[modernizr]:https://modernizr.com
[NPM]: https://www.npmjs.org/
[NodeJS]: http://nodejs.org
[problem]:https://github.com/yhtml5/FW-Dashboard/blob/master/question.md
[project progress]:https://github.com/yhtml5/FW-Dashboard/issues?q=%E4%BB%BB%E5%8A%A1+is%3Aopen
[protractor]: https://github.com/angular/protractor
[travis]: https://travis-ci.org/

[英文文档]:https://github.com/yhtml5/YHTML5-Seed/README.md
[项目问题]:https://github.com/yhtml5/YHTML-Seed/issue.md
[issue]:https://github.com/yhtml5/FW-Dashboard/blob/master/issue.md
[项目进度]:https://github.com/yhtml5/YHTML-Seed/progress.md
[project progress]:https://github.com/yhtml5/FW-Dashboard/issues?q=%E4%BB%BB%E5%8A%A1+is%3Aopen
