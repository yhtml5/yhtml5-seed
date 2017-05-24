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
      'website/ad/position-list',
      {
        name: params.adName,
        page: params.tableCurrent,
        rows: 10,
        serial_no: params.adNum,
        type: params.adStatus
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
      'website/adPlacement/del', {id: id}, resolve, resolve, resolve
    )
  )
}

async function ajaxEditStatus(id, status) {
  await new Promise((resolve) =>
    ajax(
      'website/ad/position-edit-status', {id: id, status: status}, resolve, resolve, resolve
    )
  )
}

async function ajaxAddNav(values) {
  await new Promise((resolve,reject) =>
    ajax(
      'website/ad/position-add',
      {
        ad_size: values.ad_size,
        type: values.type,
        id: values.id,
        img_url: values.img_url,
        name: values.name,
        status: values.status,
      },
      reject, reject, resolve
    )
  )
}

async function ajaxNavEditInfo(dispatch, id) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('\n', id)
  }
  await new Promise((resolve) =>
    ajax(
      'website/ad/position-view',
      {
        id: id
      },
      resolve, resolve,
      (response) => {
        response.data.img_url = [{
          uid: -1,
          name: 'logo.png',
          status: 'done',
          url: response.data.img_url,
        }];
        if (response.data.img_url != "") {
          dispatch(updateState({
            isUpload: false
          }))
        }
        dispatch(updateState({
          ad_size: response.data.ad_size.toString(),
          type: response.data.type.toString(),
          img_url: response.data.img_url,
          name: response.data.name,
          serial_no: response.data.serial_no,
          status: response.data.status,
        },))
        resolve()
      }
    )
  )
}

async function ajaxEditNav(dispatch, values) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('ajaxEditNav', values)
  }
  await new Promise((resolve) =>
    ajax(
      'website/ad/position-edit',
      {
        ad_size: values.ad_size,
        type: values.type,
        id: values.id,
        img_url: values.img_url,
        name: values.name,
        status: values.status,
      },
      resolve, resolve, resolve
    )
  )
}

export {ajaxAdList, ajaxDeleteNav, ajaxEditStatus, ajaxAddNav, ajaxNavEditInfo, ajaxEditNav, getUploadToken, positionType}
