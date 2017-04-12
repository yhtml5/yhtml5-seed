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

async function ajaxUserList(params, dispatch) {
  await new Promise((resolve) => {
      dispatch(updateState({tableData: mock.data.lists, tableTotals: Number(mock.data.totals), tableCurrent: 1}))
      resolve()
    }
  )
}

export {ajaxUserList}
