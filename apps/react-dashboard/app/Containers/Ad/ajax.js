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
      'website/ad/list',
      {
        ad_position_id: params.adBlow,
        name: params.adName,
        page: params.tableCurrent,
        rows: 10,
        serial_no: params.adNum,
        status:params.adStatus
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
 //所属广告位下拉菜单
async function adBlowList(dispatch) {
  await new Promise((resolve) =>
    ajax(
      'website/ad/positions',
      {},
      resolve,
      resolve,
      (response) => {
        resolve()
        return dispatch(updateState({
          adBlowOptions: response.data,
        }))
      }
    )
  )
}
//图片上传token
async function getUploadToken(dispatch){
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
      'website/ad/del', {id: id}, resolve, resolve, resolve
    )
  )
}

async function ajaxEditStatus(id, status) {
  await new Promise((resolve) =>
    ajax(
      'website/ad/edit-status', {id: id, status: status}, resolve, resolve, resolve
    )
  )
}

async function ajaxAddNav(values) {
  console.log('\n', values)
  await new Promise((resolve) =>
    ajax(
      'website/ad/add',
      {
        ad_position_id: values.ad_position_id,
        id: values.id,
        img_url: values.img_url,
        link_url: values.link_url,
        name: values.name,
        sort_order: values.sort_order,
        status: values.status,
      },
      resolve, resolve, resolve
    )
  )
}

async function ajaxNavEditInfo(dispatch, id) {
  console.log('\n', id)
  await new Promise((resolve) =>
    ajax(
      'website/ad/view',
      {
        id: id
      },
      resolve, resolve,
      (response) => {
        if(response.data.img_url!=""){
          response.data.img_url=[{
            uid: -1,
            name: 'logo.png',
            status: 'done',
            url:response.data.img_url,
          }];
          dispatch(updateState({
            isUpload:false
          }))
        }
        dispatch(updateState({
          ad_position_id: response.data.ad_position_id.toString(),
          img_url: response.data.img_url,
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
  console.log('ajaxEditNav', values)
  await new Promise((resolve) =>
    ajax(
      'website/ad/edit',
      {
        ad_position_id: values.ad_position_id,
        id: values.id,
        img_url: values.img_url,
        link_url: values.link_url,
        name: values.name,
        sort_order: values.sort_order,
        status: values.status,
      },
      resolve, resolve, resolve
    )
  )
}

export {ajaxAdList, ajaxDeleteNav, ajaxEditStatus, ajaxAddNav, ajaxNavEditInfo, ajaxEditNav,adBlowList,getUploadToken}
