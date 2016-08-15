## YHTML5-Seed丨[中文文档] [问题记录] [项目进度]


YHTML5-Seed是一个前端脚手架. 我们可以借助这个种子项目来构建一个全新的前端应用.   

你可能需要根据具体的项目进行相关的任务搭建和包依赖管理.
               
![npm version] ![node version] ![Build Status] ![downloads total] ![author]


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
  * 解决前端开发中自动化工具、性能优化、模块化框架、开发规范、代码部署、开发流程等问题 
  * 遵循百度前端开发规范
  * 使用npm全自动安装所依赖的包
  * 样式结构、模板引擎、业务逻辑解耦
  * 前后端分离，使用json等交互数据
  * 规范项目开发, 测试, 发布等目录及文件路径
  * 模块化开发, 分而治之, 各模块同目录下就近维护 
  * Etc,etc

### 技术栈

#### 前端工具
  * bower
  * Fis3
  * ProtractorJS
  * NodeJS 

#### 前端框架/类库

  * AngularJS
  * AngularUI
  * AngularUI-bootstrap
  * AngularUI-Router
  * Bootstrap
  * EchartJS 
  * html5-boilerplate
  
### 浏览器兼容性
  * modern browsers: chrome, firefox, safari, Edge  
  * IE8+
  * Etc,etc

## 入门指南

### 开发环境

首先, 你需要git去克隆YHTML5-Seed库. 你需要下载git. [http://git-scm.com/](http://git-scm.com/).

我们也使用node.js工具初始化和测试Dashboard。你必须有node.js和npm
[http://nodejs.org/](http://nodejs.org/).

 
### 克隆项目

用git克隆Dashboard库
[git][git]:
```
git clone https://github.com/yhtml5/YHTML5-WEB.git
cd YHTML5-WEB\dashboard
```

如果你想开始一个没有dashboard历史命令的新项目，你可以：

```bash
git clone --depth=1 https://github.com/yhtml5/YHTML5-WEB.git <your-project-name>
```

告诉git只下拉有历史数据的命令

### 安装依赖

在这个项目中我们有两种依赖：工具和angular框架源码。工具帮我们管理和测试应用程序

* 我们通过npm得到依赖的工具
[node package manager][npm].
* 我们通过bower得到angular源码
[client-side code package manager][bower].

我们能简单的用npm去自动运行bower：
```
npm install
```

这也叫做bower install。在你的项目里你应该能找到两个新的文件。

* `node_modules`-工具包含了我们需要的npm包
* `app/bower_components`-包含了angular框架文件


*注意`bower_components`文件通常被安装在根文件夹，但dashboard改变位置通过`.bowerrc`文件。
把它放在app文件夹中，更容易通过网络服务提供文件。*



### 服务应用程序文件

AngularHS的client-side-only技术可能创建AngularJS webapps而不需要一个后端的服务器，
我们推荐服务项目文件使用一个本地的服务器在开发过程中避免在浏览器中的安全限制。
sandbox实现在浏览器之间有所不同，但往往防止一些像cookies，xhr等，当一个html页面通过一个文件打开才能正常工作而不是http的方案


### 运行应用程序

我们已经配置了一个简单的开发web服务的项目。最简单的方法开始这个服务：

```
cd YHTML5-WEB\dashboard\app 
fis3 server start
fis3 release -wl
```

Now browse to the app at `http://localhost:8080`.

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
[bower]: http://bower.io
[Build Status]:https://img.shields.io/travis/twbs/bootstrap/master.svg
[changeLog]:https://github.com/yhtml5/FW-Dashboard/blob/master/changeLog.md
[downloads total]:https://img.shields.io/github/downloads/atom/atom/total.svg
[git]: http://git-scm.com/
[http-server]: https://github.com/nodeapps/http-server
[issue]:https://github.com/yhtml5/FW-Dashboard/blob/master/changeLog.md
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[npm]: https://www.npmjs.org/
[npm version]:https://img.shields.io/npm/v/npm.svg
[node]: http://nodejs.org
[node version]:https://img.shields.io/badge/node-v4.3.2-blue.svg
[problem]:https://github.com/yhtml5/FW-Dashboard/blob/master/question.md
[project progress]:https://github.com/yhtml5/FW-Dashboard/issues?q=%E4%BB%BB%E5%8A%A1+is%3Aopen
[protractor]: https://github.com/angular/protractor
[travis]: https://travis-ci.org/
[问题解析]:https://github.com/yhtml5/YHTML-Seed/issue.md
[项目进度]:https://github.com/yhtml5/YHTML-Seed/progress.md
[英文文档]:https://github.com/yhtml5/YHTML5-Seed/README.md

