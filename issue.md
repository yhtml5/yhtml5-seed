## Questions

#### 这里记录前端开发过程中遇到的问题与解析

### FIS3 影响资源加载和打包的因素:
   * 注 意 点: 忽略的资源,只有通过依赖关系引入后才会打包,
              后面规则会覆盖前面
   * 关 键 词: @require  packTo, packOrder
   * 依赖关系: 引入依赖资源,如果资源被打包,则引入打包后的资源
              用依赖关系判断加载与资源打包顺序(默认为字母排序)
   * 加载顺序: @require > packOder > letter
              @require的排序也会影响
              同级打包区分顺序用 packOrder
              父级使用 @require
              
### bower_components 处理方法
   * 1 忽略该目录下所有资源
   * 2 使用 @require引入资源
   * 3 使用packTo打包资源 
   * 4 使用packOrder调整打包顺序
   
### 命中资源
   * fis3 对根目录下文件进行配置,打包合成的新文件也是
   
              
### 常见问题
   * there have some problems if don't ignore bower_components 
      * fis3 inspect : To many files that unuseful showed
      * release false while cause : [ERROR] unreleasable file [/a] in [/b]
      * release both a and b ;只引入bootstrap.css,需要同时释放map
      * 解决方案使用 project.files 设定文件编译范围, awesome!
   * css定位问题,基于根目录
      * 暂时使用url方式
      * 使用域名方式
   * 浏览器自动刷新
      * install liveload by chrome
      https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=zh-CN
   * 选择性打包 *.min.js 文件
   
   
   
   
      
      
   
     
   