'use strict';
import {
    Ajax,
    NameSpace,
    isToken,
} from '../../util/';
import {
    message
} from 'antd';
let ns = NameSpace('communityManagerEdit');


export const GETAREA_REQUEST = ns('GETAREA_REQUEST');
export const GETAREA_SUCCESS = ns('GETAREA_SUCCESS');
export const GETAREA_FAILED = ns('GETAREA_FAILED');




export const GETSERVERLIST_REQUEST = ns('GETSERVERLIST_REQUEST');
export const GETSERVERLIST_SUCCESS = ns('GETSERVERLIST_SUCCESS');
export const GETSERVERLIST_FAILED = ns('GETSERVERLIST_FAILED');


export const GETCOMPANYLIST_REQUEST = ns('GETCOMPANYLIST_REQUEST');
export const GETCOMPANYLIST_SUCCESS = ns('GETCOMPANYLIST_SUCCESS');
export const GETCOMPANYLIST_FAILED = ns('GETCOMPANYLIST_FAILED');

export const UPDATECOMMUNITY_REQUEST = ns('UPDATECOMMUNITY_REQUEST');
export const UPDATECOMMUNITY_SUCCESS = ns('UPDATECOMMUNITY_SUCCESS');
export const UPDATECOMMUNITY_FAILED = ns('UPDATECOMMUNITY_FAILED');


export const COMMUNITYSHOW_REQUEST = ns('COMMUNITYSHOW_REQUEST');
export const COMMUNITYSHOW_SUCCESS = ns('COMMUNITYSHOW_SUCCESS');
export const COMMUNITYSHOW_FAILED = ns('COMMUNITYSHOW_FAILED');


export const GETUPLOADTOKEN_REQUEST = ns('GETUPLOADTOKEN_REQUEST');
export const GETUPLOADTOKEN_SUCCESS = ns('GETUPLOADTOKEN_SUCCESS');
export const GETUPLOADTOKEN_FAILED = ns('GETUPLOADTOKEN_FAILED');
//获取省市
export function getArea(params) {
    var defaultParam = {},
        params = Object.assign({}, defaultParam, params);
    params = JSON.stringify(params);
    return (dispatch) => {
        dispatch({
            type: GETAREA_REQUEST,
            data: ''
        })
        Ajax({
            api: 'getArea',
            data: {
                data: params
            }
        }, json => {
            var code = json.code;
            if (code == 20000) {
                dispatch({
                    type: GETAREA_SUCCESS,
                    data: json
                })
            }else if(isToken(code)){
                message.info('当前账号信息已失效,请重新登录！');
                setTimeout(() => {
                    location.href = "/";
                }, 3000)
            }else{
               message.error(json.error.errorMsg);
            }
        }, json => {
            dispatch({
                type: GETAREA_FAILED,
                data: json
            })
            message.error('服务器错误，请重试');
        })
    }
}

//获取服务列表
export function getServerList(params) {
    var defaultParam = {},
        params = Object.assign({}, defaultParam, params);
    params = JSON.stringify(params);
    return (dispatch) => {
        dispatch({
            type: GETSERVERLIST_REQUEST,
            data: ''
        })
        Ajax({
            api: 'serverLists',
            data: {
                data: params
            }
        }, json => {
            var code = json.code;
            if (code == 20000) {
                dispatch({
                    type: GETSERVERLIST_SUCCESS,
                    data: json
                })
            }else if(isToken(code)){
                message.info('当前账号信息已失效,请重新登录！');
                setTimeout(() => {
                    location.href = "/";
                }, 3000)
            }else{
               message.error(json.error.errorMsg);
            }
        }, json => {
            dispatch({
                type: GETSERVERLIST_FAILED,
                data: json
            })
            message.error('服务器错误，请重试');
        })
    }
}


//获取开启物业公司
export function getCompanyList(params) {
    var defaultParam = {},
        params = Object.assign({}, defaultParam, params);
    params = JSON.stringify(params);
    return (dispatch) => {
        dispatch({
            type: GETCOMPANYLIST_REQUEST,
            data: ''
        })
        Ajax({
            api: 'getcompanyList',
            data: {
                data: params
            }
        }, json => {
            var code = json.code;
            if (code == 20000) {
                dispatch({
                    type: GETCOMPANYLIST_SUCCESS,
                    data: json
                })
            }else if(isToken(code)){
                message.info('当前账号信息已失效,请重新登录！');
                setTimeout(() => {
                    location.href = "/";
                }, 3000)
            }else{
               message.error(json.error.errorMsg);
            }
        }, json => {
            dispatch({
                type: GETCOMPANYLIST_FAILED,
                data: json
            })
            message.error('服务器错误，请重试');
        })
    }
}


//新增小区
export function updateCommunity(params,callback) {
    var defaultParam = {},
        params = Object.assign({}, defaultParam, params);
    params = JSON.stringify(params);
    return (dispatch) => {
        dispatch({
            type: UPDATECOMMUNITY_REQUEST,
            data: ''
        })
        Ajax({
            api: 'updateCommunity',
            data: {
                data: params
            }
        }, json => {
            var code = json.code;
            if (code == 20000) {
                dispatch({
                    type: UPDATECOMMUNITY_SUCCESS,
                    data: json
                })
               message.success('编辑成功');
               setTimeout(() => {
                    location.href="#/communityManager";
                }, 3000)
            }else if(isToken(code)){
                message.info('当前账号信息已失效,请重新登录！');
                setTimeout(() => {
                    location.href = "/";
                }, 3000)
            }else{
               message.error(json.error.errorMsg);
            }
        }, json => {
            dispatch({
                type: UPDATECOMMUNITY_FAILED,
                data: json
            })
            message.error('服务器错误，请重试');
        })
    }
}


//获取小区数据
export function communityShow(params) {
    var defaultParam = {},
        params = Object.assign({}, defaultParam, params);
    params = JSON.stringify(params);
    return (dispatch) => {
        dispatch({
            type: COMMUNITYSHOW_REQUEST,
            data: ''
        })
        Ajax({
            api: 'communityShow',
            data: {
                data: params
            }
        }, json => {
            var code = json.code;
            if (code == 20000) {
                dispatch({
                    type: COMMUNITYSHOW_SUCCESS,
                    data: json
                })
            }
            if(isToken(code)){
                message.info('当前账号信息已失效,请重新登录！');
                setTimeout(() => {
                    location.href = "/";
                }, 3000)
            }
        }, json => {
            dispatch({
                type: COMMUNITYSHOW_FAILED,
                data: json
            })
            message.error('服务器错误，请重试');
        })
    }
}


// 获取图片上传token
export function getUploadToken(username,password) {
    return (dispatch) => {
        dispatch({
            type: GETUPLOADTOKEN_REQUEST,
            data: ''
        })
        Ajax({
            url: 'http://61.130.183.182:8083/apiserver/api/qiNiuUpToken',
            data: {
                    'username': username,
                    'password': password,
            }
        }, json => {
            var code = json.code;
            if (json.errorcode== 0) {
                dispatch({
                    type: GETUPLOADTOKEN_SUCCESS,
                    data: json
                })
            }else if(isToken(code)){
                message.info('当前账号信息已失效,请重新登录！');
                setTimeout(() => {
                    location.href = "/";
                }, 3000)
            }else{
               message.error(json.message);
            }
        }, json => {
            dispatch({
                type: GETUPLOADTOKEN_FAILED,
                data: json
            })
            message.error('服务器错误，请重试');
        })
    }
}
