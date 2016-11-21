"use strict";
/************  bankCardList  ************/
Vue.component('x-header', vuxXHeader);
Vue.component('loading', vuxLoading);
var zjyData = {
    empty: '',
    accountList: [],
    loading: true,
    Id: '',
    bankId: '',
    urlInfo: {
        brokerId: '',
        other: ''
    }
};

var zjyVM = new Vue({
    el: '#bankCardList',
    data: zjyData,
    methods: {
        getBrokerId: function () {
            return phpBrokerId
        },
        goBackApp: function(){
            window.location.href =  '?r=brokerReward/MyBonus&broker_id=' + phpBrokerId;
        },
        getStatus: function () {
            reqwest({
                url: '?r=brokerData/BindList',
                method: 'get',
                type: 'json',
                data: {
                    broker_id: zjyVM.getBrokerId(),
                },
                contentType: 'application/json',
                error: function (err) {

                    setTimeout(function () {
                        // zjyData.notice.loading = false;
                        // zjyData.notice.valid = true
                    }, 500);
                    console.log(err.content)
                },
                success: function (resp) {
                    zjyData.loading = false;
                    if (resp.results.list == '') {
                        zjyData.empty = true;
                        document.body.style.background = '#f5f5f5';
                    } else {
                        zjyData.empty = false;
                        document.body.style.background = '#539fbf';
                    }
                    for (var i in resp.results.list) {
                        if (resp.results.list[i].type == 1) {
                            zjyData.accountList.push({
                                accountType: '支付宝',
                                accountName: '支付宝账户',
                                accountNum: resp.results.list[i].alipay_account_alia,
                                accountLogo: '/css/new_JJT/version1.0/myBonusStatic/img/zhifubao.png',
                                Id: resp.results.list[i].id,
                                bankId: resp.results.list[i].bank_id
                            })
                        } else {
                            zjyData.accountList.push({
                                accountType: '储蓄卡',
                                accountName: resp.results.list[i].bank_name,
                                accountNum: resp.results.list[i].bank_card_no_alia,
                                accountLogo: resp.results.list[i].bank_logo,
                                Id: resp.results.list[i].id,
                                bankId: resp.results.list[i].bank_id
                            })
                        }
                    }

                }
            });
        },
        toCardDetail: function ($index) {
            window.location.href = '?r=brokerReward/BindCardDetail&broker_id=' + phpBrokerId + '&bind_id=' + zjyData.accountList[$index].Id;
        }
    }
});

zjyVM.getStatus();


