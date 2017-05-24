import ajax from  '../../util/ajax'
import reqwest from 'reqwest'
import {updateState} from './task'
import {message} from 'antd'
import {config} from '../../config.js'
import {getCookie} from '../../util/cookie.js'
let {cookie} = config()

/**
 * Todo Mapping Parameters
 *
 * @param {object} params
 * @param {function} dispatch
 */

async function ajaxAdList(dispatch, params) {
  await new Promise((resolve) =>
    ajax(
      'website/wxgroup/list',
      {
        name: params.wxname,
      },
      resolve,
      resolve,
      (response) => {
        resolve()
        return dispatch(updateState({
          tableData: response.data.list,
        }))
      }
    )
  )
}
//获取广告位类型
async function positionType(dispatch) {
  await new Promise((resolve) =>
    ajax(
      'website/wxgroup/locations',
      {},
      resolve,
      resolve,
      (response) => {
        resolve()
        return dispatch(updateState({
          positionType: response.data,
        }))
      }
    )
  )
}
//图片上传token
async function getUploadToken(dispatch) {
  await new Promise((resolve) =>
    reqwest({
      url: "http://112.17.251.92:8080/apiserver/api/qiNiuUpToken",
      type: 'json',
      method: 'get',
      data: {
        'username': "yaoping",
        'password': "123456",
        'token': getCookie(cookie.token)
      },
      contentType: 'application/json',
      error: function (error) {
        // message.destroy()
        message.error('网络异常, http状态码：' + error.status, 3);

      },
      success: function (response) {
        // message.destroy()
        if (response.errorcode == "0") {
          return dispatch(updateState({
            uploadToken: response.data,
          }))
        } else if (Number(response.code) === 50002) {
          message.info('当前登录状态已失效，2秒后自动将跳转到登录页...', 3)
          setTimeout(() => {
            history.push("/")
          }, 2000)
        } else {
          message.error((response.message) ? response.message : '网络异常')

        }
      }
    })
  )
}
async function ajaxDeleteNav(id) {
  await new Promise((resolve) =>
    ajax(
      'website/wxgroup/remove', {id: id}, resolve, resolve, resolve
    )
  )
}

async function ajaxEditStatus(id, status) {
  await new Promise((resolve) =>
    ajax(
      'website/wxgroup/toggle', {id: id, status: status}, resolve, resolve, resolve
    )
  )
}

async function ajaxAddNav(values) {
  if (process.env.NODE_ENV !== 'production'){
  console.log('\n', values)
  }
  await new Promise((resolve) =>
    ajax(
      'website/wxgroup/create',
      {
        intro: values.intro,
        qr_code: values.qr_code,
        page_id: values.page_id,
        name: values.name,
        status: values.status,
        sort_order: values.sort_order,
      },
      resolve, resolve, resolve
    )
  )
}

async function ajaxNavEditInfo(dispatch, id) {
  if (process.env.NODE_ENV !== 'production'){
  console.log('\n', id)
  }
  await new Promise((resolve) =>
    ajax(
      'website/wxgroup/view',
      {
        id: id
      },
      resolve, resolve,
      (response) => {
        if (response.data.qr_code != null ) {
          response.data.qr_code = [{
            uid: -1,
            name: 'logo.png',
            status: 'done',
            url: (response.data.qr_code) ? response.data.qr_code : '',
          }];
          dispatch(updateState({
            isUpload: false,
          }))
        }
        dispatch(updateState({
          intro: response.data.intro,
          qr_code: response.data.qr_code,
          page_id: response.data.page_id,
          name: response.data.name,
          sort_order: response.data.sort_order,
          status: response.data.status,
        },))
        resolve()
      }
    )
  )
}

async function ajaxEditNav(dispatch, values) {
  if (process.env.NODE_ENV !== 'production'){
  console.log('ajaxEditNav', values)
  }
  await new Promise((resolve) =>
    ajax(
      'website/wxgroup/edit',
      {
        intro: values.intro,
        name: values.name,
        id: values.id,
        page_id: values.page_id,
        qr_code: values.qr_code,
        status: values.status,
        sort_order:values.sort_order,
      },
      resolve, resolve, resolve
    )
  )
}

export {
  ajaxAdList,
  ajaxDeleteNav,
  ajaxEditStatus,
  ajaxAddNav,
  ajaxNavEditInfo,
  ajaxEditNav,
  getUploadToken,
  positionType
}
