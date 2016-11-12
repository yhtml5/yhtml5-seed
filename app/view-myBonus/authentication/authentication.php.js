"use strict";
/************  authentication  ************/
var zjyData = {
    identity_status: 0,
    realname: '',
    headerRightBtn: {
        reAuthenticate: false,
        submit: true,
        none: false
    },
    identity_card: '',
    identity_date: '',
    noteTop: true,
    noteTopText: "",
    noteTopRed: '',
    notice: {
        loading: false,
        success: false,
        valid: '',
        text: ''
    },
    actionsheet: {
        show: false,
        menus: {
            menu1: '相机',
            menu2: '照片'
        }
    },
    inputIDcard: true,
    IDcards: [
        {
            imgUrl: '',
            name: '身份证正面',
            text: '推荐支付宝用户',
            add: false,
            backdrop: false,
            show:false
        },
        {
            imgUrl: '',
            name: '身份证反面',
            text: '推荐微信用户',
            add: false,
            backdrop: false,
            show:false
        }
    ],
    urlInfo: {
        brokerId: '',
        other: ''
    }
}
Vue.component('actionsheet', vuxActionsheet);
Vue.component('cell', vuxCell);
Vue.component('datetime', vuxDatetime);
Vue.component('divider', vuxDivider);
Vue.component('group', vuxGroup);
Vue.component('loading', vuxLoading);
Vue.component('switch', vuxSwitch);
Vue.component('toast', vuxToast);
Vue.component('x-header', vuxXHeader);
Vue.component('x-input', vuxXInput);

