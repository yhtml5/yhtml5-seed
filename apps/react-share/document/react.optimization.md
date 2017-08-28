## react 性能优化建议 

[optimizing performance][optimizing-performance]

### 编码规范

尽量按照官方书写格式

### Use the Production Build

```
new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
}),
new webpack.optimize.UglifyJsPlugin()
```
### shouldComponentUpdate 

```
shouldComponentUpdate(nextProps, nextState) {
  return true;
}
```

### Immutable.js

### 请在你希望发生重新渲染的dom上设置可被react识别的同级唯一key，否则react在某些情况可能不会重新渲染。 

### functional class

尽量使用无状态函数式组件

* 组件不会被实例化，整体渲染性能得到提升
  因为组件被精简成一个render方法的函数来实现的，由于是无状态组件，所以无状态组件就不会在有组件实例化的过程，无实例化过程也就不需要分配多余的内存，从而性能得到一定的提升。
* 没有`this` 作用域，是 pure function
  无状态组件由于没有实例化过程，所以无法访问组件this中的对象，例如：this.ref、this.state等均不能访问。若想访问就不能使用这种形式来创建组件
* 代码量更节省, 打包出来体积更小

### UI = function (data)

* 保持UI的简洁性
* 组件内的事件可以delegate 
* 提高可移植性

### 简化render

render 是生命周期中最常用的方法, 尽量只书写简单的display logic  
避免在render中做异步操作 [session, cookie, ajax, setData]

### this与事件绑定机制

* <div onClick={this.handleClick.bind(this)}/></div>

最好在constructor中绑定this
或者使用箭头函数
[handling events][handling-events]

###  请慎用setState，因其容易导致重新渲染

既然将数据主要交给了Redux来管理，那就尽量使用Redux管理你的数据和状态state，除了少数情况外，别忘了shouldComponentUpdate也需要比较state。 

### 请只传递component需要的props

传得太多，或者层次传得太深，都会加重shouldComponentUpdate里面的数据比较负担，因此，也请慎用spread attributes（<Component {…props} />）。 


### 请尽量使用const element

这个用法是工业聚在React讨论微信群里教会的，我们可以将不怎么变动，或者不需要传入状态的component写成const element的形式，这样能加快这个element的初始渲染速度。 




[handling-events]:https://facebook.github.io/react/docs/handling-events.html
[optimizing-performance]:https://facebook.github.io/react/docs/optimizing-performance.html