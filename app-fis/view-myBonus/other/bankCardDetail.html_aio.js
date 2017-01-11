"use strict";
/************  bankCardDetail  ************/
Vue.component('group', vuxGroup);
Vue.component('x-header', vuxXHeader);
Vue.component('x-button', vuxXButton);
Vue.component('loading', vuxLoading);
Vue.component('toast', vuxToast);

var zjyData = {
    accountLogo: '',
    accountName: '',
    accountNum: '',
    initialNum: '',
    accountId: '',
    trueName: '',
    initTrueName: '',
    accoutOpenBank: '',
    initAccoutOpenBank: '',
    cellAccoutOpenBank: false,
    bankId: '',
    notice: {
        loading: false,
        success: false,
        successText: '',
        valid: false,
        text: ''
    },
    urlInfo: {
        brokerId: '',
        other: ''
    },
    accountList: {},
    inputNum: '',
    inputName: '',
    inputOpenBank: ''
};

var zjyVM = new Vue({
    el: '#bankCardDetail',
    data: zjyData,
    methods: {
        getBrokerId: function () {
            return phpBrokerId
        },
        getStatus: function () {
            zjyVM.getBrokerId();
            if (phpType == 1) {
                zjyData.cellAccoutOpenBank = false
                zjyData.accountName = '支付宝帐户';
                zjyData.accountLogo = '/css/new_JJT/version1.0/myBonusStatic/img/zhifubao.png';
                zjyData.accountNum = phpAlipayAccountAlia;
                zjyData.trueName = phpTrueName;
                zjyData.inputNum = '账号';
                zjyData.inputName = '姓名';
            } else {
                zjyData.cellAccoutOpenBank = true
                zjyData.accountName = phpBankName;
                zjyData.accountLogo = phpBankLogo;
                zjyData.accountNum = phpBankCardNoAlia;
                zjyData.trueName = phpTrueName;
                zjyData.accoutOpenBank = phpOpenAccountBank;
                zjyData.inputNum = '卡号';
                zjyData.inputName = '开卡人';
                zjyData.inputOpenBank = '开户行';
            }
            zjyData.initialNum = zjyData.accountNum;
            zjyData.initTrueName = zjyData.trueName;
            zjyData.initAccoutOpenBank = zjyData.accoutOpenBank;
        },
        cardDelete: function () {
            zjyData.notice.loading = true;
            reqwest({
                url: '?r=brokerData/BindDel',
                method: 'get',
                type: 'json',
                contentType: 'application/json',
                data: {
                    broker_id: zjyVM.getBrokerId(),
                    bind_id: phpBindId
                },
                error: function (err) {
                    zjyData.notice.loading = false;
                    zjyData.notice.valid = true;
                    zjyData.notice.text = err.msg;
                    console.log(err.msg)
                },
                success: function (resp) {
                    zjyData.notice.loading = false;
                    zjyData.notice.success = true;
                    zjyData.notice.successText = '删除成功';
                    setTimeout(function () {
                        window.location.href = '?r=brokerReward/Bindlist&broker_id=' + phpBrokerId;
                    }, 1000);
                    console.log(resp);
                }
            });
        },
        cardChange: function () {
            if (zjyData.accountNum == zjyData.initialNum && zjyData.trueName == zjyData.initTrueName && zjyData.accoutOpenBank == zjyData.initAccoutOpenBank) {
                window.location.href = '?r=brokerReward/Bindlist&broker_id=' + phpBrokerId;
            } else if (zjyData.accoutOpenBank == '') {
                zjyData.notice.valid = true;
                zjyData.notice.text = '开户行不能为空';
            } else if (zjyData.accountNum == '') {
                zjyData.notice.valid = true;
                zjyData.notice.text = '卡号不能为空';
            } else if (zjyData.trueName == '') {
                zjyData.notice.valid = true;
                zjyData.notice.text = '开卡人不能为空';
            } else if (!(/^(\d{14}|\d{16}|\d{19})$/.test(zjyData.accountNum) || /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(zjyData.accountNum) || /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(zjyData.accountNum))) {
                zjyData.notice.valid = true;
                zjyData.notice.text = '请输入正确的账号';
            } else {
                var a = '';
                var b = '';
                if (phpType == 1) {
                    a = zjyData.accountNum;
                } else {
                    b = zjyData.accountNum;
                }
                zjyData.notice.loading = true;
                console.log('requst')
                reqwest({
                    // url: '?r=brokerData/BindEdit',
                    url: '?r=brokerData/BindEdit',
                    method: 'get',
                    type: 'json',
                    data: {
                        broker_id: phpBrokerId,
                        bind_id: phpBindId,
                        alipay_account: a,
                        bank_card_no: b,
                        true_name: zjyData.trueName,
                        bank_id: phpBankId,
                        open_account_bank: zjyData.accoutOpenBank
                    },
                    contentType: 'application/json',
                    error: function (err) {
                        zjyData.loading = false;
                        zjyData.notice.success = true;
                        zjyData.notice.text = err.msg;
                        console.log(err.content)
                    },
                    success: function (resp) {
                        console.log(resp);
                        zjyData.notice.loading = false;
                        if (resp.code == 200) {
                            zjyData.notice.successText = '保存成功';
                            zjyData.notice.success = true;
                            setTimeout(function () {
                                window.location.href = '?r=brokerReward/Bindlist&broker_id=' + phpBrokerId;
                            }, 1000);
                        } else {
                            zjyData.notice.valid = true;
                            zjyData.notice.text = resp.msg;
                        }
                    }
                })
            }
        }
    }
});
zjyVM.getStatus();