var yhtml5VM = new Vue({
    el: '#authentication',
    data: zjyData,
    methods: {
        getBrokerId: function () {
            return phpBrokerId;
        },
        getIdentity: function () {
            reqwest({
                url: '?r=brokerData/getIdentity',
                method: 'get',
                type: 'json',
                data: {broker_id: yhtml5VM.getBrokerId()},
                contentType: 'application/json',
                error: function (err) {
                    zjyData.notice.text = '服务器错误,请重试';
                    setTimeout(function () {
                        // zjyData.notice.loading = false;
                        // zjyData.notice.valid = true
                    }, 500);
                    console.log(err.msg)
                },
                success: function (resp) {
                    // zjyData.notice.loading = false;
                    // zjyData.notice.success = true;
                    zjyData.realname = resp.brokerInfo.realname
                    zjyData.identity_card = resp.brokerInfo.identity_card
                    zjyData.identity_date = resp.brokerInfo.identity_date
                    zjyData.identity_status = resp.brokerInfo.identity_status
                    zjyData.IDcards[0].imgUrl = resp.brokerInfo.identity_img
                    zjyData.IDcards[1].imgUrl = resp.brokerInfo.identity_reverse_img
                    yhtml5VM.changeStatus(zjyData.identity_status)
                    console.log('getIdentity: ', zjyData.identity_status)
                }
            });
        },
        changeStatus: function (status) {
            // console.clear()
            if (status == 4) {
                zjyData.noteTop = true;
                zjyData.noteTopText = '您的身份证已失效，请重新上传';
                zjyData.headerRightBtn.submit = true;
                zjyData.headerRightBtn.reAuthenticate = false;
                zjyData.IDcards[0].img = true;
                zjyData.IDcards[1].img = true;
                zjyData.IDcards[0].backdrop = true;
                zjyData.IDcards[1].backdrop = true;
                zjyData.IDcards[0].add = true;
                zjyData.IDcards[1].add = true;
                zjyData.inputIDcard = true;
                console.log("身份证失效4");
                return;
            } else if (status == 1) {
                zjyData.noteTop = true;
                zjyData.noteTopText = '需要人工审核，将在3个工作日内给您回复';
                zjyData.noteTopRed = true;
                zjyData.headerRightBtn.submit = false;
                zjyData.headerRightBtn.reAuthenticate = false;
                zjyData.inputIDcard = false;
                zjyData.IDcards[0].img = true;
                zjyData.IDcards[1].img = true;
                zjyData.IDcards[0].backdrop = false;
                zjyData.IDcards[1].backdrop = false;
                zjyData.IDcards[0].add = false;
                zjyData.IDcards[1].add = false;
                console.log("审核状态1");
                return;
            } else if (status == 2) {
                zjyData.noteTop = false;
                // zjyData.noteTopText = '认证成功，审核通过';
                zjyData.headerRightBtn.submit = false;
                zjyData.headerRightBtn.reAuthenticate = false;
                zjyData.IDcards[0].img = true;
                zjyData.IDcards[1].img = true;
                zjyData.IDcards[0].backdrop = false;
                zjyData.IDcards[1].backdrop = false;
                zjyData.IDcards[0].add = false;
                zjyData.IDcards[1].add = false;
                zjyData.inputIDcard = false;
                console.log("展示状态2");
                return;
            } else if (status == 3) {
                zjyData.noteTop = true;
                zjyData.noteTopText = '实名认证信息审核不通过，请重新填写身份证信息';
                zjyData.headerRightBtn.submit = false;
                zjyData.headerRightBtn.reAuthenticate = true;
                zjyData.IDcards[0].img = true;
                zjyData.IDcards[1].img = true;
                zjyData.IDcards[0].backdrop = true;
                zjyData.IDcards[1].backdrop = true;
                zjyData.IDcards[0].add = true;
                zjyData.IDcards[1].add = true;
                zjyData.inputIDcard = true;
                console.log("审核不通过状态3");
                return;
            } else {
                zjyData.noteTop = true;
                zjyData.noteTopText = '请如实填写身份信息，请确保身份证处于有效期内';
                zjyData.headerRightBtn.submit = true;
                zjyData.headerRightBtn.reAuthenticate = false;
                zjyData.IDcards[0].img = false;
                zjyData.IDcards[1].img = false;
                zjyData.IDcards[0].backdrop = false;
                zjyData.IDcards[1].backdrop = false;
                zjyData.IDcards[0].add = true;
                zjyData.IDcards[1].add = true;
                zjyData.inputIDcard = true;
                console.log("未认证状态0");
                return;
            }
        },
        submitAuthentication: function () {
            // yhtml5VM.formValidator()
            var nowDate = Date.parse(new Date()) / 1000;
            var identity_date = Date.parse(zjyData.identity_date) / 1000;
            if (zjyData.realname === '') {
                zjyData.notice.valid = true;
                zjyData.notice.text = '姓名不能为空';
            } else if (zjyData.identity_card === '') {
                zjyData.notice.valid = true;
                zjyData.notice.text = '身份证不能为空';
                console.log('身份证: ', zjyData.identity_card)
            } else if (!(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(zjyData.identity_card))) {
                zjyData.notice.valid = true;
                zjyData.notice.text = '身份证格式不对';
                console.log('身份证: ', zjyData.identity_card)
            } else if (zjyData.identity_date === '') {
                zjyData.notice.valid = true;
                zjyData.notice.text = '请选择证件有效期';
            } else if (identity_date < nowDate) {
                zjyData.notice.valid = true;
                zjyData.notice.text = '身份证已过期';
            } else if (zjyData.IDcards[0].imgUrl=='' || zjyData.IDcards[1].imgUrl=='') {
                zjyData.notice.valid = true;
                zjyData.notice.text = '请上传身份证正反面';
            }
            else {
                zjyData.notice.loading = true;
                reqwest({
                    url: '?r=brokerData/upIdentity',
                    method: 'get',
                    type: 'json',
                    data: {
                        broker_id: '1851',
                        realname: zjyData.realname,
                        identity_card: zjyData.identity_card,
                        identity_date: zjyData.identity_date
                    },
                    contentType: 'application/json',
                    error: function (err) {
                        zjyData.notice.text = '服务器错误,请重试';
                        setTimeout(function () {
                            zjyData.notice.loading = false;
                            zjyData.notice.valid = true
                        }, 500);
                        console.log(err.content)
                    },
                    success: function (resp) {
                        zjyData.notice.loading = false;
                        zjyData.notice.success = true;
                        yhtml5VM.changeStatus(1)
                        console.log(resp)
                    }
                });
                console.log("realname: ", zjyData.realname);
                console.log("identity_card: ", zjyData.identity_card);
                console.log("identity_date: ", zjyData.identity_date)
            }
        },
        reAuthenticate: function () {
            yhtml5VM.changeStatus(0)
        },
        openActionsheet: function ($index) {
            console.log('openActionsheet' + $index);
            zjyData.actionsheet.show = true
        },
        choiceImage: function (index) {
            console.log('choiceImage' + index);
            yhtml5VM.wxChooseImageAlbum(index);
            yhtml5VM.appChooseImageAlbum(index);
        },
        actionsheetCancel: function () {
            zjyData.actionsheet.show = false
        },
        goBackApp:function () {
            window.control.goBackApp();
        },
        getWechatConfig: function () {
            reqwest({
                url: '?r=brokerData/getWXJssdk',
                method: 'get',
                type: 'json',
                contentType: 'application/json',
                error: function (err) {
                    zjyData.notice.text = '服务器错误,请重试';
                    // setTimeout(function () {
                    //     zjyData.notice.loading = false;
                    //     zjyData.notice.valid = true
                    // }, 500);
                    console.log(err)
                },
                success: function (resp) {
                    console.log('getWechatConfig', resp.msg)
                    // zjyData.notice.loading = false;
                    // zjyData.notice.success = true;
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: phpAppId, // 必填，公众号的唯一标识
                        timestamp: phpTimestamp, // 必填，生成签名的时间戳
                        nonceStr: phpNonceStr, // 必填，生成签名的随机串
                        signature: phpSignature,// 必填，签名，见附录1
                        jsApiList: [
                            'checkJsApi',
                            'chooseImage',
                            'previewImage',
                            'uploadImage',
                            'downloadImage',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'hideOptionMenu',
                            'showOptionMenu',
                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wx.ready(function () {
                        wx.checkJsApi({
                            jsApiList: [
                                'chooseImage',
                                'previewImage',
                                'uploadImage',
                                'downloadImage',
                                'onMenuShareTimeline',
                                'onMenuShareAppMessage',
                                'onMenuShareQQ',
                                'onMenuShareWeibo',
                                'hideOptionMenu',
                                'showOptionMenu'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                            success: function (res) {
                                // alert('监测成功')
                                // 以键值对的形式返回，可用的api值true，不可用为false
                                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                            }
                        });
                    });
                }
            })
        },
        appChooseImageAlbum:function (index) {
            alert.log('appChooseImageAlbum')
            window.control.appChooseImageAlbum(index)
        },
        wxChooseImageAlbum: function (index) {
            console.log("wxChooseImageAlbum")
            wx.chooseImage({
                success: function (res) {
                    syncUpload(res.localIds,index);
                }
            });
        }
    }
});

var syncUpload=function(localIds,index){
    var localId=localIds.pop().toString();
    wx.uploadImage({
        localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
            var serverId = res.serverId.toString(); // 返回图片的服务器端ID
               reqwest({
                    url: '?r=brokerData/ajaxSetImage',
                    method: 'get',
                    type: 'json',
                    data: {
                        mediaid: serverId
                    },
                    contentType: 'application/json',
                    error: function (err) {
                        zjyData.notice.text = '服务器错误,请重试';
                        setTimeout(function () {
                            zjyData.notice.loading = false;
                            zjyData.notice.valid = true
                        }, 500);
                        console.log(err.content)
                    },
                    success: function (data) {
                        zjyData.IDcards[index].imgUrl = data.img_url;
                        zjyData.IDcards[index].show = true;
                        zjyData.IDcards[index].backdrop = true;
                        zjyData.IDcards[index].add = true;
                    }
                }); 
        }
    });
}

yhtml5VM.getIdentity();
yhtml5VM.getWechatConfig()
