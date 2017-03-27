'use strict';
import {
    Ajax,
    NameSpace,
    isToken,
} from '../../util/';
import {
    message
} from 'antd';
let ns = NameSpace('serveManagerAdd');
export const PARENTNAME_REQUEST = ns('PARENTNAME_REQUEST');
export const PARENTNAME_SUCCESS = ns('PARENTNAME_SUCCESS');
export const PARENTNAME_FAILED = ns('PARENTNAME_FAILED');

export const SERVERUPDATE_REQUEST = ns('SERVERUPDATE_REQUEST');
export const SERVERUPDATE_SUCCESS = ns('SERVERUPDATE_SUCCESS');
export const SERVERUPDATE_FAILED = ns('SERVERUPDATE_FAILED');

export const GETUPLOADTOKEN_REQUEST = ns('GETUPLOADTOKEN_REQUEST');
export const GETUPLOADTOKEN_SUCCESS = ns('GETUPLOADTOKEN_SUCCESS');
export const GETUPLOADTOKEN_FAILED = ns('GETUPLOADTOKEN_FAILED');

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

export function serverUpdate(params,callback) {
    var defaultParam = {},
    params = Object.assign({}, defaultParam, params);
    params = JSON.stringify(params);
    return (dispatch) => {
        dispatch({
            type: SERVERUPDATE_REQUEST,
            data: ''
        })
        Ajax({
            api: 'serverUpdate',
            data: {
                data: params
            }
        }, json => {
            var code = json.code;
            if (json.code== 20000) {
                dispatch({
                    type: SERVERUPDATE_SUCCESS,
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
                type: SERVERUPDATE_FAILED,
                data: json
            })
            message.error('服务器错误，请重试');
        })
    }
}

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
