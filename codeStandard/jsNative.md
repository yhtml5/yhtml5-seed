# Javasctipt和Native交互

[IOS文档][documentIOS]

## JS调用Native
1. 获取app版本号
	* 描述：获取当前App的版本号
	* 返回值：String,如：2.1.0
	* 调用方式：
	```
	Zhujiayi.getVersion();
	```
2. 获取当前app登录userId
3. 调用拍照，拍好后app上传，把URL回调给JS；或者把图片的Base64值回调给客户端
4. 调用日期时间选择器，选好后把日期时间回调给JS
5. 调用弹框，如SVProgressHUD
6. 跳转到某个指定页面，或者用UIWebView打开某个Web页面
7. 返回或者关闭当前页面
	* 描述：返回上一个页面，如果没有上一个页面则关闭当前的WebView
	* 返回值：空
	* 调用方式：
	```
	Zhujiayi.closeWebview();
	```
8. 设置WebViewController的title
9. 上传图片
	* 描述：使用 App 上传图片，生成URL回调指定的函数
	* 参数：int index(图片index)，上传成功后回调会带回去
	* 返回值：空
	* 调用方式：
	```
	Zhujiayi.chooseImage(index);
	```
	* 回调函数：
		
		```
	zjyVM.appUploadImageResult(data);
	```
		* data格式JSON对象:{code : 200, msg : '', url : '...', index : 1}，
		* code：成功返回200，失败-100
		* url：图片上传成功后的地址，上传失败返回空字符串
		* msg：错误信息，成功时返回空字符串
		* index：js调用appChooseImage传入的索引，便于定位

## Native和JS交互
1. 调用js方法，比如alert(123);

## Demo
[jingjitong.html](js_native_interaction_demo/jingjitong.html)
[jingjitong2.html](js_native_interaction_demo/jingjitong2.html)
[documentIOS]:http://192.168.1.235:8777/iOSTeam/Documents

