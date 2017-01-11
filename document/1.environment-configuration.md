## Environment configuration

### Prerequisites

You need git to clone the [YHTML5-Seed] repository. You can get git from [http://git-scm.com/][git].
You can find git common commands from [YHTML5-Tutorial][YHTML5-Tutorial-Git].

We also use a number of [NodeJS][node] tools to initialize and test [YHTML5-Seed]. You must have node.js and
its package manager [NPM][npm] installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

if you want to install node in mac,please read [tutorial][install-node-with-brew-and-nvm]

### Clone YHTML-Seed

Clone the YHTML-Seed repository using [git][git]:

```
git clone git@github.com:yhtml5/YHTML5-Seed.git
cd YHTML5-Seed/app
```

If you just want to start a new project without the YHTML-Seed commit history then you can do:

```
git clone --depth=1 https://github.com/yhtml5/YHTML5-Seed.git <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

then let's checkout a dev branch
```
git checkout -b dev

# checkout branch from remote repertory
git checkout -b dev origin/dev
```

### Install Dependencies

We have many dependencies in our project,npm will help us manage and test the application.

> Note: We get the tools we depend upon via `npm`, the [node package manager][npm].

We have preconfigured `npm` to automatically run program so we can simply do:

```bash
cd your-project-name
npm install

# but in YHTML5-Seed you can use npm start it is equal to npm i && npm run build && npm run dev
npm start
```

After everthing was installed, you should find that you have a new folders in your project.

* `node_modules` - contains the npm packages for the tools we need

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
cd your-project-name
npm run dev
```

Now browse to the app at `http://0.0.0.0:61200`.

### Build production

``` bash
# build for production with minification
npm run build

# build debug model
npm run build-debug
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
[YHTML5-Seed-issue]:./document/issue.md
[YHTML5-Tutorial-Git]:https://github.com/yhtml5/YHTML5-Tutorial/tree/master/app/git
[install-node-with-brew-and-nvm]:https://github.com/yhtml5/YHTML5-Tutorial/blob/master/app/mac/install-node-with-brew-and-nvm.md
