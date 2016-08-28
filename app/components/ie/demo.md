## 条件注释判断浏览器版本 [引用地址]


### operator
* !    [if !IE]  --NOT运算符
* lt   [if lt IE 5.5]  --小于运算符
* lte  [if lte IE 6]  --小于或等于运算
* gt   [if gt IE 5]  --大于运算符
* gte  [if gte IE 7]  --大于或等于运算
* ( )  [if !(IE 7)]  --子表达式。在与布尔运算符用于创建更复杂的表达式
* &    [if (gt IE 5)&(lt IE 7)]  --AND运算符
* |    [if (IE 6)|(IE 7)]  --OR运算符

> less-than, equal, greater-than, operator


### demo

```
<!--[if !IE]><!--> 除IE外都可识别 <!--<![endif]-->
<!--[if IE]> 所有的IE可识别 <![endif]-->
<!--[if IE 6]> 仅IE6可识别 <![endif]-->
<!--[if lt IE 6]> IE6以下版本浏览器显示(不包括IE6) <![endif]-->
<!--[if lte IE 6]> IE6及IE6以下版本浏览器显示 <![endif]-->
<!--[if gt IE 6]> IE6以上版本可识别(不包括IE6) <![endif]-->
<!--[if gte IE 6]> IE6以及IE6以上版本可识别 <![endif]-->
```

### usage

```
加载CSS2
<!--[if lt IE 9]>
加载CSS1(可以把要重写的写在这里).
<![endif]-->
```

[引用地址]:http://www.cnblogs.com/thinkingthigh/archive/2013/06/19/3144239.html