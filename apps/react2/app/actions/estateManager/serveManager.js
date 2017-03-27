'use strict';
import {
    Ajax,
    NameSpace,
    isToken,
} from '../../util/';
import {
    message
} from 'antd';
let ns = NameSpace('serveManager');
export const GETLIST_REQUEST = ns('GETLIST_REQUEST');
export const GETLIST_SUCCESS = ns('GETLIST_SUCCESS');
export const GETLIST_FAILED = ns('GETLIST_FAILED');

export const SERVERCHECK_REQUEST = ns('SERVERCHECK_REQUEST');
export const SERVERCHECK_SUCCESS = ns('SERVERCHECK_SUCCESS');
export const SERVERCHECK_FAILED = ns('SERVERCHECK_FAILED');

export const PARENTNAME_REQUEST = ns('PARENTNAME_REQUEST');
export const PARENTNAME_SUCCESS = ns('PARENTNAME_SUCCESS');
export const PARENTNAME_FAILED = ns('PARENTNAME_FAILED');

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
            api: 'serverList',
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

export function serverCheck(params,callback) {
    var defaultParam = {},
    params = Object.assign({}, defaultParam, params);
    params = JSON.stringify(params);
    return (dispatch) => {
        dispatch({
            type: SERVERCHECK_REQUEST,
            data: ''
        })
        Ajax({
            api: 'serverCheck',
            data: {
                data: params
            }
        }, json => {
            var code = json.code;
            if (json.code== 20000) {
                dispatch({
                    type: SERVERCHECK_SUCCESS,
                    data: json
                });
                message.success('操作成功');
                callback&&callback();
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
                type: SERVERCHECK_FAILED,
                data: json
            })
            message.error('服务器错误，请重试');
        })
    }
}

export function parentName(params,callback) {
    var defaultParam = {},
    params = Object.assign({}, defaultParam, params);
    params = JSON.stringify(params);
    return (dispatch) => {
        dispatch({
            type: PARENTNAME_REQUEST,
            data: ''
        })
        Ajax({
            api: 'parentName',
            data: {
                data: params
            }
        }, json => {
            var code = json.code;
            if (json.code== 20000) {
                dispatch({
                    type: PARENTNAME_SUCCESS,
                    data: json
                })
                callback&&callback();
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
                type: PARENTNAME_FAILED,
                data: json
            })
            message.error('服务器错误，请重试');
        })
    }
}
