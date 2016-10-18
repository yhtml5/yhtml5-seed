
# How to begin a Front-end project

Hello,大家好. 前些天我们分享了一些现在前端的一些理念思想, 开发会经历的几个阶段以及各个阶段需要做的事儿.   
都是先让大家有个概念. 今天和大家一起分享如何使用这套脚手架, 以及脚手架里面都有些什么.   
东西可能会很多很乱, 给我个机会, 尽量介绍清楚它,在这之前我们聊聊  

## 概念  
脚手架是什么东西
脚手架概念,在后端应用的比较多,它属于软件工程化的范畴. 能快速开始一个新项目
为了让大家有个概念, 我们来看个例子[yeoman]

现在的产品, 开发周期短, 前端人员少, 基础不扎实. 如果每一个项目都是从零开始, 边学遍开发的话, 时间肯定来不及  

每个公司的技术团队要把精力集中于业务逻辑的实现，而不是做一些IT基建工作, 甚至重复性的工作  
好的工程师，应该擅于分析各种平台/框架/工具，再加以利用拼装，快速高效实现公司核心业务！  

脚手架就是这样的一个东西: 解决前端开发中自动化工具、性能优化、模块化框架、开发规范、代码部署、开发流程等问题    
YHTML5-Seed是一个前端脚手架工具. 我们可以借助这个种子项目来构建一个全新的前端应用.可以是多页面应用, 单页面应用, 亦或是Hybird App   
你只需要根据具体的项目进行相关的构建任务搭建和包依赖管理. (脚手架中提供对应的demo)

当然卓越的前端工程师不会止于用轮子, 他们深入,当发现现有的轮子不满足业务的时候.
能自己写一套, 引起共鸣后, 大家一同维护, 最后打造一个开源社区, 推翻原来轮子的统治地位

现在前端变革非常大, 每天都会有新的技术取代旧的技术

> grunt, gulp, npm script
> jquery, angualr, vue, react

所以, 现在如何学习前端知识? 那么多的框架,工具,包.   
首先, 我们要打好基础, html/css/js/http/,  
然后学习主流的技术, 了解他们的开发思想,设计模式, 先会用,再深入实现原理. 试着为社区提交代码  
当它满足不了自己, 就能自己写一套推翻它.  
也许各种框架会昙花一现, 基础知识不会过时, 设计思想, 开发模式不会过时

基础服务我们没有必要自己造轮子,有限的人力投入到做好产品上. 做项目的过程中,造的一些轮子可以独立成一些组件, 再融合回脚手架中**xmind --Workflow**

**xmind --筑家易前端开发模式**

里面所有的技术元素都会不断更新换代, 但是这套工作流不会有大变化

- [x] 文档与规范
     - [ ] codeStandard
     - [ ] Directory Standard 
     - [ ] README.md
     - [x] progress.md 
     - [x] issue.md
     - [ ] Etc. etc.
     - [ ] (待融合晨翱的css规范)
- [ ] 包管理(框架,工具,元素,组件) 
     - [ ] bower
     - [ ] npm
     - [ ] [semver]
     - [ ] custom 
     - [ ] etc, xmind
- [ ] components
     - [ ] css
         -[ ] animation.css    
         -[ ] bootstap.base.css
         -[ ] custom.css 
         -[ ] base.css
     - [ ] iconfont
     - [ ] meta
     - [ ] js
         -[ ] 把常用的函数封装
- [ ] viewType
     - [ ] SPA
     - [ ] Pages
     - [ ] Etc.etc.
