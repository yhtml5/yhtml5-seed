'use strict';
import {
    Ajax,
    NameSpace,
    isToken,
} from '../../util/';
import {
    message
} from 'antd';
let ns = NameSpace('estateCompanyAdd');

export const COMPANYPARENT_REQUEST = ns('COMPANYPARENT_REQUEST');
export const COMPANYPARENT_SUCCESS = ns('COMPANYPARENT_SUCCESS');
export const COMPANYPARENT_FAILED = ns('COMPANYPARENT_FAILED');

export const COMPANYUPDATE_REQUEST = ns('COMPANYUPDATE_REQUEST');
export const COMPANYUPDATE_SUCCESS = ns('COMPANYUPDATE_SUCCESS');
export const COMPANYUPDATE_FAILED = ns('COMPANYUPDATE_FAILED');

export function companyParent(params) {
    var defaultParam = {},
    params = Object.assign({}, defaultParam, params);
    params = JSON.stringify(params);

    return (dispatch) => {
        dispatch({
            type: COMPANYPARENT_REQUEST,
            data: params
        })
        Ajax({
            api: 'companyParent',
            data: {
                data: params
            }
        }, json => {
            var code = json.code;
            if (code == 20000) {
                dispatch({
                    type: COMPANYPARENT_SUCCESS,
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
                type: COMPANYPARENT_FAILED,
                data: json
            })
            message.error('服务器错误，请重试');
        })
    }
}

export function companyUpdate(params,callback) {
    var defaultParam = {},
    params = Object.assign({}, defaultParam, params);
    params = JSON.stringify(params);

    return (dispatch) => {
        dispatch({
            type: COMPANYUPDATE_REQUEST,
            data: params
        })
        Ajax({
            api: 'companyUpdate',
            data: {
                data: params
            }
        }, json => {
            var code = json.code;
            if (code == 20000) {
                dispatch({
                    type: COMPANYUPDATE_SUCCESS,
                    data: json
                })
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
                type: COMPANYUPDATE_FAILED,
                data: json
            })
            message.error('服务器错误，请重试');
        })
    }
}
