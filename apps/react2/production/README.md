## 智慧社区-前端设计方案
---

### 项目简介

智慧社区系统包含物业子系统（PC）、运营后台（PC）、用户前台（客户端）

**日期**：2017年2月16日 -- 2017年3月
**成员**：张大漾、李元庆

### 智慧社区系统功能模块

#### 客户端（支付宝小程序）

#### 运营后台（PC）

#### 物业子系统（PC）

<table cellspacing="0">
   <tr>
      <td>模块</td>
      <td>功能</td>
      <td>工期</td>
      <td>负责人</td>
      <td>备注（风险项）</td>
   </tr>
</table>

### 接口设计方案

> Note： 下划线方式命名的对象键为后台提供的，键值为问号待确定，`必传`则必须传值

#### http code

<table>
  <tr>
    <td>code</td>
    <td>object</td>
    <td>含义</td>
    <td>备注</td>
  </tr>
  <tr>
    <td>20000</td>
    <td>number</td>
    <td>调用成功</td>
  </tr>
  <tr>
    <td>50001</td>
    <td>number</td>
    <td>参数错误</td>
  </tr>
  <tr>
    <td>50002</td>
    <td>number</td>
    <td>token 失效</td>
  </tr>   
</table>

#### 客户端（支付宝小程序）

暂无

#### 运营后台（PC）

##### 服务管理 

url：`http://192.168.1.235:7111/property/service/show`

请求接口：
```
{
  data: {
    service_id: number, //必填 服务ID
  }
}
```

响应参数：
```
{
  code:number,
  data:{
    service_id: number, //服务ID
    name: string, //服务名称
    parent_name: string  //父级服务名称	
    img_url: string, //服务图标地址
    intro: string, //服务说明
    Url: string, //服务url
    status: number, //状态 1启用 2禁用
    order_sort: number, //排序
  }, 
  error:{
  
  }
}
```


##### 查看明细

url:  `http://192.168.1.235:7111/property/bill/show`

响应参数：
```
{
  code:number,
  data:{
    houseNumber //业主房号：1-1-303
  }, 
  error:object
}
```


##### 广告位管理列表

url: 

请求接口：
```
{
  data: {
    id: number, //用户id
    number: number, //广告位编号
    name: string, //广告位名称
    type: string, //广告位类型
    currentPage: number, //当前页
    rows: number, //每页多少条
  }
}
```

响应参数：
```
{
  code:number,
  data:{
    items:[{  // array,无数据为空数组 
      number: number, //广告位编号
      name: string, //广告位名称
      type: string, //广告位类型
      size: string, //推荐广告位大小
      iconUrl: string, //图示
      status: boolean, //广告位状态
     }]
    totalPages: number, //总共多少页
  }, 
  error:object
}
```

##### 广告位状态更新

url: 

请求接口：
```
{
  data: {
    id: number, //广告id
    status: boolean, //广告位状态
  }
}
```

响应参数：
```
{
  code:number,
  data:object,
  error:object
}
```


##### 广告位新增/编辑

url: 

请求接口：
```
{
  data: {
    id: number, //用户id，必传 
    name: string, //广告位名称，必传
    type: ?, //广告位类型，必传
    url: string, //广告位链接，
    size: sring, //广告位大小（推荐比例，推荐大小）
    status: Boolean, //广告位状态
  }
}
```

响应参数：
```
{
  code:number,
  data:object,
  error:object
}
```



##### 广告管理列表

url: 

请求接口：
```
{
  data: {
    id: number, //用户id，必传
    number: number, //广告编号
    name: string, //广告名称
    area: ?, //配置范围 ？？接口还是写死
    position: array, //所属广告位
    status: boolean, //广告状态
    currentPage: number, //当前页
    rows: number, //每页多少条
  }
}
```

响应参数：
```
{
  code:number,
  data:{
    items:[{  // array,无数据为空数组 
      number: number, //广告编号
      name: string, //广告名称
      position: string, //广告位置
      area: string, //配置范围
      url:string, //广告链接
      status: boolean, //广告状态
     }]
    totalPages: number, //总共多少页
  }, 
  error:object
}
```

##### 广告删除

url: 

请求接口：
```
{
  data: {
    id: number, //广告id
  }
}
```

响应参数：
```
{
  code:number,
  data:object,
  error:object
}
```


##### 广告状态更新

url: 

请求接口：
```
{
  data: {
    id: number, //广告id
    status: boolean, //广告位状态
  }
}
```

响应参数：
```
{
  code:number,
  data:object,
  error:object
}
```


##### 广告新增/编辑

url: 

请求接口：
```
{
  data: {
    id: number, //用户id，必传 
    position: ?, //广告置，必传  ??是否从服务端获取
    name: string, //广告名称，必传
    area: ?, //配置范围，必传
    image:?, //广告图片    
    url:string, //广告链接
    status: boolean, //广告状态
  }
}
```

响应参数：
```
{
  code:number,
  data:object,
  error:object
}
```

#### 物业子系统（PC）


### 数据模型设计


### 项目进度与安排


#### 项目进度  
 
|功能模块|负责人|备注|
|:---|:---|:---|
|项目构架|张大漾|项目基础工程搭建(项目包依赖管理, 配置fis-conf.js, 配置依赖关系)|
|资源更新|陈孟圆|字体图标, 设计稿件,切图等更新|
|项目开发|陈奇文,陈孟圆,张大漾|页面模块化开发, UI组件化开发|
|数据联调|陈奇文,张大漾|管理VM模块的数据绑定与通讯, 负责与后台数据接口联调|
|项目测试|陈奇文,陈孟圆,张大漾|测试页面逻辑是否正确, UI细节是否完善, 功能是否满足, 有无明显的bug|
|项目发布|张大漾|基于NodeJS编译输出完整的html页面, 完成基本bug修复, 处理代码冲突|

### 二、前端整体架构实现方案
	（1）页面基础组件基于react框架实现，并配合以redux、webpack、ES6为组合的发开模式，进行项目功能和交互的实现
	（2）接口数据格式为json，所有接口均只返回客户端json数据包而不是传统的视图数据，避免在需求变更后同一问题前后台都要修改的弊端
	（3）前端编码需符合现有的前端编码规范（一般规范、js规范、html规范、css规范）
	（4）该项目的实现方式为，php作为中间层完成表结构设计并提供相应接口，以及相应的接口文档，前端对接口数据进行处理，并处理用户权限问题
	（5）对整个项目结构进行分解，降低耦合度。


<style>
	table{width:100%;text-align:center;font-size:14px;}
	table tr td{padding:10px;}
	.font-blue{color:blue;}
</style>
