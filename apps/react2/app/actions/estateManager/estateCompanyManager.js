'use strict';
import {
    Ajax,
    NameSpace,
    isToken,
} from '../../util/';
import {
    message
} from 'antd';
let ns = NameSpace('estateCompanyManager');
export const COMPANYLIST_REQUEST = ns('COMPANYLIST_REQUEST');
export const COMPANYLIST_SUCCESS = ns('COMPANYLIST_SUCCESS');
export const COMPANYLIST_FAILED = ns('COMPANYLIST_FAILED');

export const COMPANYOPENDOWN_REQUEST = ns('COMPANYOPENDOWN_REQUEST');
export const COMPANYOPENDOWN_SUCCESS = ns('COMPANYOPENDOWN_SUCCESS');
export const COMPANYOPENDOWN_FAILED = ns('COMPANYOPENDOWN_FAILED');

export function getList(params) {
  var defaultParam = {
    page:1,
    rows:10,
  },
  params = Object.assign({}, defaultParam, params);
  params = JSON.stringify(params);

    return (dispatch) => {
        dispatch({
            type: COMPANYLIST_REQUEST,
            data: params
        })
        Ajax({
            api: 'companyList',
            data: {
                data: params
            }
        }, json => {
            var code = json.code;
            if (code == 20000) {
                dispatch({
                    type: COMPANYLIST_SUCCESS,
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
                type: COMPANYLIST_FAILED,
                data: json
            })
            message.error('服务器错误，请重试');
        })
    }
}

export function companyOpenDown(params,callback) {
    var defaultParam = {},
    params = Object.assign({}, defaultParam, params);
    params = JSON.stringify(params);

    return (dispatch) => {
        dispatch({
            type: COMPANYOPENDOWN_REQUEST,
            data: params
        })
        Ajax({
            api: 'companyOpenDown',
            data:  {
                data: params
            }
        }, json => {
            var code = json.code;
            if (code == 20000) {
                dispatch({
                    type: COMPANYOPENDOWN_SUCCESS,
                    data: json
                });
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
                type: COMPANYOPENDOWN_FAILED,
                data: json
            })
            message.error('服务器错误，请重试');
        })
    }
}
