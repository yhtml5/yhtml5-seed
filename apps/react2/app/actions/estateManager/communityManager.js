'use strict';
import {
    Ajax,
    NameSpace,
    isToken,
} from '../../util/';
import {
    message
} from 'antd';
let ns = NameSpace('communityManager');
export const GETLIST_REQUEST = ns('GETLIST_REQUEST');
export const GETLIST_SUCCESS = ns('GETLIST_SUCCESS');
export const GETLIST_FAILED = ns('GETLIST_FAILED');
export const GETAREA_REQUEST = ns('GETAREA_REQUEST');
export const GETAREA_SUCCESS = ns('GETAREA_SUCCESS');
export const GETAREA_FAILED = ns('GETAREA_FAILED');
export const STATUSCHANGE_REQUEST = ns('STATUSCHANGE_REQUEST');
export const STATUSCHANGE_SUCCESS = ns('STATUSCHANGE_SUCCESS');
export const STATUSCHANGE_FAILED = ns('STATUSCHANGE_FAILED');
export const GETSERVERLIST_REQUEST = ns('GETSERVERLIST_REQUEST');
export const GETSERVERLIST_SUCCESS = ns('GETSERVERLIST_SUCCESS');
export const GETSERVERLIST_FAILED = ns('GETSERVERLIST_FAILED');
export const GETCOMPANYLIST_REQUEST = ns('GETCOMPANYLIST_REQUEST');
export const GETCOMPANYLIST_SUCCESS = ns('GETCOMPANYLIST_SUCCESS');
export const GETCOMPANYLIST_FAILED = ns('GETCOMPANYLIST_FAILED');

//获取列表
export function getList(params) {
  var defaultParam = {
    page:1,
    rows:10,
  },
  params = Object.assign({}, defaultParam, params);
  params = JSON.stringify(params);
    return (dispatch) => {
        dispatch({
            type: GETLIST_REQUEST,
            data: ''
        })
        Ajax({
            api: 'communityList',
            data: {
                data: params
            }
        }, json => {
            var code = json.code;
            if (code == 20000) {
                dispatch({
                    type: GETLIST_SUCCESS,
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
                type: GETLIST_FAILED,
                data: json
            })
            message.error('服务器错误，请重试');
        })
    }
}
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
//上线下线
export function statusChange(params,callback){
   var defaultParam = {},
   params = Object.assign({}, defaultParam, params);
    params = JSON.stringify(params);
  return (dispatch) => {
        dispatch({
            type: STATUSCHANGE_REQUEST,
            data: ''
        })
        Ajax({
            api: 'statusChange',
            data: {
                data: params
            }
        }, json => {
            var code = json.code;
            if (code == 20000) {
                dispatch({
                    type: STATUSCHANGE_FAILED,
                    data: json
                })
                 message.success('操作成功');
            callback && callback()
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
                type: STATUSCHANGE_FAILED,
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
