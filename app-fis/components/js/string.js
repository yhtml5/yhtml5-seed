// 有这样一个URL 输出函数QuerySearch()，其有一个参数name，输出其对应的value。解析：主要就是进行两次分割。
'use strict';
function querySearch(url, name) {
    var arr = url.split('?')[1].split('&');
    console.log(arr)
    var str = name + '=', index, start;
    for (var i = 0; i < arr.length;) {
        index = arr[i].indexOf(str);
        if (index < 0) {
            i++;
        } else {
            start = index + str.length;
            return arr[i].slice(start);
        }
    }
    return "";
}

var result = querySearch("http://mail.163.com/?a=1&b=2&c=3&d=xxx&e")
console.log(result)