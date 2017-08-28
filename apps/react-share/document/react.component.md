###  React Component
* [React Component](#react-component)
  * [Stateless Functional Components](#stateless-functional-components)
  * [JSX](#jsx)
    * [Component 嵌套](#component-嵌套)
    * [className](#classname)
    * [JavaScript 表达式](#javascript-表达式)
    * [Mapping Arrays to JSX](#mapping-arrays-to-jsx)
    * [注释](#注释)
    * [Spread Attributes](#spread-attributes)
  * [Props](#props)
    * [propTypes](#proptypes)
    * [往下传数据](#往下传数据)
    * [往上传数据](#往上传数据)
  * [CSS Modules](#css-modules)
    * [理解 CSS Modules](#理解-css-modules)
    * [定义全局 CSS](#定义全局-css)
    * [classnames Package](#classnames-package)

## React Component

###  Stateless Functional Components

React Component 有 3 种定义方式，分别是 `React.createClass`, `class` 和 `Stateless Functional Component`。
推荐尽量使用最后一种，保持简洁和无状态。这是函数，不是 Object，没有 `this` 作用域，是 pure function。

比如定义 App Component 。

```javascript
function App(props) {
  function handleClick() {
    props.dispatch({ type: 'app/create' });
  }
  return <div onClick={handleClick}>${props.name}</div>
}
```

等同于：

```javascript
class App extends React.Component {
  
  componentDidMount(){
    console.log('componentDidMount')
  }

  handleClick() {
    this.props.dispatch({ type: 'app/create' });
  }
  render() {
    return <div onClick={this.handleClick.bind(this)}>${this.props.name}</div>
  }
}
```

* 组件不会被实例化，整体渲染性能得到提升
  因为组件被精简成一个render方法的函数来实现的，由于是无状态组件，所以无状态组件就不会在有组件实例化的过程，无实例化过程也就不需要分配多余的内存，从而性能得到一定的提升。
* 没有`this` 作用域，是 pure function
  无状态组件由于没有实例化过程，所以无法访问组件this中的对象，例如：this.ref、this.state等均不能访问。若想访问就不能使用这种形式来创建组件
* 没有生命周期的方法
* 无状态组件只能访问输入的props，同样的props会得到同样的渲染结果，不会有副作用
* 代码量更节省, 打包出来体积更小

**总结: 一般情况推荐 Stateless Functional Component, 需要涉及到生命周期, 或者储存内部状态时候使用class,通常俩者结合使用**

class 组件有什么好处呢? 

### 组件互相转换

### functional component => class

```
function Clock(props) {

  const handleClick = (e) => {
   console.log('click')
  }

  return (
    <div>
      <h1 onClick={handleClick}>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

* Create an ES6 class with the same name that extends React.Component.
* Add a single empty method to it called render().
* Move the body of the function into the render() method.
* Replace props with this.props in the render() body.
* change the event handle 
* Delete the remaining empty function declaration.

```
class Clock extends React.Component {
  constructor(){
    super(props)
    this.handleClick=this.handleClick.bind(this)
    this.state={
      date: new Date()
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  handleClick(){
    console.log('click')
  }

  handleClick2 = () => {
    console.log('click')
  }

  handleClick3 () {
    console.log('click')
  }

  render() {
    return (
      <div>
        <h1 onClick={this.handleClick}>Hello, world!</h1>
        <h1 onClick={this.handleClick2}>Hello, world!</h1>
        <h1 onClick={(e) => this.handleClick3(e,value)}>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
### createClass component => class

`BindTelPhone`

[为什么废弃](https://facebook.github.io/react/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.createclass)

15.5以后的兼容方案

### JSX

#### Component 嵌套

类似 HTML，JSX 里可以给组件添加子组件。

```html
<App>
  <Header />
  <MainContent />
  <Footer />
</App>
```

#### className

`class` 是保留词，所以添加样式时，需用 `className` 代替 `class` 。

```html
<h1 className="fancy">Hello dva</h1>
```

#### JavaScript 表达式

JavaScript 表达式需要用 `{}` 括起来，会执行并返回结果。

比如：

```javascript
<h1>{ this.props.title }</h1>
```

#### Mapping Arrays to JSX

可以把数组映射为 JSX 元素列表。

```javascript
<ul>
  { this.props.todos.map((todo, i) => <li key={i}>{todo}</li>) }
</ul>
```

#### 注释

尽量别用 `//` 做单行注释。

```javascript
<h1>
  {/* multiline comment */}
  {/*
    multi
    line
    comment
    */}
  {
    // single line
  }
  Hello
</h1>
```

#### Spread Attributes

这是 JSX 从 ECMAScript6 借鉴过来的很有用的特性，用于扩充组件 props 。

比如：

```javascript
const attrs = {
  href: 'http://example.org',
  target: '_blank',
};
<a {...attrs}>Hello</a>
```

等同于

```javascript
const attrs = {
  href: 'http://example.org',
  target: '_blank',
};
<a href={attrs.href} target={attrs.target}>Hello</a>
```

**问题**

### Props

数据处理在 React 中是非常重要的概念之一，分别可以通过 props, state 和 context 来处理数据。

#### propTypes

JavaScript 是弱类型语言，所以请尽量声明 propTypes 对 props 进行校验，以减少不必要的问题。

```javascript
function App(props) {
  return <div>{props.name}</div>;
}
App.propTypes = {
  name: React.PropTypes.string.isRequired,
};
```

内置的 prop type 有：

- PropTypes.array
- PropTypes.bool
- PropTypes.func
- PropTypes.number
- PropTypes.object
- PropTypes.string

**[prop-types](https://github.com/facebook/prop-types)**
15.5版本以后独立成额外的npm包

#### 往下传数据

![](https://zos.alipayobjects.com/rmsportal/NAzeMyUoPMqxfRv.png)

#### 往上传数据

![](https://zos.alipayobjects.com/rmsportal/fiKKgDGuEJfSvxv.png)

### CSS Modules

<img src="https://zos.alipayobjects.com/rmsportal/mHVRpjNYhVuFdsS.png" width="150" style="background:#fff;" />

#### 理解 CSS Modules

一张图理解 CSS Modules 的工作原理：

![](https://zos.alipayobjects.com/rmsportal/SWBwWTbZKqxwEPq.png)

`button` class 在构建之后会被重命名为 `ProductList_button_1FU0u` 。`button` 是 local name，而 `ProductList_button_1FU0u` 是 global name 。**你可以用简短的描述性名字，而不需要关心命名冲突问题。**

然后你要做的全部事情就是在 css/less 文件里写 `.button {...}`，并在组件里通过 `styles.button` 来引用他。

#### 定义全局 CSS

CSS Modules 默认是局部作用域的，想要声明一个全局规则，可用 `:global` 语法。

比如：

```css
.title {
  color: red;
}
:global(.title) {
  color: green;
}
```

然后在引用的时候：

```javascript
<App className={styles.title} /> // red
<App className="title" />        // green
```

#### `classnames` Package

在一些复杂的场景中，一个元素可能对应多个 className，而每个 className 又基于一些条件来决定是否出现。这时，[classnames](https://github.com/JedWatson/classnames) 这个库就非常有用。

```javascript
import classnames from 'classnames';
const App = (props) => {
  const cls = classnames({
    btn: true,
    btnLarge: props.type === 'submit',
    btnSmall: props.type === 'edit',
  });
  return <div className={ cls } />;
}
```

这样，传入不同的 type 给 App 组件，就会返回不同的 className 组合：

```javascript
<App type="submit" /> // btn btnLarge
<App type="edit" />   // btn btnSmall
```
