'use strict';
import {Ajax, NameSpace, GetCookie, getToken} from '../../util/';
import {message} from 'antd';

import{tokenInvalid} from '../public'

let ns = NameSpace('payment');

export const GET_LIST = ns('GET_LIST');
export const GET_LIST_SUCCESS = ns('GET_LIST_SUCCESS');
export const GET_LIST_FAILED = ns('GET_LIST_FAILED');
export const GETLISTDETAILS_REQUEST = ns('GETLISTDETAILS_REQUEST');
export const GETLISTDETAILS_SUCCESS = ns('GETLISTDETAILS_SUCCESS');
export const GETLISTDETAILS_FAILED = ns('GETLISTDETAILS_FAILED');
export const GET_SERVICE_SERVICE = ns('GET_SERVICE_SERVICE');
export const GET_SERVICE_SERVICE_SUCCESS = ns('GET_SERVICE_SERVICE_SUCCESS');
export const GET_SERVICE_SERVICE_FAILED = ns('GET_SERVICE_SERVICE_FAILED');
export const GET_SERVICE_BILL_LIST = ns('GET_SERVICE_BILL_LIST');
export const GET_SERVICE_BILL_LIST_FAILED = ns('GET_SERVICE_BILL_LIST_FAILED');
export const GET_SERVICE_BILL_LIST_SUCCESS = ns('GET_SERVICE_BILL_LIST_SUCCESS');
export const EXPORT_REPORT = ns('EXPORT_REPORT');
export const EXPORT_REPORT_SUCCESS = ns('EXPORT_REPORT_SUCCESS');


function getList(params) {
  var defaultParam = {
      page: 1,
      rows: 10
    },
    params = Object.assign({}, defaultParam, params);
  params = JSON.stringify(params);
  return (dispatch) => {
    dispatch({
      type: GET_LIST,
      data: ''
    })
    Ajax({
      api: 'billLists',
      data: {
        data: params,
      }
    }, json => {
      console.log('Response: ', json)
      if (json.code == 20000) {
        dispatch({
          type: GET_LIST_SUCCESS,
          data: json
        })
      } else if (json.code == 50002) {
        // tokenInvalid()
        setTimeout(function () {
          dispatch({
            type: GET_LIST_FAILED,
          })
        }, 300)
      } else {
        message.error('未知错误，错误信息: ' + json.error.errorMsg);
        setTimeout(() => {
          dispatch({
            type: GET_LIST_FAILED,
          })
        }, 300)
      }
    }, json => {
      message.error('服务器错误，请检查网络或重试');
      dispatch({
        type: GET_LIST_FAILED,
        data: json
      })
    })
  }
}

function getListDetails(params) {
  var defaultParam = {},
    params = Object.assign({}, defaultParam, params);
  params = JSON.stringify(params);
  return (dispatch) => {
    dispatch({
      type: GETLISTDETAILS_REQUEST,
      data: ''
    })
    Ajax({
      api: 'billShow',
      data: {
        data: params
      }
    }, json => {
      if (json.code == 20000) {
        dispatch({
          type: GETLISTDETAILS_SUCCESS,
          data: json
        })
      } else if (json.code == 50002) {
        tokenInvalid()
      } else {
        message.error('未知错误，错误信息: ' + json.error.errorMsg);
      }
    }, json => {
      message.error('服务器错误，请检查网络或重试');
      dispatch({
        type: GETLISTDETAILS_FAILED,
        data: json
      })
    })
  }
}

function getServiceService() {
  return (dispatch) => {
    Ajax({
      api: 'serviceService',
    }, json => {
      console.log('getServiceService.response: ', json)
      if (json.code == 20000) {
        dispatch({
          type: GET_SERVICE_SERVICE_SUCCESS,
          data: json
        })
      } else if (json.code == 50002) {
        tokenInvalid()
      } else {
        message.error('错误信息: ' + json.error.errorMsg);
      }
    }, json => {
      message.error('服务器错误，请检查网络或重试');
      dispatch({
        type: GET_SERVICE_SERVICE_FAILED,
        data: json
      })
    })
  }
}

function getServiceBillList() {
  return (dispatch) => {
    Ajax({
      api: 'serviceBillList',
    }, json => {
      console.log('getServiceBillList.response: ', json)
      if (json.code == 20000) {
        dispatch({
          type: GET_SERVICE_BILL_LIST_SUCCESS,
          data: json
        })
      } else if (json.code == 50002) {
        tokenInvalid()
      } else {
        message.error('错误信息: ' + json.error.errorMsg);
      }
    }, json => {
      message.error('服务器错误，请检查网络或重试');
      dispatch({
        type: GET_SERVICE_BILL_LIST_FAILED,
        data: json
      })
    })
  }
}

function exportReport(parms) {
  var defaultParam = {},
    params = Object.assign({}, defaultParam, params);
  params = JSON.stringify(params);
  return (dispatch) => {
    const loadingEnd = message.loading('生成报表中...', 0)
    dispatch({
      type: EXPORT_REPORT
    })
    // if (hasToken()) {
    //   console.log('exportReport: ', params)
    //   const urlReport = 'http://192.168.1.235:7111/property/bill/export' + '?data=' + JSON.stringify(params) + '&token=' + getToken()
    //   window.open(urlReport)
    //   setTimeout(loadingEnd, 2000);
    //   setTimeout(() => message.success('报表导出成功', 3), 2500)
    //   console.log('urlReport: ', urlReport)
    // }
    Ajax({
      api: 'billExport',
      data: {
        data: params
      }
    }, json => {
      if (json.code == 50002) {
        setTimeout(loadingEnd, 2000);
        tokenInvalid()
      } else if (json.code == 50001) {
        setTimeout(loadingEnd, 2000);
        setTimeout(() => message.error('错误信息: ' + json.error.errorMsg), 2500)
      } else {
        // var aNode = document.createElement('a')
        // aNode.id = 'aNode'
        // aNode.href = json.data.down_url
        // aNode.target = '_blank'
        // aNode.click();
        window.open(json.data.down_url, '_self')
        setTimeout(loadingEnd, 1000);
        setTimeout(() => message.success('报表导出成功', 2), 1500)
        dispatch({
          type: EXPORT_REPORT_SUCCESS
        })
      }
    }, json => {
      setTimeout(loadingEnd, 2000);
      setTimeout(() => message.error('服务器错误，请检查网络或重试', 2), 2500)
    })
  }
}

export {getList, getListDetails, getServiceService, exportReport, getServiceBillList}
