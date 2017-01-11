"use strict";
/************  accountBind  ************/
Vue.component('cell', vuxCell);
Vue.component('group', vuxGroup);
Vue.component('popup', vuxPopup);
Vue.component('checker', vuxChecker);
Vue.component('checker-item', vuxCheckerItem);
Vue.component('x-header', vuxXHeader);
Vue.component('x-input', vuxXInput);
Vue.component('button-tab', vuxButtonTab);
Vue.component('button-tab-item', vuxButtonTabItem);
Vue.component('loading', vuxLoading);
Vue.component('selector', vuxSelector);
Vue.component('swiper', vuxSwiper);
Vue.component('swiper-item', vuxSwiperItem);
Vue.component('toast', vuxToast);
Vue.component('x-button', vuxXButton);
var zjyData = {
    broker_id: phpBrokerId,
    alipay_account: '',
    alipay_name: '',
    bank_card_no: '',
    true_name: '',
    bank_id: '',
    accountChoose: {
        choose: '支付宝',
        list: ['支付宝', '银行卡']
    },
    list: [{
        bankIcon: 'static/img/zhaoshang.png',
        bank_name: '招商银行'
    }],
    open_bank_name:'',
    showPop: false,
    isButtonDisabled: false,
    notice: {
        loading: false,
        success: false,
        valid: '',
        text: ''
    }
};

reqwest({
    url: '?r=brokerData/BankList',
    method: 'get',
    type: 'json',
    contentType: 'application/json',
    error: function (err) {
        zjyData.notice.text = '服务器错误,请重试';
        setTimeout(function () {
            zjyData.notice.loading = false;
            zjyData.notice.valid = true
        }, 300);
        console.log(err.msg)
    },
    success: function (resp) {
        // setTimeout(function () {
        //     zjyData.notice.loading = false;
        //     zjyData.notice.success = true;
        // }, 300);
        zjyData.list = resp.results.list;
        console.log("请求银行数据: ", resp.msg, resp.results.list)
        console.log("银行数据: ", zjyData.list)
    }
});

var zjyVM = new Vue({
    el: '#accountBind',
    data: zjyData,
    methods: {
        showPopup: function () {
            zjyData.showPop = true;
        },
        hidePopup: function () {
            zjyData.showPop = false;
        },
        getBankList: function () {
        },
        savaAliAccount: function () {
            if (zjyData.alipay_account == '') {
                zjyData.notice.valid = true;
                zjyData.notice.text = '帐号不能为空';
            } else if (/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(zjyData.alipay_account) || /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(zjyData.alipay_account)) {
                if (/^[\u4e00-\u9fa5]{1,5}$/.test(zjyData.alipay_name)) {
                    zjyData.notice.loading = true;
                    reqwest({
                        url: '?r=brokerData/BindAdd',
                        method: 'get',
                        type: 'json',
                        data: {
                            broker_id: zjyData.broker_id,
                            alipay_account: zjyData.alipay_account,
                            true_name: zjyData.alipay_name
                        },
                        contentType: 'application/json',
                        error: function (err) {
                            zjyData.notice.text = '服务器错误,请重试';
                            setTimeout(function () {
                                zjyData.notice.loading = false;
                                zjyData.notice.valid = true
                            }, 300);
                            console.log(err.msg)
                        },
                        success: function (resp) {
                            if(resp.code == 200){
                                setTimeout(function () {
                                    zjyData.notice.loading = false;
                                    zjyData.notice.success = true;
                                }, 300);
                                setTimeout(function () {
                                 window.location.href = '?r=brokerReward/Bindlist&broker_id=' + phpBrokerId;
                                 }, 1000);
                            }else{
                                zjyData.notice.loading = false;
                                zjyData.notice.valid = true;
                                zjyData.notice.text = resp.msg;
                            }
                        }
                    });
                } else {
                    zjyData.notice.valid = true;
                    zjyData.notice.text = '请输入您的姓名';
                }
            }
            else {
                zjyData.notice.valid = true;
                zjyData.notice.text = '请输入正确的账号';
            }
        },
        savaBankAccount: function () {
            zjyData.isButtonDisabled = true;
            setTimeout(function () {
                zjyData.isButtonDisabled = false
            }, 1000);
            if (zjyData.bank_id == '' || zjyData.bank_id == 0) {
                zjyData.notice.valid = true;
                zjyData.notice.text = '请选择银行';
            } else{
                if(zjyData.open_bank_name == ''){
                    zjyData.notice.valid = true;
                    zjyData.notice.text = '请输入开户行';
                }else if(/^[\u4e00-\u9fa5]{1,20}$/.test(zjyData.open_bank_name)){
                    if (zjyData.bank_card_no == '') {
                        zjyData.notice.valid = true;
                        zjyData.notice.text = '银行卡号不能为空';
                    }else if (/^\d{16}|\d{19}$/.test(zjyData.bank_card_no)) {
                        if (zjyData.true_name == '') {
                            zjyData.notice.valid = true;
                            zjyData.notice.text = '开卡人不能为空';
                        } else if (/^[\u4e00-\u9fa5]{1,5}$/.test(zjyData.true_name)) {
                            zjyData.notice.loading = true;
                            reqwest({
                                url: '?r=brokerData/BindAdd',
                                method: 'get',
                                type: 'json',
                                data: {
                                    broker_id: zjyData.broker_id,
                                    bank_id: zjyData.bank_id,
                                    bank_card_no: zjyData.bank_card_no,
                                    true_name: zjyData.true_name,
                                    open_account_bank: zjyData.open_bank_name
                                },
                                contentType: 'application/json',
                                error: function (err) {
                                    zjyData.notice.text = '服务器错误,请重试';
                                    setTimeout(function () {
                                        zjyData.notice.loading = false;
                                        zjyData.notice.valid = true
                                    }, 300);
                                },
                                success: function (resp) {
                                    if (resp.code == 200) {
                                        setTimeout(function () {
                                            zjyData.notice.loading = false;
                                            zjyData.notice.success = true;
                                        }, 300);
                                        setTimeout(function () {
                                            window.location.href = '?r=brokerReward/Bindlist&broker_id=' + phpBrokerId;
                                        }, 1000);
                                    } else {
                                        zjyData.notice.loading = false;
                                        zjyData.notice.valid = true;
                                        zjyData.notice.text = resp.msg;
                                    }
                                }
                            });
                        } else {
                            zjyData.notice.valid = true;
                            zjyData.notice.text = '请输入您的姓名';
                        }
                    } else{
                        zjyData.notice.valid = true;
                        zjyData.notice.text = '请输入正确的银行卡号';
                    }
                }else{
                    zjyData.notice.valid = true;
                    zjyData.notice.text = '请输入正确的开户行信息';
                }
            }
        }
    }
});





