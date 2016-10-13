/*
 * @require ../../server/author.js
 * @require ../../components/js/fn.js
 */
/************  login  ************/
$('[y-btn="sendCode"]').on('click', function () {
    sendCode('[y-btn="sendCode"]', 30)
});
$('#btnLogin').click(function () {
    $('[y-form="login"],[y-form="order"]').formValidation({
        framework: 'bootstrap',
        row: {
            valid: 'has-success',
            invalid: 'has-error'
        },
        fields: {
            phone: {
                validators: {
                    notEmpty: {
                        message: '请输入11位手机号码'
                    },
                    regexp: {
                        regexp: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
                        message: '请输入11位手机号码'
                    }
                }
            },
            pass: {
                validators: {
                    notEmpty: {
                        message: '请输入6-20位的密码'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9]\w{5,19}$/,
                        message: '请输入6-20位的密码'
                    }
                }
            },
            code: {
                validators: {
                    notEmpty: {
                        message: '请输入6位验证码'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9]\w{5}$/,
                        message: '请输入6位验证码'
                    }
                }
            },
            setPass: {
                validators: {
                    notEmpty: {
                        message: '请输入6-20位的密码'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9]\w{5,19}$/,
                        message: '请输入6-20位的密码'
                    }
                }
            },
            ID: {
                validators: {
                    notEmpty: {
                        message: '请输入身份证号'
                    },
                    regexp: {
                        regexp: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
                        message: '请输入身份证号'
                    }
                }
            },
            notEmpty: {
                validators: {
                    notEmpty: {
                        message: '输入不能为空'
                    }
                }
            },
            name: {
                validators: {
                    notEmpty: {
                        message: '请输入姓名'
                    }
                }
            },
            floor: {
                validators: {
                    notEmpty: {
                        message: '请输入楼号'
                    }
                }
            },
            housePrices: {
                validators: {
                    notEmpty: {
                        message: '请输入房屋总价'
                    },
                    regexp: {
                        regexp: /^[0-9]+(.[0-9]{1,4})?$/,
                        message: '请输入房屋总价'
                    },
                    between: {
                        min: 0,
                        max: 90,
                        message: '请输入合法数值'
                    },
                    lessThan: {
                        value: 18,
                        message: '请输入合法数值'
                    }
                }
            }
        }
    });
});
$("#proportion").on("change", function () {
    var that = $(this).val();
    if (that == 0) {
        $("#firstPay").attr("disabled", false);
        console.log(2)
    } else {
        $("#firstPay").attr("disabled", true);
        var pay = $("#housePrices").val() * that / 10;
    }
});
