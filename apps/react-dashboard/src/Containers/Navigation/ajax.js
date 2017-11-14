import ajax from  '../../util/ajax'
import {updateState} from './task'

/**
 * Todo Mapping Parameters
 *
 * @param {object} params
 * @param {function} dispatch
 */

const mock = {
  "code": 20000,
  "data": {
    "totals": "11",
    "lists": [
      {"id": "98", "amount": "0000", "trade_no": "JY-201707070003", "buyer_login_id": "http@gmail.com", "pay_status": "1", "note": "", "paid_at": "2017-03-24 15:40:33"},
      {"id": "97", "amount": "9999", "trade_no": "JY-201707070002", "buyer_login_id": "html5@gmail.com", "pay_status": "1", "note": "", "paid_at": "2017-03-24 15:40:33"},
      {"id": "96", "amount": "8888", "trade_no": "JY-201707070001", "buyer_login_id": "css@gmail.com", "pay_status": "1", "note": "\u6d4b\u8bd5", "paid_at": "2017-03-24 15:38:53"},
      {"id": "95", "amount": "8888", "trade_no": "JY-201707070001", "buyer_login_id": "css@gmail.com", "pay_status": "1", "note": "\u6d4b\u8bd5", "paid_at": "2017-03-24 15:38:53"},
      {"id": "94", "amount": "8888", "trade_no": "JY-201707070001", "buyer_login_id": "css@gmail.com", "pay_status": "1", "note": "\u6d4b\u8bd5", "paid_at": "2017-03-24 15:38:53"},
      {"id": "93", "amount": "8888", "trade_no": "JY-201707070001", "buyer_login_id": "css@gmail.com", "pay_status": "1", "note": "\u6d4b\u8bd5", "paid_at": "2017-03-24 15:38:53"},
      {"id": "92", "amount": "8888", "trade_no": "JY-201707070001", "buyer_login_id": "css@gmail.com", "pay_status": "1", "note": "\u6d4b\u8bd5", "paid_at": "2017-03-24 15:38:53"},
      {"id": "91", "amount": "8888", "trade_no": "JY-201707070001", "buyer_login_id": "css@gmail.com", "pay_status": "1", "note": "\u6d4b\u8bd5", "paid_at": "2017-03-24 15:38:53"},
      {"id": "90", "amount": "8888", "trade_no": "JY-201707070001", "buyer_login_id": "css@gmail.com", "pay_status": "1", "note": "\u6d4b\u8bd5", "paid_at": "2017-03-24 15:38:53"},
      {"id": "89", "amount": "8888", "trade_no": "JY-201707070001", "buyer_login_id": "css@gmail.com", "pay_status": "1", "note": "\u6d4b\u8bd5", "paid_at": "2017-03-24 15:38:53"},
      {"id": "88", "amount": "7777", "trade_no": "JY-201707070000", "buyer_login_id": "js@gmail.com", "pay_status": "1", "note": "\u6d4b\u8bd5", "paid_at": "2017-03-24 15:38:53"}
    ],
    "paid_amount": "0.02"
  },
  "error": ""
}

async function ajaxNavigationList(dispatch, params) {
  await new Promise((resolve) =>
    ajax(
      'website/nav/list',
      {
        name: params.searchName,
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

async function ajaxNavTypeList(dispatch, params) {
  await new Promise((resolve) =>
    ajax(
      'website/nav/get-types', {}, resolve, resolve,
      (response) => {
        resolve()
        return dispatch(updateState({
          navTypes: response.data,
        }))
      }
    )
  )
}

async function ajaxDeleteNav(id) {
  await new Promise((resolve) =>
    ajax(
      'website/nav/del', {id: id}, resolve, resolve, resolve
    )
  )
}

async function ajaxEditStatus(id, status) {
  await new Promise((resolve) =>
    ajax(
      'website/nav/edit-status', {id: id, status: status}, resolve, resolve, resolve
    )
  )
}

async function ajaxAddNav(values) {
  await new Promise((resolve, reject) =>
    ajax(
      'website/nav/add',
      {
        channel_id: values.modalChannel,
        link_url: values.modalLinkUrl,
        name: values.modalName,
        sort_order: values.modalSort,
        type: values.modalType,
      },
      reject, reject, resolve
    )
  )
}

async function ajaxEditNav(dispatch, values) {
  await new Promise((resolve, reject) =>
    ajax(
      'website/nav/edit',
      {
        channel_id: values.modalChannel,
        link_url: values.modalLinkUrl,
        name: values.modalName,
        id: values.modalId,
        sort_order: values.modalSort,
        type: values.modalType,
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
      'website/nav/view',
      {
        id: id
      },
      resolve, resolve,
      (response) => {
        dispatch(updateState({
          modalChannel: response.data.channel_id,
          modalId: response.data.id,
          modalLinkUrl: response.data.link_url,
          modalName: response.data.name,
          modalSort: response.data.sort_order,
          modalType: response.data.type,
        },))
        resolve()
      }
    )
  )
}

export {ajaxNavigationList, ajaxDeleteNav, ajaxEditStatus, ajaxAddNav, ajaxNavEditInfo, ajaxEditNav, ajaxNavTypeList}
