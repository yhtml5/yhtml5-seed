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
      'website/ad/friend-link-list',
      {
        name: params.adName,
        page: params.tableCurrent,
        rows: 10,
      },
      resolve,
      resolve,
      (response) => {
        resolve()
        return dispatch(updateState({
          tableData: response.data.list,
          tableTotals: (response.data.totals) ? Number(response.data.totals) : 0
        }))
      }
    )
  )
}
//获取广告位类型
async function positionType(dispatch) {
  await new Promise((resolve) =>
    ajax(
      'website/ad/position-type',
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
      'website/ad/friend-link-del', {id: id}, resolve, resolve, resolve
    )
  )
}

async function ajaxEditStatus(id, status) {
  await new Promise((resolve) =>
    ajax(
      'website/ad/friend-link-edit-status', {id: id, status: status}, resolve, resolve, resolve
    )
  )
}

async function ajaxAddNav(values) {
  if (process.env.NODE_ENV !== 'production'){
  console.log('\n', values)
  }
  await new Promise((resolve) =>
    ajax(
      'website/ad/friend-link-add',
      {
        image: values.image,
        type: values.type,
        id: values.id,
        link_url: values.link_url,
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
      'website/ad/friend-link-view',
      {
        id: id
      },
      resolve, resolve,
      (response) => {
        if (response.data.image != "" ) {
          response.data.image = [{
            uid: -1,
            name: 'logo.png',
            status: 'done',
            url: (response.data.image) ? response.data.image : '',
          }];
          dispatch(updateState({
            isUpload: false,
            imgShow: true,
          }))
        }
        dispatch(updateState({
          image: response.data.image,
          type: response.data.type.toString(),
          link_url: response.data.link_url,
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
      'website/ad/friend-link-edit',
      {
        image: values.image,
        type: values.type,
        id: values.id,
        link_url: values.link_url,
        name: values.name,
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
