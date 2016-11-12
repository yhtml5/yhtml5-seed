/*
 * @require ../../server/author.js
 * @require allInOne.js
 *
 */
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
    accountId: '',
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
    accountList: '',
    inputNum:'',
    inputName:''
};

var yhtml5VM = new Vue({
    el: '#bankCardDetail',
    data: zjyData,
    methods: {
        getBrokerId: function () {
            var arr = decodeURI(window.location.search).split("&");
            zjyData.urlInfo.brokerId = arr[0].split("brokerId=")[1];
            return zjyData.urlInfo.brokerId
        },
        getStatus: function () {
            zjyData.notice.loading = true;
            var index = decodeURI(window.location.search).split("index=")[1];
            reqwest({
                url: 'http://test.louzhanggui.com/general_agentTest.php?r=brokerData/BindList',
                method: 'get',
                type: 'json',
                contentType: 'application/json',
                data: {
                    broker_id: yhtml5VM.getBrokerId()
                },
                error: function (err) {
                    zjyData.notice.loading = false;
                    console.log(err.content)
                },
                success: function (resp) {
                    console.log(resp);
                    zjyData.notice.loading = false;
                    zjyData.accountList = resp.results.list[index];
                    if (zjyData.accountList.type == 1) {
                        zjyData.accountName = '支付宝帐户';
                        zjyData.accountLogo = 'myBonusStatic/img/zhifubao.png';
                        zjyData.accountNum = zjyData.accountList.alipay_account_alia;
                        zjyData.inputNum = '账号';
                        zjyData.inputName = '姓名'
                    } else {
                        zjyData.accountName = zjyData.accountList.bank_name;
                        zjyData.accountLogo = zjyData.accountList.bank_logo;
                        zjyData.accountNum = zjyData.accountList.bank_card_no_alia;
                        zjyData.inputNum = '卡号';
                        zjyData.inputName = '开卡人'
                    }
                    zjyData.accountId = zjyData.accountList.id;

                }
            });
        },
        cardDelete: function () {
            zjyData.notice.loading = true;
            reqwest({
                url: 'http://test.louzhanggui.com/general_agentTest.php?r=brokerData/BindDel',
                method: 'get',
                type: 'json',
                contentType: 'application/json',
                data: {
                    broker_id: yhtml5VM.getBrokerId(),
                    bind_id: zjyData.accountId
                },
                error: function (err) {
                    zjyData.loading = false;
                    zjyData.notice.success = true;
                    zjyData.notice.text = err.msg;
                    console.log(err.content)
                },
                success: function (resp) {
                    zjyData.notice.loading = false;
                    zjyData.notice.success = true;
                    zjyData.notice.successText = '删除成功';
                    setTimeout(function () {
                        window.history.back()
                    }, 1000);
                    console.log(resp);
                    // if (resp.code == 200) {
                    //     zjyData.notice.success = true;
                    //     zjyData.notice.successText = '删除成功';
                    //     setTimeout(function () {
                    //         window.location.href = '//' + location.host + '/bankCardList.html?brokerId=' + zjyData.urlInfo.brokerId
                    //     }, 500);
                    // } else {
                    //     console.log("error");
                    //     zjyData.notice.valid = true;
                    //     zjyData.notice.text = resp.msg;
                    //     setTimeout(function () {
                    //         window.location.href = '//' + location.host + '/bankCardList.html?brokerId=' + zjyData.urlInfo.brokerId
                    //     }, 500);
                    // }
                }
            });
        },
        cardChange: function () {
            zjyData.notice.loading = true;
            reqwest({
                url: 'http://test.louzhanggui.com/general_agentTest.php?r=brokerData/BindEdit',
                method: 'get',
                type: 'json',
                data: {
                    broker_id: '1851',
                    bind_id: zjyData.accountId,
                    bank_id: zjyData.bankId,
                    alipay_account: zjyData.accountNum,
                    bank_card_no: zjyData.accountNum,
                    true_name: '张三'
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
                        zjyData.notice.success = true;
                        zjyData.notice.successText = '保存成功';
                        setTimeout(function () {
                            window.history.back()
                        }, 500);
                    } else {
                        zjyData.notice.valid = true;
                        zjyData.notice.text = resp.msg;
                    }
                }
            })
        }
    }
});
yhtml5VM.getStatus();
