"use strict";
/*
 * @require server/author.js
 * @require components/js/allInOne.js
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
        withdrawals: false,
        signature: false
    },
    urlInfo: {
        brokerId: '',
        other: ''
    },
    withdrawalAmount: 0,
    availableAmount: 0,
    accountList: false,
    accountValue: '请选择账户',
    arrAccounts: [{
        accountName: '',
        id: 0
    }],
    arrAccountsIndex: 0,
    realistic_money: 0,
    tax_money: 0,
    has_sign_tax_agreement: 0,
    has_personal_tax: 0,
    code:'',
};

zjyData.availableAmount = phpAvailableAmount;

var zjyVM = new Vue({
    el: '#withdrawals',
    data: zjyData,
    methods: {
        getBrokerId: function () {
            return phpBrokerId
        },
        initStatus: function () {
            zjyVM.getAccountList();
            console.log('initStatusArrAccountsIndex: ', zjyData.arrAccounts[zjyData.arrAccountsIndex].id);
            zjyVM.getInitData();
        },
        getInitData: function () {
        },
        getWithdrawalAmount: function () {
            zjyData.notice.loading = true;
            console.log(zjyData.arrAccounts[zjyData.arrAccountsIndex].id);
            reqwest({
                url: '?r=brokerData/RewardAdd',
                method: 'get',
                type: 'json',
                data: {
                    broker_id: zjyVM.getBrokerId(),
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
                            zjyData.notice.sucess = true
                        }, 300);
                        setTimeout(function () {
                            window.location.href = '?r=brokerReward/myBonus&broker_id=' + phpBrokerId;
                        }, 800);
                        zjyData.availableAmount = resp.results.money
                    } else {
                        zjyData.notice.text = resp.msg;
                        setTimeout(function () {
                            zjyData.notice.loading = false;
                            zjyData.notice.valid = true
                        }, 300);
                    }
                }
            });
        },
        getAccountList: function () {
            reqwest({
                url: '?r=brokerData/BindList',
                method: 'get',
                type: 'json',
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
                                    accountLogo: '/css/new_JJT/version1.0/myBonusStatic/img/zhifubao.png',
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
                        zjyData.accountValue = zjyData.arrAccounts[0].accountName + zjyData.arrAccounts[0].accountNum;
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
        getRewardAdd: function () {

        },
        openAccountList: function () {
            zjyData.accountList = true;
            // zjyData.notice.loading = true;
            // zjyData.arrAccounts = [];
        },
        selectAccountValue: function (index) {
            zjyData.accountList = false;
            zjyData.arrAccountsIndex = index;
            console.log('zjyData.arrAccountsIndex: ', zjyData.arrAccountsIndex);
            zjyData.accountValue = zjyData.arrAccounts[index].accountName + zjyData.arrAccounts[index].accountNum;
        },
        returnWithdrawals: function () {
            zjyData.accountList = false
        },
        toSignature: function () {
            window.location.href = '?r=brokerReward/agreement&broker_id=' + zjyVM.getBrokerId();
        },
        toWithdrawals: function () {
            zjyVM.getWithdrawalAmount()
        },
        saveWithdrawalAmount: function () {
            // zjyVM.getRewardAdd()
            if (zjyData.withdrawalAmount > zjyData.availableAmount) {
                zjyData.notice.text = '提现金额大于可用金额';
                zjyData.notice.valid = true
            } else if (zjyData.withdrawalAmount == 0) {
                zjyData.notice.text = '请输入提现金额';
                zjyData.notice.valid = true
            }else if(zjyData.accountValue == '请选择账户'){
                zjyData.notice.text = '请选择账户';
                zjyData.notice.valid = true
            } else {
                zjyData.notice.loading = true;
                reqwest({
                    url: '?r=brokerData/RealisticMoney',
                    method: 'get',
                    type: 'json',
                    data: {
                        broker_id: zjyVM.getBrokerId(),
                        withdraw_money: zjyData.withdrawalAmount
                    },
                    contentType: 'application/json',
                    error: function (err) {
                        if (typeof(err.code) == "undefined") {
                            zjyData.notice.text = '服务器错误';
                            console.log(xmlhttp.readyState)
                        } else {
                            zjyData.notice.text = err.msg;
                            console.log(err)
                        }
                        setTimeout(function () {
                            zjyData.notice.loading = false;
                            zjyData.notice.valid = true
                        }, 500);
                    },
                    success: function (resp) {
                        if (resp.code == 200) {
                            zjyData.notice.loading = false;
                            zjyData.realistic_money = resp.results.realistic_money;
                            zjyData.tax_money = resp.results.tax_money;
                            setTimeout(function () {
                                zjyData.confirm.withdrawals = true
                            }, 300);
                        } else if(resp.code == 219){
                            //要去签协议
                            zjyData.notice.loading = false;
                            setTimeout(function () {
                                zjyData.confirm.signature = true
                            }, 300);
                        }else{
                            zjyData.notice.text = resp.msg;
                            setTimeout(function () {
                                zjyData.notice.loading = false;
                                zjyData.notice.valid = true
                            }, 300);
                        }
                        console.log(resp)
                    }
                })
            }
        }
    }
});
zjyVM.initStatus();
