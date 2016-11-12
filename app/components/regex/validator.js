var yhtml5Validator = {
    isBankCardNum: function () {
        var result = /^(\d{14}|\d{16}|\d{19})$/.test(str);
        return result
    },
    isChinaName: function () {
        var result = /^[\u4e00-\u9fa5]{1,10}$/.test(str);
        return result
    },
    isEmail: function () {
        var result = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(str);
        return result
    },
    isIdCard: function (str) {
        var result = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(str)
        return result
    },
    isPhoneNum: function () {
        var result = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(str);
        return result
    }
}