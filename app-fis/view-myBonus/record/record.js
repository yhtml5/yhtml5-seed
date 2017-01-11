/*
 * @require ../../server/author.js
 * @require allInOne.js
 *
 */
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
Vue.component('scroller', vuxScroller);


var zjyData = {
    btnShow:false,
    coverShow:false,
    recordType:'',
    typeIncome:true,
    typeWithdrawals:false,
    recordTime:'',
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
    urlInfo: {
        brokerId: '',
        other: ''
    },
    lastId:'',
    withdrawType:'',
    withdrawState:'all',
    orderType:'desc',
    pageSize:20,
    config:{
        content: 'Pull Up To Refresh',
        pullUpHeight: 60,
        height: 60,
        autoRefresh: false,
        downContent: 'Release To Refresh',
        upContent: 'Pull Up To Refresh',
        loadingContent: 'Loading...',
        clsPrefix: 'xs-plugin-pullup-'
    }
};




var yhtml5VM = new Vue({
    el: '#record',
    data:zjyData,
    methods:{
        getBrokerId: function () {
            zjyData.urlInfo.brokerId = decodeURI(window.location.search).split("brokerId=")[1];
            return zjyData.urlInfo.brokerId
        },
        getStatus: function () {
            zjyData.notice.loading = true;
            reqwest({
                url: 'http://test.louzhanggui.com/general_agentTest.php?r=brokerData/WithdrawList',
                method: 'get',
                type: 'json',
                data: {
                    broker_id: yhtml5VM.getBrokerId(),
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
                    zjyData.notice.loading = false;
                    console.log(resp);
                    zjyData.items = resp.results.list;
                }
            });
        },
        getRecordType:function(){
            zjyData.coverShow = true;
            zjyData.recordType = true;
            zjyData.recordTime = false;
            document.documentElement.style.overflow = 'hidden';
        },
        getRecordTime:function(){
            zjyData.coverShow = true;
            zjyData.recordTime = true;
            zjyData.recordType = false;
            document.documentElement.style.overflow = 'hidden';
        },
        recordCancel:function(){
            zjyData.recordType = false;
            zjyData.recordTime = false;
            zjyData.coverShow = false;
            document.documentElement.style.overflow = 'auto';
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
            if(index == 'all'){
                zjyData.withdrawType = '';
            }else if(yhtml5VM.typeIncome){
                zjyData.withdrawType = 'add';
            }else{
                zjyData.withdrawType = 'reduce';
            }
            console.log(this);
            yhtml5VM.recordCancel();
            zjyData.withdrawState = index;
            zjyData.lastId = '';
            yhtml5VM.getStatus();
        },
        getOrderType:function(type){
            yhtml5VM.recordCancel();
            yhtml5VM.orderType = type;
            yhtml5VM.getStatus();
        },

        pullRefresh:function(){
            zjyData.lastId = zjyData.items[zjyData.items.length - 1].withdraw_id;
            zjyData.notice.loading = true;
            reqwest({
                url: 'http://test.louzhanggui.com/general_agentTest.php?r=brokerData/WithdrawList',
                method: 'get',
                type: 'json',
                data: {
                    broker_id: yhtml5VM.getBrokerId(),
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
yhtml5VM.getStatus();
/*window.onscroll = function(){
    var screenHeight = window.screen.height;
    var scrollTop = document.body.scrollTop;
    var scrollHeight = document.body.scrollHeight;
    if(screenHeight + scrollTop == scrollHeight){
        yhtml5VM.pullRefresh();
    }
};*/


