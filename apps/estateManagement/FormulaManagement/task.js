import {message} from 'antd';
import {ToggleFormulaAddModal, RenderFormulaList, UpdateState} from './action'
import {getCookie} from  '../../app/cookie'
import {ajax} from '../../app/ajax'
import {validator} from  '../../app/validator'

function toggleFormulaAddModal(status) {
  return {
    type: ToggleFormulaAddModal,
    payload: status
  }
}

function updateState(data) {
  if (validator.isObject(data)) {
    return {
      type: UpdateState,
      payload: data
    }
  } else {
    console.warn("the function updateState's parameter should be an object")
  }
}

function renderFormulaList(data) {
  return {
    type: RenderFormulaList,
    payload: data
  }
}

function getFormulaList(current) {
  if (!validator.isNumber(current)) {
    current = 1
  }
  return (dispatch, getState) => {
    dispatch(updateState({current}))
    ajax(
      'property/formula/list',
      {
        community_id: getCookie('_communityId'),
        page: getState().formulaManagement.current,
        rows: 8,
      },
      () => {
      },
      () => {
      },
      (response) => {
        dispatch(renderFormulaList(response.data))
      }
    )
  }
}

function deleteFormula(id, resolve, reject) {
  return dispatch => {
    ajax(
      'property/formula/delete',
      {
        formula_id: id,
      },
      () => {
        reject()
      },
      () => {
        reject()
      },
      (response) => {
        dispatch(getFormulaList())
        resolve()
      }
    )
  }
}

function submitFormula(formulaName, formula, callback) {
  return dispatch => {
    dispatch(updateState({submitButtonLoading: true}))
    ajax(
      'property/formula/add',
      {
        name: formulaName,
        formula: formula.toLowerCase(),
        community_id: getCookie('_communityId')
      },
      () => {
        dispatch(updateState({submitButtonLoading: false}))
      },
      () => {
        dispatch(updateState({submitButtonLoading: false}))
      },
      () => {
        message.success('保存成功', 2);
        setTimeout(() => {
          callback()
        }, 1000)
        dispatch(updateState({submitButtonLoading: false}))
      }
    )
  }
}

export {toggleFormulaAddModal, submitFormula, getFormulaList, deleteFormula}
