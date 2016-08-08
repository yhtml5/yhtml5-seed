## YHTML5-Seed


YHTML5-Seed 一个新应用程序脚手架，用来写你的构建程序，你可能会需要为你的构建进行相关的任务搭建和包管理依赖

               
![npm version] ![node version] ![Build Status] ![downloads total] ![author]


### 快速链接
- [项目简介](#项目简介)
    - [项目进展]
    - [版本历史](https://github.com/yhtml5/FW-Dashboard/blob/master/changeLog.md)
    - [issue]
    - [特点](#特点)
    - [浏览器兼容](#浏览器兼容)
    - [目录布局](#目录布局)
    - [入门指南](#入门指南)
    - [开发环境](#开发环境)
    - [克隆Dashboard](#克隆Dashboard)
    - [安装依赖](#安装依赖)
    - [运行应用程序](#运行应用程序)
    

## 项目简介

### 特点
  * Bower安装自动的线式的依赖
  * 遵循百度前端开发规范
  * 样式结构、模板引擎、业务逻辑解耦
  * 前后端分离，使用json等交互数据
  * 全端支持，全面支持浏览器、IOS、Android、HybirdApp、windows、Mac、Linux、TV
  * Etc,etc

### 技术栈

有一些技术堆栈开发的Web应用程序：

#### 


  * AngularJS
  * AngularUI
  * AngularUI-bootstrap
  * AngularUI-Router
  * Bootstrap
  * EchartJS 
  * Fis3
  * html5-boilerplate
  * ProtractorJS
  * NodeJS 

### 浏览器兼容性
  * modern browsers: chrome, firefox, safari, Microsoft Edge  
  * IE8+
  * Etc,etc

#### [版本历史]
#### [issue]
#### [项目进展]

## 入门指南

开始你可以简单克隆angular-seed库和安装依赖关系：

### 开发环境

你需要git去克隆Dashboard库。你可以从http://git-scm.com/得到git
[http://git-scm.com/](http://git-scm.com/).

我们也使用node.js工具初始化和测试Dashboard。你必须有node.js和npm，你可以从http://nodejs.org/得到这些
[http://nodejs.org/](http://nodejs.org/).

 
### 克隆Dashboard

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


[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[travis]: https://travis-ci.org/
[http-server]: https://github.com/nodeapps/http-server

[npm version]:https://img.shields.io/npm/v/npm.svg
[node version]:https://img.shields.io/badge/node-v4.3.2-blue.svg
[Build Status]:https://img.shields.io/travis/twbs/bootstrap/master.svg
[downloads total]:https://img.shields.io/github/downloads/atom/atom/total.svg
[author]:https://img.shields.io/badge/author-yhtml5-blue.svg

[changeLog]:https://github.com/yhtml5/FW-Dashboard/blob/master/changeLog.md
[problem]:https://github.com/yhtml5/FW-Dashboard/blob/master/question.md
[project progress]:https://github.com/yhtml5/FW-Dashboard/issues?q=%E4%BB%BB%E5%8A%A1+is%3Aopen
[issue]:https://github.com/yhtml5/FW-Dashboard/blob/master/changeLog.md
