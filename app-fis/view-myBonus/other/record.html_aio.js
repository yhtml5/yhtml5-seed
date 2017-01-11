"use strict";
/************  record  ************/
Vue.component('x-header', vuxXHeader);
Vue.component('cell', vuxCell);
Vue.component('group', vuxGroup);
Vue.component('x-button', vuxXButton);
Vue.component('icon', vuxIcon);
Vue.component('switch ', vuxSwitch);
Vue.component('actionsheet ', vuxActionsheet);
Vue.component('toast', vuxToast);
Vue.component('loading', vuxLoading);

var zjyData = {
    btnShow:false,
    coverShow:false,
    recordType:'',
    typeIncome:'',
    typeWithdrawals:'',
    recordTime:'',
    orderTypeActive:true,
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
    notice: {
        loading: true,
        success: false,
        successText: '',
        valid: false,
        text: ''
    },
    tab:{
        all:true,
        withdraw:{
            all:'',
            success:'',
            error:'',
            waiting:''
        },
        income:{
            all:'',
            success:'',
            error:'',
            waiting:''
        }
    },
    urlInfo: {
        brokerId: '',
        other: ''
    },
    isListEmpty:'',
    lastId:'',
    withdrawType:'',
    withdrawState:'all',
    orderType:'desc',
    pageSize:20
};

var zjyVM = new Vue({
    el: '#record',
    data:zjyData,
    methods:{
        getBrokerId: function () {
            return phpBrokerId;
        },
        getStatus: function () {
            zjyData.notice.loading = true;
            reqwest({
                url: '?r=brokerData/WithdrawList',
                method: 'get',
                type: 'json',
                data: {
                    broker_id: zjyVM.getBrokerId(),
                    last_id:zjyData.lastId,
                    withdraw_type: zjyData.withdrawType,
                    withdraw_state: zjyData.withdrawState,
                    order_field: '',
                    order_type: zjyData.orderType,
                    page_size: zjyData.pageSize
                },
                contentType: 'application/json',
                error: function (err) {
                    zjyData.notice.loading = false;
                    zjyData.notice.valid = true;
                    console.log(err)
                },
                success: function (resp) {
                    setTimeout(function(){
                        zjyData.notice.loading = false;
                        zjyData.items = resp.results.list;
                        if(zjyData.items == ''){
                            zjyData.isListEmpty = true;
                        }else{
                            zjyData.isListEmpty = false;
                        }
                    },300);
                }
            });
        },
        getRecordType:function(){
            zjyData.coverShow = true;
            zjyData.recordType = true;
            zjyData.recordTime = false;
            document.body.style.overflow = 'hidden';
        },
        getRecordTime:function(){
            zjyData.coverShow = true;
            zjyData.recordTime = true;
            zjyData.recordType = false;
            document.body.style.overflow = 'hidden';
        },
        recordCancel:function(){
            zjyData.recordType = false;
            zjyData.recordTime = false;
            zjyData.coverShow = false;
            document.body.style.overflow = 'auto';
        },
        getTypeAll:function(){
            zjyVM.recordCancel();
            zjyData.withdrawType = '';
            zjyData.withdrawState = 'all';
            zjyData.lastId = '';
            zjyData.typeIncome = false;
            zjyData.typeWithdrawals = false;
            zjyVM.getStatus();
        },
        getTypeIncome:function(){
            zjyData.typeIncome = true;
            zjyData.typeWithdrawals = false;
            zjyData.withdrawType = 'add';
        },
        getTypeWithdrawals:function(){
            zjyData.typeIncome = false;
            zjyData.typeWithdrawals = true;
            zjyData.withdrawType = 'reduce';
        },
        getTypeState:function (index) {
            zjyVM.recordCancel();
            zjyData.withdrawState = index;
            zjyData.lastId = '';
            zjyVM.getStatus();
            if(zjyData.withdrawType == 'add'){
                zjyData.tab.withdraw.all = false;
                zjyData.tab.withdraw.waiting = false;
                zjyData.tab.withdraw.success = false;
                zjyData.tab.withdraw.error = false;
                switch(index){
                    case 'all':
                        zjyData.tab.income.all = true;
                        zjyData.tab.income.waiting = false;
                        zjyData.tab.income.success = false;
                        zjyData.tab.income.error = false;
                        break;
                    case 0:
                        zjyData.tab.income.all = false;
                        zjyData.tab.income.waiting = true;
                        zjyData.tab.income.success = false;
                        zjyData.tab.income.error = false;
                        break;
                    case 1:
                        zjyData.tab.income.all = false;
                        zjyData.tab.income.waiting = false;
                        zjyData.tab.income.success = true;
                        zjyData.tab.income.error = false;
                        break;
                    case 2:
                        zjyData.tab.income.all = false;
                        zjyData.tab.income.waiting = false;
                        zjyData.tab.income.success = false;
                        zjyData.tab.income.error = true;
                        break;
                    default:
                        break;
                }
            }else{
                zjyData.tab.income.all = false;
                zjyData.tab.income.waiting = false;
                zjyData.tab.income.success = false;
                zjyData.tab.income.error = false;
                switch(index){
                    case 'all':
                        zjyData.tab.withdraw.all = true;
                        zjyData.tab.withdraw.waiting = false;
                        zjyData.tab.withdraw.success = false;
                        zjyData.tab.withdraw.error = false;
                        break;
                    case 0:
                        zjyData.tab.withdraw.all = false;
                        zjyData.tab.withdraw.waiting = true;
                        zjyData.tab.withdraw.success = false;
                        zjyData.tab.withdraw.error = false;
                        break;
                    case 1:
                        zjyData.tab.withdraw.all = false;
                        zjyData.tab.withdraw.waiting = false;
                        zjyData.tab.withdraw.success = true;
                        zjyData.tab.withdraw.error = false;
                        break;
                    case 2:
                        zjyData.tab.withdraw.all = false;
                        zjyData.tab.withdraw.waiting = false;
                        zjyData.tab.withdraw.success = false;
                        zjyData.tab.withdraw.error = true;
                        break;
                    default:
                        break;
                }
            }
        },
        getOrderType:function(type){
            zjyVM.recordCancel();
            zjyVM.orderType = type;
            if(type == 'asc'){
                zjyVM.orderTypeActive = false;
            }else{
                zjyVM.orderTypeActive = true;
            }
            zjyVM.getStatus();
        },
        pullRefresh:function(){
            zjyData.lastId = zjyData.items[zjyData.items.length - 1].withdraw_id;
            zjyData.notice.loading = true;
            reqwest({
                url: '?r=brokerData/WithdrawList',
                method: 'get',
                type: 'json',
                data: {
                    broker_id: zjyVM.getBrokerId(),
                    last_id:zjyData.lastId,
                    withdraw_type: zjyData.withdrawType,
                    withdraw_state: zjyData.withdrawState,
                    order_field: '',
                    order_type: zjyData.orderType,
                    page_size: zjyData.pageSize
                },
                contentType: 'application/json',
                error: function (err) {
                    zjyData.notice.loading = false;
                    zjyData.notice.valid = true;
                    zjyData.notice.text = err.msg;
                },
                success: function (resp) {
                    zjyData.notice.loading = false;
                    if(resp.results.list == ''){
                        zjyData.notice.valid = true;
                        zjyData.notice.text = '没有更多了';
                    }else{
                        for(var i in resp.results.list){
                            zjyData.items.push(resp.results.list[i]);
                        }
                    }
                }
            });
        }
    }
});
zjyVM.getStatus();
