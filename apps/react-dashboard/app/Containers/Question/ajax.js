import ajax from  '../../util/ajax'
import reqwest from 'reqwest'
import {updateState} from './task'
import {changeSelectChannels} from '../App/task'
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
  console.log(params)
  await new Promise((resolve) =>
    ajax(
      'website/qa/list',
      {
        page: params.tableCurrent,
        rows: 10,
        channel_id: params.channel_id,
        column_id: params.column_id,
        serial_no: params.serial_no,
        is_reply: params.is_reply
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
      'website/qa/remove', {id: id}, resolve, resolve, resolve
    )
  )
}

async function ajaxEditStatus(id, status) {
  await new Promise((resolve) =>
    ajax(
      'website/qa/toggle', {id: id, status: status}, resolve, resolve, resolve
    )
  )
}

async function ajaxAddNav(values) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('\n', values)
  }

  await new Promise((resolve, reject) =>
    ajax(
      'website/qa/create',
      values,
      reject, reject, resolve
    )
  )
}
async function ajaxReply(values) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('\n', values)
  }
  await new Promise((resolve, reject) =>
    ajax(
      'website/qa/reply',
      values,
      reject, reject, resolve
    )
  )
}
async function ajaxNavEditInfo(dispatch, id) {
  console.log('\n', id)
  await new Promise((resolve) =>
    ajax(
      'website/qa/view',
      {
        id: id
      },
      resolve, resolve,
      (response) => {
        if (response.data.user_img != "") {
          response.data.user_img = [{
            uid: -1,
            name: 'logo.png',
            status: 'done',
            url: response.data.user_img,
          }];
          dispatch(updateState({
            isUpload: false
          }))
        }
        dispatch(changeSelectChannels(response.data.channel_id))
        dispatch(updateState({
          id: id,
          channel_id: response.data.channel_id,
          column_id: response.data.column_id == "0" ? "" : response.data.column_id,
          user_img: response.data.user_img,
          question_author: response.data.question_author,
          title: response.data.title,
          intro: response.data.intro,
          answer: response.data.answer,
          is_reco: response.data.is_reco,
          sort_order: response.data.sort_order,
        },))
        resolve()
      }
    )
  )
}

async function ajaxEditNav(values) {
  console.log('ajaxEditNav', values)
  await new Promise((resolve, reject) =>
    ajax(
      'website/qa/edit',
      values,
      reject, reject, resolve
    )
  )
}

export {ajaxAdList, ajaxDeleteNav, ajaxEditStatus, ajaxAddNav, ajaxNavEditInfo, ajaxEditNav, getUploadToken, positionType, ajaxReply}
