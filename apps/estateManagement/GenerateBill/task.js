import {message, notification} from 'antd';
import {Router, Route} from 'react-router';
import {UpdateState, UpdateBuildings} from './action'
import {getCookie} from  '../../app/cookie'
import {ajax} from '../../app/ajax'
import {validator} from  '../../app/validator'
import {isBuildingsEmpty} from  './util'
import {history} from '../../store/index'

function updateState(data) {
  return {
    type: UpdateState,
    payload: data
  }
}

function initializeGenerateBill(value) {
  return (dispatch, getState) => {
    switch (value) {
      case 'step1':
        dispatch(updateState({
          step: 0
        }))
        dispatch(ajaxGetBuildings())
        dispatch(ajaxDetectionBill())
        break
      case 'step2':
        dispatch(updateState({
          step: 1
        }))
        if (isBuildingsEmpty(getState().generateBill.buildings2)) {
          history.push('/generateBill/step1')
        }
        dispatch(ajaxGetFormulas())
        dispatch(ajaxGetService())
        dispatch(ajaxDetectionBill())
        break
      case 'step3':
        dispatch(updateState({
          step: 2
        }))
        dispatch(ajaxViewBill())
        break
      case 'bill':
        dispatch(ajaxViewBill())
        break
      default:
        break
    }
  }
}

/*======  ajax  ======*/

function ajaxViewBill() {
  return (dispatch, getState) => {
    dispatch(updateState({
      tableLoading: true,
    }))
    ajax(
      'property/formula/look-bill',
      {
        task_id: getState().generateBill.taskId,
        page: getState().generateBill.tableCurrent,
        rows: getState().generateBill.tableRow,
      },
      () => {
        dispatch(updateState({
          tableLoading: false,
        }))
      },
      () => {
        dispatch(updateState({
          tableLoading: false,
        }))

        // notification['info']({
        //   key: 'isTask',
        //   message: '',
        //   description: '账单获取失败请，重新处理',
        //   duration: 18,
        // })

        if (history.getCurrentLocation().pathname != '/generateBill/bill') {
          history.push('/generateBill/step1')
        } else {
          history.push('/propertyPayment')
        }

      },
      (response) => {
        if (response.data.totals == 0) {
          notification['info']({
            key: 'empty',
            message: '提示',
            description: '账单已存在',
            duration: 4,
          })
        }
        dispatch(updateState({
          tableData: response.data.list,
          tableLoading: false,
          tableTotals: Number(response.data.totals),
          tableAmount: (response.data.entry_amount) ? response.data.entry_amount : 0
        }))
      }
    )
  }
}

function ajaxDetectionBill() {
  return (dispatch, getState) => {
    dispatch(updateState({
      tableLoading: true,
    }))
    ajax(
      'property/formula/confirm-bill',
      {
        community_id: getCookie('_communityId')
      }, () => {
      }, () => {
      }, (response) => {
        dispatch(updateState({
          isTask: response.data.is_confirm,
          taskId: (response.data.task_id) ? response.data.task_id : '',
          tableCurrent: 1,
        }))
        if (getState().generateBill.isTask == 'yes') {
          history.push('/generateBill/step3')
          // notification['warning']({
          //   key: 'isTask',
          //   message: '您还有未发布的账单,请操作',
          //   description: '',
          //   duration: 3,
          // })
        }
      }
    )
  }
}
function ajaxBillStatusList() {
  return (dispatch, getState) => {
    dispatch(updateState({}))
    ajax(
      'property/bill/get-status', '',
      () => {
      },
      () => {
      },
      (response) => {
        dispatch(updateState({
          searchSelectStatus: response.data
        }))
      }
    )
  }
}


function ajaxGetFormulas() {
  return (dispatch, getState) => {
    dispatch(updateState({step2SelectFormulaLoading: true}))
    ajax(
      'property/formula/list',
      {
        community_id: getCookie('_communityId'),
        page: 1,
        rows: 100,
      },
      () => {
        dispatch(updateState({step2SelectFormulaLoading: false}))
      },
      () => {
        dispatch(updateState({step2SelectFormulaLoading: false}))
      },
      (response) => {
        dispatch(updateState({
          formFormulas: response.data.list,
          step2SelectFormulaLoading: false
        }))
      }
    )
  }
}

function ajaxGetService() {
  return (dispatch, getState) => {
    dispatch(updateState({step2SelectProjectLoading: true}))
    ajax(
      'property/service/community-service',
      {
        community_id: getCookie('_communityId'),
      },
      () => {
        dispatch(updateState({step2SelectProjectLoading: false}))
      },
      () => {
        dispatch(updateState({step2SelectProjectLoading: false}))
      },
      (response) => {
        dispatch(updateState({
          formProjects: response.data,
          step2SelectProjectLoading: false
        }))
      }
    )
  }
}

function ajaxGetBuildings() {
  return (dispatch, getState) => {
    dispatch(updateState({
      selectorsLoading: true,
      buildings: []
    }))
    ajax(
      'property/formula/get-buildings',
      {
        community_id: getCookie('_communityId')
      },
      () => {
        dispatch(updateState({
          selectorsLoading: false,
        }))
      },
      () => {
        dispatch(updateState({
          selectorsLoading: false,
        }))
      },
      (response) => {
        dispatch(updateState({
          buildings: response.data,
          selectorsLoading: false
        }))
      }
    )
  }
}

