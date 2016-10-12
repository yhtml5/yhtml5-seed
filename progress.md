# The Progress of YHTML5-Seed

### **任务分配**

<table cellspacing="0">
  <thead>
   <tr>
     <th>功能模块</td>
     <th>负责人</td>
     <th>备注</td>
   </tr>
  </thead>
  <tbody> 
   <tr>
      <td>项目构架</td>
      <td>Kyle</td>
      <td>项目基础工程搭建(项目包依赖管理, 配置fis-conf.js, 配置依赖关系)</td>
   </tr>
   <tr>
       <td>资源更新</td>
       <td>Meng</td>
       <td>字体图标, 设计稿件,切图等更新 </td>
   </tr>
   <tr>
      <td>项目开发</td>
      <td>wen,Meng,Kyle</td>
      <td>页面模块化开发, UI组件化开发</td>
   </tr>
   <tr>
      <td>数据联调</td>
      <td>wen,Kyle</td>
      <td>管理VM模块的数据绑定与通讯, 负责与后台数据接口联调</td>
   </tr>
   <tr>
      <td>项目测试</td>
      <td>wen,Meng,Kyle</td>
      <td>测试页面逻辑是否正确, UI细节是否完善, 功能是否满足, 有无明显的bug</td>
   </tr>
   <tr>
      <td>项目发布</td>
      <td>Kyle</td>
      <td>基于NodeJS编译输出完整的html页面, 完成基本bug修复, 处理代码冲突  </td>
   </tr>
   </tbody>
</table>

### All
- [ ] 分析依赖关系, 项目内部用require取代packOrder
- [ ] 增加react, vue项目的脚手架
- [ ] 处理github项目,归类, 图片收集
- [ ] 增加文字打印效果, like npmjs官网显示
- [ ] update readme document
- [ ] merging angular, jquery files into fis3-conf.js
- [ ] add demos for YHTML5-Seed, (like bootstrap4 for deginer, animation, buttons)
- [ ] 命名规范:
     - [ ] 页面层,使用'.'区分父子页面
     - [ ] y-btn="Business" 前面写操作对象, 引号内写业务逻辑
- [ ] 整理优化CSS, css命名规则:  
     - [ ] UI组件: y-btn, y-btn-sm, y-btn-info, y-btn-block
     - [ ] 面对属性: y-m-y-0, y-m-y-10
     - [ ] 业务逻辑: v-login, v-login search, v-login btn
     - [ ] 工具类: active disable    
              success,warning,danger,info
- [ ] 添加浏览器兼容性解决方案:
     - [ ] [es5-shim]  --为低版本浏览器, 添加es5规则      
     - [ ] [html5shiv]  --创建新的HTML5标签,自动完成了设置 IE 浏览器和新语义元素的兼容性
     - [ ] [json2]  --IE6 IE7 IE8 不支持 JSON 对象
     - [ ] [Modernizr]  --监测浏览器特性, 根据不同是否支持某个属性添加 相对于的css,js 
     - [ ] [normalize]  --清除各浏览器自带的标签样式规则, 消除样式差异
     - [ ] 浏览器前缀  --现代浏览器,不同浏览器厂商, 使用构建工具自动添加 css浏览器前缀
     - [ ] Angular下的解决方案: 使用id选择器代替属性选择器 
- [ ] 添加demo页
- [ ] 介绍YHTML5-Seed

### demo 
- [ ] UI components
    - [x] banner --横幅丨陈孟圆
        - [x] index  --默认
        - [x] white  --白色
    - [x] collapse  --折叠丨张大漾
    - [x] footer
    - [x] list
        - [x] order  --订单列表
        - [x] more  --更多
    - [x] logo
    - [x] nav
    - [x] modal --孟圆
        - [x]  paymentVoucher  --缴费凭证
    - [x] select 
        - [x] performanceReport  --业绩报表头部选择丨大漾
    - [ ] countdown
    - [x] pickadate  --时间组件丨张大漾

### changeLog
- [ ] 2016.08.15 融合SPA单页应用模式, 以及普通开发模式 不再以按文件夹区分  
- [ ] 2016.08.22 merging some files, /components/head.html, /bower.json
- [ ] 2016.08.22 update README.md, /components/ie 
    

                  
       