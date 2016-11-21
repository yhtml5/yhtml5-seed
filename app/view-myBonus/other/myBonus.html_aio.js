"use strict";
/************  myBonus  ************/
var zjyData = {
    testNum: 1,
    userId: 1,
    identity_status: 0,
    myBonusMoney: '00.00',
    myBonusMoneyAudit: '0.00',
    myAccountNum: 0,
    bank_status: 1,
    bank_status_msg: "没有绑定",
    btnShow: true,
    notice: {
        loading: true,
        success: false,
        valid: false,
        text: ''
    },
    noticeTop: {
        status0: '',
        status1: '',
        status3: '',
        status4: ''
    },
    confirm: {
        reAuthenticating: false,
        authenticating: false,
        invalid: false,
        authentication: false,
        accountBind: false
    },
    items: [{
        withdraw_id: 0,
        money_source: '',
        cust_name: '',
        house_name: '',
        money: '',
        withdraw_account: '',
        withdraw_type: '',
        status: '',
        withdraw_status: '',
        withdraw_fail_reason: '',
        created_at: '',
        title: ''
    }],
    urlInfo: {
        brokerId: '',
        other: ''
    },
    isBtnWithdrawalsDisable: true,
    isListeEmpty: ''
};

Vue.component('actionsheet', vuxActionsheet);
Vue.component('cell', vuxCell);
Vue.component('confirm', vuxConfirm);
Vue.component('datetime', vuxDatetime);
Vue.component('divider', vuxDivider);
Vue.component('flexbox', vuxFlexbox);
Vue.component('flexbox-item', vuxFlexboxItem);
Vue.component('group', vuxGroup);
Vue.component('icon', vuxIcon);
Vue.component('loading', vuxLoading);
Vue.component('switch', vuxSwitch);
Vue.component('toast', vuxToast);
Vue.component('x-header', vuxXHeader);
Vue.component('x-input', vuxXInput);

var zjyVM = new Vue({
    el: '#myBonus',
    data: zjyData,
    methods: {
        getBrokerId: function () {
            zjyData.urlInfo.brokerId = phpBrokerId;
            console.log('urlInfo: ', zjyData.urlInfo.brokerId)
            return zjyData.urlInfo.brokerId
        },
        changeStatus: function (status) {
            // console.clear()
            if (status == 4) {
                zjyData.noticeTop.status4 = true;
                zjyData.identity_status = 4;
                console.log("身份证失效4");
                return;
            } else if (status == 1) {
                zjyData.noticeTop.status1 = true;
                zjyData.identity_status = 1;
                console.log("审核状态1");
                return;
            } else if (status == 2) {
                zjyData.identity_status = 2;
                console.log("展示状态2");
                return;
            } else if (status == 3) {
                zjyData.noticeTop.status3 = true;
                zjyData.identity_status = 3;
                console.log("审核不通过状态3");
                return;
            } else {
                zjyData.noticeTop.status0 = true;
                zjyData.identity_status = 0;
                console.log("未认证状态0");
                return;
            }
        },
        countUp: function () {
            var options = {
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
                prefix: '',
                suffix: ''
            };
            var demo = new CountUp("myBonusMoney", 0, zjyData.myBonusMoney, 2, 2.5, options);
            demo.start();
        },
        toWithdrawals: function () {
            if (zjyData.isBtnWithdrawalsDisable == true) {
                console.log('不能提现')
            } else if (zjyData.identity_status == 3) {
                zjyData.confirm.reAuthenticating = true
            } else if (zjyData.identity_status == 1) {
                zjyData.confirm.reAuthenticating = false;
                zjyData.confirm.authenticating = true
            } else if (zjyData.identity_status == 4) {
                zjyData.confirm.invalid = true
            } else if (zjyData.identity_status == 0) {
                zjyData.confirm.reAuthenticating = false;
                zjyData.confirm.authentication = true
            } else if (zjyData.myAccountNum == 0) {
                zjyData.confirm.reAuthenticating = false;
                zjyData.confirm.accountBind = true
            } else {
                window.location.href = '?r=brokerReward/Withdraw&broker_id=' + phpBrokerId;
            }
        },
        toMyAccount: function () {
            if (zjyData.myAccountNum == 0) {
                window.location.href = '?r=brokerReward/BindAccount&broker_id=' + phpBrokerId;
            } else {
                window.location.href = '?r=brokerReward/Bindlist&broker_id=' + phpBrokerId;
            }
        },
        toRecordDetails: function () {
            window.location.href = '?r=brokerReward/Record&broker_id=' + phpBrokerId;
        },
        toAuthentication: function () {
            window.location.href = '?r=brokerReward/Identity&broker_id=' + phpBrokerId;
            if (typeof(Zhujiayi) == "undefined") {
                console.log("changeCanBackValue");
            } else {
                Zhujiayi.changeCanBackValue()
            }
        },
        toBindAccount: function () {
            window.location.href = '?r=brokerReward/BindAccount&broker_id=' + phpBrokerId;
        },
        goBackApp: function () {
            if (typeof(Zhujiayi) == "undefined") {
                console.log("goBackApp");
                window.location.href = '?r=agent/brokerInfo&broker_id=' + phpBrokerId;
            } else {
                Zhujiayi.closeWebview()
            }
        },
    }
});

reqwest({
    url: '?r=brokerData/GetReward',
    method: 'get',
    type: 'json',
    crossOrigin: true,
    data: {broker_id: zjyVM.getBrokerId()},
    contentType: 'application/json',
    error: function (err) {
        zjyData.notice.text = err.msg;
        setTimeout(function () {
            zjyData.notice.loading = false;
            zjyData.notice.valid = true
        }, 500);
        console.log(err.results)
    },
    success: function (resp) {
        if (resp.code == 200) {
            setTimeout(function () {
                zjyData.notice.loading = false;
            }, 200);
            zjyData.identity_status = resp.results.identity_status;
            zjyData.myBonusMoneyAudit = resp.results.audit_money;
            zjyData.myAccountNum = resp.results.bind_account_num;
            zjyData.items = resp.results.detailAll;
            setTimeout(function () {
                zjyData.myBonusMoney = resp.results.money;
                zjyVM.countUp()
                if (zjyData.items == '') {
                    zjyData.isListeEmpty = true;
                } else {
                    zjyData.isListeEmpty = false;
                }
                if (zjyData.myBonusMoney == 0) {
                    zjyData.isBtnWithdrawalsDisable = true;
                } else {
                    zjyData.isBtnWithdrawalsDisable = false;
                }
            }, 200);
            zjyVM.changeStatus(zjyData.identity_status);
            console.log('服务器: ', resp.msg);
            console.log('订单数据: ', resp.results.detailAll);
        } else {
            zjyData.notice.text = resp.msg;
            zjyData.notice.loading = false;
            zjyData.notice.valid = true
        }
    }
});
