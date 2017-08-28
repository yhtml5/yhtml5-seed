## react 分享讨论会

<!--
我们现在的大多项目和react有关, 我们今天就来分享与讨论一下react的相关知识点与技术
待会如果谁回答了我提出的一个问题, 奖励一瓶旺仔, 他将写代码无bug 
-->

- [x] react skill tree 
- [x] react technology
  - [x] react and es6 `document/react.es6.md`
  - [x] react component `document/react.component.md`
  - [x] react lifecycle `document/react.lifecyle.md`
  - [x] createClass VS extend class VS functional 
  - [x] immutable.js
- [ ] flux and redux
- [x] react optimization 
- [x] questions and answer

### react skill tree `[concept, xmind]`

`一手资料的重要性`

* 掌握至少一种flux数据流
* 掌握es6的主要语法
* react-router, v3, v4
* react组件的几种写法与生命周期
* react 数据流
* 基于webpack的构建工具 (create-react-app/dva/yhtml5-cli) 

### react 知识点概况

不知大家学 react 或 写业务的 时会不会有这样的疑惑：
- es6 特性那么多，我需要全部学会吗?
- react component 有 3 种写法，我需要全部学会吗?
- reducer 的增删改应该怎么写?
- 怎么做全局/局部的错误处理?
- 怎么发异步请求?
- 怎么处理复杂的异步业务逻辑?
- 怎么配置路由?
- ...

#### 几个注意点

* setState [异步函数, callback]
* componentWillReceiveProps 不要改变state, 会死循环

### createClass VS extend class VS functional 

[babel-loader]:http://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-2&targets=&browsers=&builtIns=false&debug=false&code_lz=FBA
[react-mobile-web-optimization]:http://www.alloyteam.com/2016/05/react-mobile-web-optimization/
