## YHTML5-Seed

YHTML5-Seed scaffolds out a new application, writing your build configuration (e.g fis3)
and pulling in relevant build tasks and package manager dependencies (e.g npm) that you might need for your build   
               
![npm version] ![node version] ![Build Status] ![downloads total] ![author]


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
  * Follow Baidu specification front-end development
  * Style structure, template engine,decoupling business logic
  * Front and rear ends separation, use json interactive data
  * Full-side support, fully supported browser, IOS, Android, Hybrid App, windows, Mac, Linux, TV
  * Etc,etc

### Technology stack

There are some Thchnology stack to deveolepmTent webapp:

We development **app-angular** first, and then deploy deploy to others

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

### Browser Compatibility
  * modern browsers: chrome, firefox, safari, Microsoft Edge  
  * IE8+
  * Etc,etc

#### [changeLog] 
#### [issue]
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




### Serving the Application Files

While AngularJS is client-side-only technology and it's possible to create AngularJS webapps that don't require a backend server at all,
we recommend serving the project files using a local web server during development to avoid issues with security restrictions (sandbox) in browsers. 
The sandbox implementation varies between browsers, but quite often prevents things like cookies, xhr, etc to function properly when an html page is opened via file:// scheme instead of http://.

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
app                            --> all of the source files for the application
|____bower_components          --> bower package manager
|____components
| |____css                     --> default stylesheet
| | |____animation.css
| | |____base.css
| | |____bootstrap.ex.css
| | |____box.css
| | |____cover.css
| | |____custom.css
| |____head
| | |____head.html
| | |____shortcut-icon.png
| |____iconfont
| | |____demo.css
| | |____demo.html
| | |____iconfont.css
| | |____iconfont.eot
| | |____iconfont.svg
| | |____iconfont.ttf
| | |____iconfont.woff
| |____js
| | |____.DS_Store
| | |____ctrl.js
| | |____directive.js
| | |____filter.js
| | |____router.js
| |____public
|____fis-conf.js
|____index.html                --> app layout file (the main html template file of the app)
|____map.json
|____server
| |____author.css
| |____author.js
|____view

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
