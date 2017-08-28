这篇文档梳理了基于 使用react 需要 掌握 ES6语法 的最小知识集，
让你可以用最少的时间掌握react与es6的全部知识，并且不需要掌握额外的冗余知识。

## 目录

* [JavaScript 语言](#javascript-语言)
  * [变量声明](#变量声明)
    * [const 和 let](#const-和-let)
    * [模板字符串](#模板字符串)
    * [默认参数](#默认参数)
  * [箭头函数](#箭头函数)
  * [模块的 Import 和 Export](#模块的-import-和-export)
  * [ES6 对象和数组](#es6-对象和数组)
    * [析构赋值](#析构赋值)
    * [对象字面量改进](#对象字面量改进)
    * [Spread Operator](#spread-operator)
  * [Promises](#promises)
  * [Generators](#generators)

## JavaScript 语言

### 变量声明

#### const 和 let

不要用 `var`，而是用 `const` 和 `let`，分别表示常量和变量。不同于 `var` 的函数作用域，`const` 和 `let` 都是块级作用域。

```javascript
const DELAY = 1000;

let count = 0;
count = count + 1;
```

**Notice**

* 不能重复声明
* 声明就要赋值
* 块级作用域
* const 声明的是对象类型, 表示对其的引用, 如果声明后对象改变了, 还是相等的 

```
const b= {a:1,b:2,c:3}
const a = b 
a.d = 4 
console.log(a === b) //true
```

#### 模板字符串

模板字符串提供了另一种做字符串组合的方法。

```javascript
const user = 'world';
console.log(`hello ${user}`);  // hello world

// 多行
const content = `
  Hello ${firstName},
  Thanks for ordering ${qty} tickets to ${event}.
`;
```

**Notice**

```
//class
<div className=`btn ${isActive ? 'active' : ''}`/>
```

#### 默认参数

```javascript
function logActivity(activity = 'skiing') {
  console.log(activity);
}

logActivity();  // skiing
```

### 箭头函数

函数的快捷写法，不需要通过 `function` 关键字创建函数，并且还可以省略 `return` 关键字。

同时，箭头函数还会继承当前上下文的 `this` 关键字。

比如：

```javascript
[1, 2, 3].map(x => x + 1);  // [2, 3, 4]
```

等同于：

```javascript
[1, 2, 3].map((function(x) {
  return x + 1;
}).bind(this));
```

**Notice**

单行与多行
```
() => do()
() => {
  console.log('do')
  return do()
}
```

### 模块的 Import 和 Export

`import` 用于引入模块，`export` 用于导出模块。

比如：

```javascript
// 引入全部
import dva from 'dva';

// 引入部分
import { connect } from 'dva';
import { Link, Route } from 'dva/router';

// 引入全部并作为 github 对象
import * as github from './services/github';

// 导出默认
export default App;
// 部分导出，需 import { App } from './file'; 引入
export class App extend Component {};
```

**Notice**

```commanjs
const Path = require('path')
module.exports = {
  a,b,c
}

import Path from ('path') 
export {
  a,b,c
}
```


### ES6 对象和数组

#### 析构赋值

析构赋值让我们从 Object 或 Array 里取部分数据存为变量。

```javascript
// 对象
const user = { name: 'guanguan', age: 2 };
const { name, age } = user;
console.log(`${name} : ${age}`);  // guanguan : 2

// 数组
const arr = [1, 2];
const [foo, bar] = arr;
console.log(foo);  // 1
```

我们也可以析构传入的函数参数。

```javascript
const add = (state, { payload }) => {
  return state.concat(payload);
};
```

析构时还可以配 alias，让代码更具有语义。

```javascript
const add = (state, { payload: todo }) => {
  return state.concat(todo);
};
```

#### 对象字面量改进

这是析构的反向操作，用于重新组织一个 Object 。

```javascript
const name = 'duoduo';
const age = 8;

const user = { name, age };  // { name: 'duoduo', age: 8 }
```

定义对象方法时，还可以省去 `function` 关键字。

```javascript
app.model({
  reducers: {
    add() {}  // 等同于 add: function() {}
  },
  effects: {
    *addRemote() {}  // 等同于 addRemote: function*() {}
  },
});
```

#### Spread Operator 

Spread Operator 即 3 个点 `...`，有几种不同的使用方法。

可用于组装数组。

```javascript
const todos = ['Learn dva'];
[...todos, 'Learn antd'];  // ['Learn dva', 'Learn antd']
```

也可用于获取数组的部分项。

```javascript
const arr = ['a', 'b', 'c'];
const [first, ...rest] = arr;
rest;  // ['b', 'c']

// With ignore
const [first, , ...rest] = arr;
rest;  // ['c']
```

还可收集函数参数为数组。

```javascript
function directions(first, ...rest) {
  console.log(rest);
}
directions('a', 'b', 'c');  // ['b', 'c'];
```

代替 apply。

```javascript
function foo(x, y, z) {}
const args = [1,2,3];

// 下面两句效果相同
foo.apply(null, args);
foo(...args);
```

对于 Object 而言，用于组合成新的 Object 。(ES2017 stage-2 proposal)

```javascript
const foo = {
  a: 1,
  b: 2,
};
const bar = {
  b: 3,
  c: 2,
};
const d = 4;

const ret = { ...foo, ...bar, d };  // { a:1, b:3, c:2, d:4 }
```

此外，在 JSX 中 Spread Operator 还可用于扩展 props，详见 [Spread Attributes](#spread-attributes)。

**Notice**

```
function demo () {
  const a = {a:1,b:2,c:3}
  const b = {d:1,e:2,f:3}

  return (
    <div {...a, ...b}/> 
  )
}
```

### Promises

Promise 用于更优雅地处理异步请求。比如发起异步请求：

```javascript
fetch('/api/todos')
  .then(res => res.json())
  .then(data => ({ data }))
  .catch(err => ({ err }));
```

定义 Promise 。

```javascript
const delay = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

delay(1000).then(_ => {
  console.log('executed');
});
```

**Notice**

```
.catch((err) => {
    console.log('fail')
    throw new Error(err)
})
```

### Generators

基于Promise的将异步转为同步的函数, 也可以借助thunk函数

### async/awiat

`app/packages/task/toggleStatus`