- [ ] 解决方案        
     - [ ] 浏览器兼容性解决方案
         - [ ] 浏览器前缀  --现代浏览器,不同浏览器厂商, 使用构建工具自动添加 css浏览器前缀
         - [ ] [normalize]  --清除各浏览器自带的标签样式规则, 消除样式差异
         - [ ] [html5shiv]  --创建新的HTML5标签,自动完成了设置 IE 浏览器和新语义元素的兼容性
         - [ ] [es5-shim]  --为低版本浏览器, 添加es5规则      
         - [ ] [json2]  --IE6 IE7 IE8 不支持 JSON 对象
         - [ ] [Modernizr]  --监测浏览器特性, 根据不同是否支持某个属性添加 相对于的css,js
     - [ ] 模拟数据
         - [ ] mock.js  (待扩展)
- [ ] other
     - [ ] .gitigoner
     - [ ] LICENSE  
     - [ ] design
     - [ ] production

到这里,大家可能在想, what are you talk about? 脚手架在哪里?  

那我们就开始吧, 让大家成功运行一个demo项目  

在开始之前,我们需要一些准备工作  

## 环境的安装  
  
前端开发还需要安装环境? 是的,前端也需要, 也很有必要这么做.  

### Linux命令行  

前端也需要敲命令行?  是的,不敲还正不行. 今天主要介绍几个常用的命令行,这些是基础:  

* cd . ..   
* ls -a  
* open  
* cat  
* touch  
* clear 
* vim  
* history  
* top arrow  
* Tab   
* sudo  

还有其他作用, 给大家一个链接自己去扩展

### Git
  
我们需要Git版本管理工具, 可以安装Github客户端, 也可以安装git  

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

```
git branch -a 
git checkout -b dev origin/dev 
```

我们通常在dev目录下面开发, 这里有一个坑, 直接本里新建一个dev分支,推送

### NodeJS  

几乎所有的构建工具都是是基于nodejs, 正确的安装很很重要  
window / mac, 安装官网已编译的安装包  
安装好了,npm就自动装好了, 国内通常非常慢, 可以使用cnpm替代  
[npm]包管理器非常厉害, npm script能替代做任何bower,fis3,gulp等工具能做的事情


```
npm install -g cnpm --registry=https://registry.npm.taobao.org
npm install xxx -g
npm install bower -g
npm install fis3 -g 
```

### 包管理器

**在这个项目中我们有俩种包管理工具**  

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


上面的基础知识,不论是否使用本脚手架工具都是需要掌握的, 具体的我这有一些相关教程,不懂一定要问.  
**专家盲点**
  
## 如何开始使用

```
open github.com  
git clone
git branch -a
git checkout -b dev origin/dev
cd YHTML5-Seed/app
ls
```

```
fis3 release pro -cwl | pro/cdn/test
fis-conf.js           | config file
change something and enjoying yourself
```

### fis3 配置与使用 [fis3]

* 命令行: 
  fis3 (xxx) -h               | help
  fis3 server clean           | clean cache
  fis3 inspect                | view congiguration
  fis3 inspect pro            | cdn/php/vm
  fis3 server start           | stop/restart/info/help | ipconfig
  fis3 release -cwl           | clean/watching/living
  fis3 release pro -cwl       | pro/cdn/test
  fis3 release pro -d ../dist/v0.1/ |
  fis-conf.js                 | config file

* 内容嵌入
* 定位资源
* 声明依赖
* glob

### Fis3常用报错
 
## 目录结构

不过遗憾的是: FIS3/gulp/grunt 将会被淘汰  
总得来说就是 它引入了一层复杂但是多余的抽象层，用来抽象直接的构建命令  
比如 gulp-uglify 和 grunt-contrib-uglify 用来包装 uglifyjs 命令。这层抽象所建立的插件生态带来了很多问题:  
额外的抽象; 带来了额外的学习成本; 插件依赖作者; 无论是插件质量、设计合理性、文档、更新及时性等严重依赖作者自身的水平与投入  
所以以后我们会自己构建shell脚本, 定制更符合我们公司的构建工具.   

[semver]:http://semver.org
[npm]:https://www.npmjs.com
[yeoman]:http://yeoman.io
[fis3]:http://fis3.baidu.com 
