/*
 * @require ../../server/author.js
 * @require allInOne.js
 *
 */
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
    broker_id: '1851',
    alipay_account: '',
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
    url: 'http://test.louzhanggui.com/general_agentTest.php?r=brokerData/BankList',
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
        zjyData.list = resp.results.list
        console.log("请求银行数据: ", resp.msg, resp.results.list)
        console.log("银行数据: ", zjyData.list)
    }
})

var yhtml5VM = new Vue({
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
            } else {
                zjyData.notice.loading = true;
                reqwest({
                    url: 'http://test.louzhanggui.com/general_agentTest.php?r=brokerData/BindAdd',
                    method: 'get',
                    type: 'json',
                    data: {
                        broker_id: 1851,
                        alipay_account: zjyData.alipay_account
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
                        setTimeout(function () {
                            zjyData.notice.loading = false;
                            zjyData.notice.success = true;
                        }, 300);
                        setTimeout(function () {
                            window.history.back()
                        }, 1000);
                        console.log(resp.msg)
                    }
                });
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
            } else if (zjyData.bank_card_no == '') {
                zjyData.notice.valid = true;
                zjyData.notice.text = '银行卡号不能为空';
            } else if (zjyData.true_name == '') {
                zjyData.notice.valid = true;
                zjyData.notice.text = '开卡人不能为空';
            } else {
                zjyData.notice.loading = true;
                reqwest({
                    url: 'http://test.louzhanggui.com/general_agentTest.php?r=brokerData/BindAdd',
                    method: 'get',
                    type: 'json',
                    data: {
                        broker_id: 1851,
                        bank_id: zjyData.bank_id,
                        bank_card_no: zjyData.bank_card_no,
                        true_name: zjyData.true_name
                    },
                    contentType: 'application/json',
                    error: function (err) {
                        zjyData.notice.text = '服务器错误,请重试';
                        setTimeout(function () {
                            zjyData.notice.loading = false;
                            zjyData.notice.valid = true
                            zjyData.isButtonDisabled = false
                        }, 300);
                        console.log(err.msg)
                    },
                    success: function (resp) {
                        setTimeout(function () {
                            zjyData.notice.loading = false;
                            zjyData.notice.success = true;
                            zjyData.isButtonDisabled = false
                        }, 300);
                        setTimeout(function () {
                            window.history.back()
                        }, 1000);
                        console.log(resp.msg)
                    }
                })
            }
        }
    }
});




