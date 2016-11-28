/*
 *  Enter JavaScript-style regular expression to display
 *  https://regexper.com/
 *  Write and test regular expression
 *  http://www.regexr.com/
 */

var yhtml5Validator = {
    isBankCardNum: function () {
        var result = /^(\d{14}|\d{16}|\d{19})$/.test(str);
        return result
    },
    isChinaName: function () {
        var result = /^[\u4e00-\u9fa5]{1,10}$/.test(str);
        return result
    },
    isChinaPhoneNum: function () {
        var result = /^(13[0-9]|14[5|7]|15[0-9]|18[0-9])\d{8}$/.test(str);
        return result
    },
    isEmail: function () {
        var result = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(str);
        return result
    },
    isIdCard: function (str) {
        var result = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(str);
        return result
    },
    isNum: function () {
        var result = /^[0-9]*$/.test(str);
        return result
    },
    isNumSix: function () {
        var result = /^[a-zA-Z0-9]\w{5}$/.test(str);
        return result
    },
    isNumSixToTwenty: function () {
        var result = /^[a-zA-Z0-9]\w{5,19}$/.test(str);
        return result
    }
}