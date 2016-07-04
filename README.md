## YHTML5-Seed

YHTML5-Seed scaffolds out a new application, writing your build configuration (e.g fis3)
               and pulling in relevant build tasks and package manager dependencies (e.g npm) that you might need for your build

               ![npm version]
               ![node version]
               ![Build Status]
               ![downloads total]
               ![author]

               ### Quick Links
- [Introduction](#introduction)
    - [project progress]  
    - [changeLog](https://github.com/yhtml5/FW-Dashboard/blob/master/changeLog.md)
    - [issue]
    - [Features](#features)
    - [Browser Compatibility](#browser-compatibility)
    - [Directory Layout](#directory-layout) 
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Clone Dashboard](#clone-dashboard)
    - [Install Dependencies](#install-dependencies)
    - [Run the Application](#run-the-application)
    

## Introduction  

### Features  
  * Automagically wire-up dependencies installed with Bower
  * 遵循百度前端开发规范(待翻译)
  * 样式结构、模板引擎、业务逻辑解耦(待翻译)
  * 前后端分离，使用json等交互数据(待翻译)
  * 全端支持，全面支持浏览器、IOS、Android、HybirdApp、windows、Mac、Linux、TV(待翻译)
  * Etc,etc

### Technology stack

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

### Browser Compatibility
  * modern browsers: chrome, firefox, safari, Microsoft Edge  
  * IE8+
  * Etc,etc

#### [changeLog] 
#### [problem]
#### [project progress]

## Getting Started  

To get you started you can simply clone the angular-seed repository and install the dependencies:

### Prerequisites  

You need git to clone the Dashboard repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test Dashboard. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).
 
### Clone Dashboard  

Clone the Dashboard repository using [git][git]:

```
git clone https://github.com/yhtml5/YHTML5-WEB.git
cd YHTML5-WEB\dashboard
```

If you just want to start a new project without the dashboard commit history then you can do:

```bash
git clone --depth=1 https://github.com/yhtml5/YHTML5-WEB.git <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

### Install Dependencies  

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
dashboard changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application  

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
cd YHTML5-WEB\dashboard\app 
fis3 server start
fis3 release -wl
```

Now browse to the app at `http://localhost:8080`.

### Directory Layout
```
|____components
| |____footer
| | |____footer.html
| | |____footer.js
| |____head
| | |____head.css
| | |____head.html
| | |____iconfont.eot
| | |____iconfont.svg
| | |____iconfont.ttf
| | |____iconfont.woff
| | |____shortcut-icon.png
| |____header
| | |____header.css
| | |____header.html
| | |____logo-sdk.png
| |____help-center
| | |____help-center.css
| | |____help-center.html
| | |____help-center.js
| |____panel-add
| | |____panel-add.css
| | |____panel-add.html
| |____panel-display
| | |____panel-display.css
| | |____panel-display.html
| |____public
| | |____jq-index.js
| | |____ng-app.js
| | |____ng-ctrl.js
| |____undeveloped
| | |____undeveloped.html
|____fis-conf.js
|____map.json
|____Reademe.html
|____server
| |____demo.json
| |____init.json
|____static
| |____iconfont
| | |____demo.css
| | |____demo.html
| | |____iconfont.css
| | |____iconfont.eot
| | |____iconfont.svg
| | |____iconfont.ttf
| | |____iconfont.woff
| | |____shortcut-icon.png
| |____img
| |____lib
| | |____angular
| | | |____angular.js
| | | |____angular.min.js
| | |____bootstrap
| | | |____bootstrap.css
| | | |____bootstrap.js
| | |____jquery
| | | |____jquery-2.2.0.min.js
| | | |____jquery.min.js
|____template
| |____dashboard.html
| |____index.html
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
