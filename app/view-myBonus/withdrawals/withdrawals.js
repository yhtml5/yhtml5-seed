/*
 * @require ../../server/author.js
 * @require allInOne.js
 *
 */
/************  withdrawals  ************/
Vue.component('cell', vuxCell);
Vue.component('confirm', vuxConfirm);
Vue.component('group', vuxGroup);
Vue.component('icon', vuxIcon);
Vue.component('loading', vuxLoading);
Vue.component('toast', vuxToast);
Vue.component('x-button', vuxXButton);
Vue.component('x-header', vuxXHeader);

var zjyData = {
    identity_status: 0,
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
    urlInfo: {
        brokerId: '',
        other: ''
    },
    withdrawalAmount: '',
    availableAmount: '00.00',
    accountList: false,
    accountValue: '请选择账户',
    arrAccounts: [{
        accountName: '',
        id: 0
    }],
    arrAccountsIndex: 0,
    btnSave:''
};

var yhtml5VM = new Vue({
    el: '#withdrawals',
    data: zjyData,
    methods: {
        getBrokerId: function () {
            zjyData.urlInfo.brokerId = decodeURI(window.location.search).split("brokerId=")[1];
            console.log('urlInfo: ', zjyData.urlInfo.brokerId)
            return zjyData.urlInfo.brokerId
        },
        initStatus: function () {
            yhtml5VM.getAccountList()
            console.log('initStatusArrAccountsIndex: ', zjyData.arrAccounts[zjyData.arrAccountsIndex].id)
            yhtml5VM.getInitData()
        },
        getInitData: function () {

        },
        getWithdrawalAmount: function () {
            console.log(zjyData.arrAccounts[zjyData.arrAccountsIndex].id)
            reqwest({
                url: 'http://test.louzhanggui.com/general_agentTest.php?r=brokerData/RewardAdd',
                method: 'get',
                type: 'json',
                data: {
                    broker_id: yhtml5VM.getBrokerId(),
                    bind_id: zjyData.arrAccounts[zjyData.arrAccountsIndex].id,
                    withdraw_money: zjyData.withdrawalAmount
                },
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
                        }, 300);
                        zjyData.availableAmount = resp.results.money
                    } else {
                        zjyData.notice.text = resp.msg;
                        setTimeout(function () {
                            zjyData.notice.loading = false;
                            zjyData.notice.valid = true
                        }, 500);
                    }
                }
            });
        },
        getAccountList: function () {
            reqwest({
                url: 'http://test.louzhanggui.com/general_agentTest.php?r=brokerData/BindList',
                method: 'get',
                type: 'json',
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
                    zjyData.arrAccounts = []
                    if (resp.code == 200) {
                        setTimeout(function () {
                            zjyData.notice.loading = false;
                        }, 300);
                        for (var i in resp.results.list) {
                            if (resp.results.list[i].type == 1) {
                                zjyData.arrAccounts.push({
                                    accountType: '支付宝',
                                    accountName: '支付宝账户',
                                    accountNum: resp.results.list[i].alipay_account_alia,
                                    accountLogo: 'myBonusStatic/img/zhifubao.png',
                                    id: resp.results.list[i].id,
                                    bankId: resp.results.list[i].bank_id
                                })
                            } else {
                                zjyData.arrAccounts.push({
                                    accountType: '储蓄卡',
                                    accountName: resp.results.list[i].bank_name,
                                    accountNum: resp.results.list[i].bank_card_no_alia,
                                    accountLogo: resp.results.list[i].bank_logo,
                                    id: resp.results.list[i].id,
                                    bankId: resp.results.list[i].bank_id
                                })
                            }
                        }
                        zjyData.accountValue = zjyData.arrAccounts[0].accountName
                    } else {
                        zjyData.notice.text = resp.msg;
                        setTimeout(function () {
                            zjyData.notice.loading = false;
                            zjyData.notice.valid = true
                        }, 500);
                    }
                }
            });
        },
        openAccountList: function () {
            zjyData.accountList = true
            // zjyData.notice.loading = true;
            // zjyData.arrAccounts = [];
        },
        selectAccountValue: function (index) {
            zjyData.accountList = false
            zjyData.arrAccountsIndex = index
            console.log('zjyData.arrAccountsIndex: ', zjyData.arrAccountsIndex)
            zjyData.accountValue = zjyData.arrAccounts[index].accountName
        },
        returnWithdrawals: function () {
            zjyData.accountList = false
        },
        saveWithdrawalAmount: function () {
            yhtml5VM.getWithdrawalAmount()
            console.log('zjyData.arrAccountsIndex: ', zjyData.arrAccountsIndex)
        },
        changeNum:function(){
            console.log("123")
        }
    }
});

yhtml5VM.initStatus();

var withdrawalInput = document.getElementsByClassName("y-withdrawal-input")[0];
withdrawalInput.oninput = function(){
    if(this.value > 0){
        zjyData.btnSave = true;
    }else{
        zjyData.btnSave = false;
    }
};