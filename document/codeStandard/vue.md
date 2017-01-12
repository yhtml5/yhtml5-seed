## VUE项目规范

* temple中不建议写表达式, 应提供一个hook以便于控制
* temple, data, vm 应该分开写
* data 可以按组件或业务进行归类

```
{
  notice: {
      isLoading: false,
      isSuccess: false,
      isValid: false,
      text: ''
    },
}
```

### 命名规范:
