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
  await new Promise((resolve) =>
    ajax(
      'website/article/list',
      {
        name: params.adName,
        page: params.tableCurrent,
        rows: 10,
        channel_id:params.searchchannelid,
        id: params.adNum,
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
async function ajaxlabelList(dispatch, params) {
  await new Promise((resolve) =>
    ajax(
      'website/channel/label-view',
      {
        channel_id:params.channel_id,
        column_id:params.column_id
      },
      resolve,
      resolve,
      (response) => {
        resolve()
        return dispatch(updateState({
          labellist: response.data.labels,
        }))
      }
    )
  )
}
//获取广告位类型
async  function positionType(dispatch) {
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
      'website/article/remove', {id: id}, resolve, resolve, resolve
    )
  )
}

async function ajaxEditStatus(id, status) {
  await new Promise((resolve) =>
    ajax(
      'website/article/toggle', {id: id, status: status}, resolve, resolve, resolve
    )
  )
}

async function ajaxAddNav(values) {
  if (process.env.NODE_ENV !== 'production') {
  console.log('\n', values)
  }
  await new Promise((resolve,reject) =>
    ajax(
      'website/article/create',
      values,
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
      'website/article/view',
      {
        id: id
      },
      resolve, resolve,
      (response) => {
        if (process.env.NODE_ENV !== 'production') {
        console.log(response.data)
        }
        if(response.data.image!=""){
          response.data.image=[{
            uid: -1,
            name: 'logo.png',
            status: 'done',
            url:response.data.image,
          }];
          dispatch(updateState({
            isUpload:false
          }))
        }
        ajaxlabelList(dispatch,{channel_id:response.data.channel_id,column_id:response.data.column_id})
        dispatch(changeSelectChannels(response.data.channel_id))
        var label_ids=[];
        for (var i=0;i<response.data.labels.length;i++){
          label_ids.push(response.data.labels[i].id)
        }
        dispatch(updateState({
          id:id,
          channel_id: response.data.channel_id,
          column_id: response.data.column_id=="0"?"":response.data.column_id,
          image: response.data.image,
          intro: response.data.intro,
          is_reco: response.data.is_reco,
          keywords: response.data.keywords,
          name: response.data.name,
          shows: response.data.shows,
          summary: response.data.summary,
          label_ids: label_ids,
          sort_order:response.data.sort_order
        },))
        resolve()
      }
    )
  )
}

async function ajaxEditNav(values) {
  if (process.env.NODE_ENV !== 'production') {
  console.log('ajaxEditNav', values)
  }
  await new Promise((resolve,reject) =>
    ajax(
      'website/article/edit',
      values,
      reject, reject, resolve
    )
  )
}

export {ajaxAdList, ajaxDeleteNav, ajaxEditStatus, ajaxAddNav, ajaxNavEditInfo, ajaxEditNav,getUploadToken,positionType,ajaxlabelList}
