## Development Guides

* [environment sconfigguration][environment-sconfigguration]
* How to use webpack
* webpack config
* [frequent problems][issue]
* [browser compatible][browser-compatible]

### Notice
* Models | action的名称（type）如果是在 model 以外调用需要添加 namespace
* 指定订阅数据，这里关联了 users
  ````
  function mapStateToProps({ users }) {
    return { users };
  }
  ````
* 建立数据关联关系
  > export default connect(mapStateToProps)(Users);

### Naming rules
* 通用组件，组件路由首字母大写，组件事件`on`开头
* 路由路径使用`-`连接，函数使用驼峰法
* ACTION，描述事情发生的动作，like `'ADD_TODO'`
* models's namespace: 'Model'
* request action's name start with `[creat,delete,update,query]`

###
[environment-sconfigguration]:./01-environment-configuration.md
[issue]:./02-frequent-problems.md
[browser-compatible]:./06-browser-compatible.md
