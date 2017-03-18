/*
 * @require app/server/author.js
 * @require app/components/js/allInOne.js
 */
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
        top: true,
        loading: true,
        success: false,
        valid: false,
        text: ''
    },
    confirm: {
        reAuthenticating: false,
        authenticating: false,
        invalid: false,
        authentication: false
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
        title: '',
    }],
    urlInfo: {
        brokerId: '',
        other: ''
    }
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

var yhtml5VM = new Vue({
    el: '#myBonus',
    data: zjyData,
    methods: {
        getBrokerId: function () {
            zjyData.urlInfo.brokerId = decodeURI(window.location.search).split("brokerId=")[1];
            console.log('urlInfo: ', zjyData.urlInfo.brokerId)
            return zjyData.urlInfo.brokerId
        },
        changeStatus: function (status) {
            // console.clear()
            if (status == 4) {
                zjyData.noteTop = false;
                console.log("身份证失效4");
                return;
            } else if (status == 1) {
                zjyData.notice.top = false;
                console.log("审核状态1");
                return;
            } else if (status == 2) {
                zjyData.notice.top = false;
                console.log("展示状态2");
                return;
            } else if (status == 3) {
                console.log("审核不通过状态3");
                return;
            } else {
                zjyData.notice.top = true;
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
            if (zjyData.identity_status == 3) {
                zjyData.confirm.reAuthenticating = true
            } else if (zjyData.identity_status == 1) {
                zjyData.confirm.reAuthenticating = false
                zjyData.confirm.authenticating = true
            } else if (zjyData.identity_status == 4) {
                zjyData.confirm.invalid = true
            } else if (zjyData.identity_status == 0) {
                zjyData.confirm.reAuthenticating = false
                zjyData.confirm.authentication = true
            } else {
                window.location.href = '//' + location.host + '/withdrawals.html?brokerId=' + zjyData.urlInfo.brokerId
            }
        },
        toMyAccount: function () {
            if (zjyData.myAccountNum == 0) {
                window.location.href = '//' + location.host + '/accountBind.html?brokerId=' + zjyData.urlInfo.brokerId
                // window.location.href = "bankCardDetail.html?accountNum="+ $list.accountNum + '&bankId=' + $list.bankId +'&bankName=' + $list.accountName + '&bankLogo=' + $list.accountLogo;
            } else {
                window.location.href = '//' + location.host + '/bankCardList.html?brokerId=' + zjyData.urlInfo.brokerId
            }
        },
        toRecordDetails: function () {
            window.location.href = '//' + location.host + '/record.html?brokerId=' + zjyData.urlInfo.brokerId
        },
        toAuthentication: function () {
            window.location.href = '//' + location.host + '/authentication.html?brokerId=' + zjyData.urlInfo.brokerId
            if (typeof(Zhujiayi) == "undefined") {
                alert("undefined");
            } else {
                Zhujiayi.changeCanBackValue()
            }
        },
        goBackApp: function () {
            if (typeof(Zhujiayi) == "undefined") {
                alert("undefined");
            } else {
                Zhujiayi.closeWebview()
            }
        },
    }
});

reqwest({
    url: 'http://test.louzhanggui.com/general_agentTest.php?r=brokerData/GetReward',
    method: 'get',
    type: 'json',
    crossOrigin: true,
    data: {broker_id: yhtml5VM.getBrokerId()},
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
            }, 1000);
            zjyData.myBonusMoney = resp.results.money
            zjyData.identity_status = resp.results.identity_status
            zjyData.myBonusMoneyAudit = resp.results.audit_money
            zjyData.myAccountNum = resp.results.bind_account_num
            zjyData.items = resp.results.detailAll
            yhtml5VM.countUp()
            yhtml5VM.changeStatus(zjyData.identity_status);
            console.log('服务器: ', resp.msg)
            console.log('订单数据: ', resp.results.detailAll)
            console.log('金额来源: ', resp.results.detailAll[1].money_source)
        } else if (resp.code == 202) {
            zjyData.notice.text = resp.msg;
            setTimeout(function () {
                zjyData.notice.loading = false;
                zjyData.notice.valid = true
            }, 500);
        } else {
            zjyData.notice.text = resp.msg;
            setTimeout(function () {
                zjyData.notice.loading = false;
                zjyData.notice.valid = true
            }, 500);
        }
    }
});