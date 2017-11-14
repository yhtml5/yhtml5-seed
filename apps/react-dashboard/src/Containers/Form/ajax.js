import ajax from '../../util/ajax'
import { updateState } from './task'

/* ===== index =====*/

const ajaxList = (dispatch, params) =>
  new Promise((resolve, reject) =>
    ajax(
      'website/package/list', {}, reject, reject,
      (response) => {
        resolve()
        dispatch(updateState({
          tableData: response.data.list,
          tableTotals: (response.data.totals) ? Number(response.data.totals) : 0
        }))
      }
    )
  )

const ajaxToggleStatus = (id, status) =>
  new Promise((resolve, reject) =>
    ajax(
      'website/package/edit-status', {
        package_id: id,
        status: status
      },
      reject, reject, resolve
    )
  )

/* ===== add/edit =====*/

const ajaxAdd = (dispatch, values) =>
  new Promise((resolve, reject) =>
    ajax(
      'website/package/add', {
        image: (values.formImage) ? values.formImage[0] : '',
        name: values.formName,
        quota: values.formQuota,
        sort_order: values.formSort,
        surplus: values.formSurplus,
        unit_price: values.formPrice,
      },
      reject, reject,
      (response) => {
        dispatch(updateState({
          packageId: String(response.data.package_id),
        }))
        resolve()
      }
    )
  )

const ajaxEditInfo = (dispatch, id) =>
  new Promise((resolve, reject) =>
    ajax(
      'website/package/view', {
        package_id: id
      },
      reject, reject,
      (response) => {
        dispatch(updateState({
          formName: response.data.name,
          formSort: response.data.sort_order,
          formImage: response.data.image ? [response.data.image] : [],
          formPrice: response.data.unit_price,
          formQuota: response.data.quota,
          formSurplus: response.data.surplus,
          columnsStyles: response.data.columns,
          formStatus: response.data.status,
          formIsReco: response.data.is_reco,
          formSaveLoading: false,
          formAddColumnLoading: false,
        }))
        resolve()
      }
    )
  )

const ajaxEdit = (dispatch, value) =>
  new Promise((resolve, reject) =>
    ajax(
      'website/package/edit', {
        package_id: value.id,
        name: value.formName,
        image: (value.formImage) ? value.formImage[0] : '',
        quota: value.formQuota,
        sort_order: value.formSort,
        surplus: value.formSurplus,
        unit_price: value.formPrice,
      },
      reject, reject, resolve
    )
  )

export {
  ajaxList,
  ajaxToggleStatus,
  ajaxAdd,
  ajaxEdit,
  ajaxEditInfo,
}