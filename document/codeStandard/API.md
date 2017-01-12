# API 规范

### 请求头

#### 格式

```
Content-Type: application/json
```
	
不推荐使用表单格式：application/x-www-form-urlencoded，无法提交有层级的参数
	
####  命名，驼峰格式，如houseList，不推荐house_list

### 返回

返回头格式，请返回JSON格式，不要返回 text/html，text/css 等不相关返回头

```
Content-Type: application/json
```

#### 数据格式

* code 请求结果码
    * 成功:2xx
    * 客户端错误：4XX
    * 服务端错误：5XX
* message 错误描述
    * 请给出详细错误信息，比如缺少参数是缺少哪个参数。
* data 返回结果，所有结果放在data里便于统一处理，data里再按照层级来放
* 为减小请求大小，不用的信息不要返回，不要直接 select * from ...，请指定要获取的字段	
```
    code : 0,
    msg : 成功,
    data : {
        houseAreaList : [],
        houseTraitList : [],
        areaPriceList : [],
        houseList : []
    }
```

## 参数签名
0. 概述

	API需要通过签名来访问，签名的过程是将请求参数串以及APP密钥根据一定签名算法生成的签名值，作为新的请求参数从而提高访问过程中的防篡改性。签名值的生成详见下面的描述。
0. URL签名生成规则

	所有API的有效访问URL包括以下三个部分： 
	1. 资源访问路径，如/v1/deal/find_deals; 
	2. 请求参数：即API对应所需的参数名和参数值param=value，多个请求参数间用&连接，如deal_id=1-85462&appkey=00000； 
	3. 签名串，由签名算法生成
 
0. 签名算法如下： 
	1. 对除appkey以外的所有请求参数进行字典升序排列； 
	2. 将以上排序后的参数表进行字符串连接，如key1value1key2value2key3value3...keyNvalueN； 
	3. 将app key作为前缀，将app secret作为后缀，对该字符串进行SHA-1计算，并转换成16进制编码； 
	4. 转换为全大写形式后即获得签名串 

签名串获得后，将其作为sign参数附加到对应的URL中，即可正常访问API。 参考[大众点评API签名](http://developer.dianping.com/app/documentation/signature)

