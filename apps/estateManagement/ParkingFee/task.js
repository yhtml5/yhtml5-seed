import {message} from 'antd';
import {RenderTable, UpdateState} from './action'
import {getCookie} from  '../../app/cookie'
import {ajax} from '../../app/ajax'
import {validator} from  '../../app/validator'
import {downLoad} from '../../app/util'

function renderTable(data) {
  return {
    type: RenderTable,
    payload: data
  }
}

function updateState(data) {
  return {
    type: UpdateState,
    payload: data
  }
}

function ajaxExportBill() {
  return (dispatch, getState) => {
    let params = getState().parkingFee
    console.warn(params)
    ajax(
      'property/bill/park-export',
      {
        community_id: getCookie('_communityId'),
        paid_start_time: params.timeStart,
        paid_end_time: params.timeEnd,
        trade_no: params.number,
      },
      () => {
        dispatch(updateState({
          tableExportLoading: false
        }))
      },
      () => {
        dispatch(updateState({
          tableExportLoading: false
        }))
      },
      (response) => {
        downLoad(response.data.down_url)
        // location.href = response.data.down_url;
        message.success('报表数据已生成!');
        dispatch(updateState({
          tableExportLoading: false,
        }))
      }
    )
  }
}

function ajaxParkingFee(dispatch, parkingFee) {
  dispatch(updateState({list: []}))
  ajax(
    'property/bill/park-list',
    {
      community_id: getCookie('_communityId'),
      trade_no: parkingFee.number,
      paid_start_time: parkingFee.timeStart,
      paid_end_time: parkingFee.timeEnd,
      page: parkingFee.current,
      rows: 10
    },
    () => {
      // dispatch(toggleSubmitButtonLoading(false))
    },
    () => {
      // dispatch(toggleSubmitButtonLoading(false))
    },
    (response) => {
      dispatch(renderTable(response.data))
    }
  )
}

function changePage(current) {
  return (dispatch, getState) => {
    dispatch(updateState({current, tableLoading: true}))
    ajaxParkingFee(dispatch, getState().parkingFee)
  }
}

function searchParkingFee(number, timeStart, timeEnd, callback) {
  if (!validator.isString(number)) {
    number = ''
  }
  if (!validator.isString(timeStart)) {
    timeStart = ''
  }
  if (!validator.isString(timeEnd)) {
    timeEnd = ''
  }
  return (dispatch, getState) => {
    dispatch(updateState({number, timeStart, timeEnd, current: 1, tableLoading: true}))
    ajaxParkingFee(dispatch, getState().parkingFee)
  }
}

function exportBill() {
  return (dispatch, getState) => {
    dispatch(updateState({tableExportLoading: true}))
    dispatch(ajaxExportBill())
  }
}


export {searchParkingFee, changePage, exportBill}