/*======  step1  ======*/

function generateBill() {
  return (dispatch, getState) => {
    history.push('/generateBill/step1')
  }
}

function toStep2() {
  return (dispatch, getState) => {
    let newBuildings2 = getState().generateBill.buildings2

    function changeArray(array) {
      for (let i = 0; i < array.length; i++) {
        array[i].children.map((value, index) => {
          array[i].children[index] = {name: value};
        })
      }
    }

    changeArray(newBuildings2)
    dispatch(updateState({buildings2: newBuildings2}))
    history.push('/generateBill/step2')
  }
}

/*======  step2  ======*/

function backStep1() {
  return (dispatch) => {
    dispatch(updateState({buildings2: []}))
    history.push('/generateBill/step1')
  }
}

function toStep3(data) {
  let timeStart = '';
  let timeEnd = '';
  if (validator.isArrayNotEmpty(data.formTime)) {
    timeStart = data.formTime[0].format('YYYY-MM-DD')
    timeEnd = data.formTime[1].format('YYYY-MM-DD')
  }
  return (dispatch, getState) => {
    dispatch(updateState({
      formName: data.formName,
      formProjectId: data.formProjectId,
      formFormulaId: data.formFormulaId,
      formTimeStart: timeStart,
      formTimeEnd: timeEnd,
      step2ButtonNextLoading: true
    }))

    let params = getState().generateBill

    ajax(
      'property/formula/bill',
      {
        community_id: getCookie('_communityId'),
        acct_period_start: params.formTimeStart,
        acct_period_end: params.formTimeEnd,
        buildings: params.buildings2,
        cost_type: params.formProjectId,
        formula_id: params.formFormulaId,
      },
      () => {
        dispatch(updateState({step2ButtonNextLoading: false}))
      },
      () => {
        dispatch(updateState({step2ButtonNextLoading: false}))
        history.push('/propertyPayment')
      },
      (response) => {
        dispatch(updateState({
          taskId: response.data.task_id,
          step2ButtonNextLoading: false
        }))
        history.push('/generateBill/step3')
      }
    )
  }
}

function updateBuildings(data) {
  return (dispatch, getState) => {
    var arr = getState().generateBill.buildings2
    var newBuildings = []
    var repeatIndex = 0

    function contains() {
      var i = arr.length;
      console.log('i', i)
      while (i--) {
        if (arr[i].index === data.index) {
          console.log('if: ', i)
          return repeatIndex = i
        }
      }
      return false;
    }

    if (validator.isNumber(contains())) {
      arr.splice(repeatIndex, 1)
      newBuildings = arr.concat(data)
      console.warn('isNumber', newBuildings)
    } else {
      newBuildings = arr.concat(data)
      console.warn('noNumber', newBuildings)
    }
    dispatch(updateState({buildings2: newBuildings}))
  }
}

/*======  step3  ======*/

function publishBill() {
  return (dispatch, getState) => {
    dispatch(updateState({step3ButtonConfirmLoading: true}))
    ajax(
      'property/formula/release-bill',
      {
        community_id: getCookie('_communityId'),
        task_id: getState().generateBill.taskId,
      },
      () => {
        dispatch(updateState({step3ButtonConfirmLoading: false}))
      },
      () => {
        dispatch(updateState({step3ButtonConfirmLoading: false}))
        history.push('/propertyPayment')
      },
      (response) => {
        dispatch(updateState({
          step3ButtonConfirmLoading: false,
          taskId: ''
        }))
        message.destroy()
        message.success('账单发布成功', 3)
        history.push('/propertyPayment')
      }
    )
  }
}

function cancelGenerateBill() {
  return (dispatch, getState) => {
    dispatch(updateState({step3ButtonCancelLoading: true}))
    ajax(
      'property/bill/recall-bill',
      {
        task_id: getState().generateBill.taskId,
      },
      () => {
        dispatch(updateState({step3ButtonCancelLoading: false}))
      },
      () => {
        dispatch(updateState({step3ButtonCancelLoading: false}))
        history.push('propertyPayment')
      },
      (response) => {
        dispatch(updateState({
          step3ButtonCancelLoading: false,
          buildings2: [],
          taskId: ''
        }))
        // message.success('账单取消成功', 3)
        if (history.getCurrentLocation().pathname != '/generateBill/bill') {
          history.push('/generateBill/step1')
        } else {
          history.push('/propertyPayment')
        }
      }
    )
  }
}

function changePage(current) {
  return (dispatch, getState) => {
    dispatch(updateState({tableCurrent: current}))
    dispatch(ajaxViewBill())
  }
}

export {
  ajaxGetBuildings, ajaxGetFormulas, ajaxGetService, ajaxViewBill, ajaxDetectionBill, ajaxBillStatusList, updateState,
  initializeGenerateBill, updateBuildings, changePage, backStep1, toStep2, toStep3, generateBill, cancelGenerateBill, publishBill
}
