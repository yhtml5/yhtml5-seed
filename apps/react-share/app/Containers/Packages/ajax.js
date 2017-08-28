import ajax from '../../util/ajax'
import { updateState } from './task'
import { updateState as updateAppState } from '../App/task'

/* ===== index =====*/

async function ajaxList(dispatch, params) {
  await new Promise((resolve, reject) =>
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
}

async function ajaxToggleStatus(id, status) {
  await new Promise((resolve, reject) =>
    ajax(
      'website/package/edit-status', {
        package_id: id,
        status: status
      },
      reject, reject, resolve
    )
  )
}

async function ajaxToggleRecommendation(id, status) {
  await new Promise((resolve, reject) =>
    ajax(
      'website/package/edit-record-status', {
        package_id: id,
        is_reco: status
      },
      reject, reject, resolve
    )
  )
}

async function ajaxPreview(dispatch, id) {
  await new Promise((resolve, reject) =>
    ajax(
      'website/package/preview-url', {
        package_id: id
      },
      reject, reject,
      (response) => {
        dispatch(updateState({
          previewUrl: response.data.preview_url
        }))
        resolve()
      }
    )
  )
}

/* ===== add =====*/

async function ajaxAdd(dispatch, values) {
  await new Promise((resolve, reject) =>
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
}

/* ===== edit =====*/

async function ajaxEditInfo(dispatch, id) {
  await new Promise((resolve, reject) =>
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
}

async function ajaxEdit(dispatch, value) {
  await new Promise((resolve, reject) =>
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
}

/* ===== column =====*/

async function ajaxColumnStyles(dispatch) {
  await new Promise((resolve, reject) =>
    ajax(
      'website/package/style-list', {}, reject, reject,
      (response) => {
        dispatch(updateState({
          modalColumnsStyles: response.data,
        }))
        resolve()
      }
    )
  )
}

async function ajaxAddColumn(dispatch, value) {
  (process.env.NODE_ENV === 'production') || console.log('ajaxAddColumn', value)

  await new Promise((resolve, reject) =>
    ajax(
      'website/package/add-column', {
        package_id: value.packageId,
        type_id: value.formColumnTypeId,
        c_name: value.formName,
        sort_order: value.formSort,
        n_name: value.formNav,
        content: value.formIntro,
        sub_title: value.formSubTitle,
        items: value.items,
        image_url: (value.formVideoImage) ? value.formVideoImage : '',
        video_url: value.formVideoUrl,
      },
      reject, reject,
      (response) => {

        //findIndex,updated

        const getColumnsStyles = () => {
          let arr = value.columnsStyles.concat([])
          return arr.map((v, index) => {
            if (v.id === value.formId) {
              v.id = response.data.column_id
              v.c_name = value.formName
              v.n_name = value.formNav
              v.content = value.formIntro
              v.sort_order = value.formSort
              v.sub_title = value.formSubTitle
              v.items = value.items
              v.image_url = value.formVideoImage
              v.video_url = value.formVideoUrl
              v.buttonOkDisabled = false
              return v
            } else {
              return v
            }
          })
        }

        console.log(value.columnsStyles, getColumnsStyles())

        dispatch(updateState({
          columnsStyles: getColumnsStyles()
        }))
        resolve()
      }
    )
  )
}

async function ajaxEditColumn(dispatch, value) {
  (process.env.NODE_ENV === 'production') || console.log('ajaxAddColumn', value)
  await new Promise((resolve, reject) =>
    ajax(
      'website/package/edit-column', {
        package_id: value.packageId,
        column_id: value.formId,
        type_id: value.formColumnTypeId,
        c_name: value.formName,
        sort_order: value.formSort,
        n_name: value.formNav,
        content: value.formIntro,
        sub_title: value.formSubTitle,
        items: value.items,
        image_url: (value.formVideoImage) ? value.formVideoImage : '',
        video_url: value.formVideoUrl,
      },
      reject, reject,
      (response) => {
        const getColumnsStyles = () => {
          let arr = value.columnsStyles.concat([])
          return arr.map((v, index) => {
            if (v.id === value.formId) {
              v.id = response.data.column_id
              v.c_name = value.formName
              v.n_name = value.formNav
              v.content = value.formIntro
              v.sort_order = value.formSort
              v.sub_title = value.formSubTitle
              v.items = value.items
              v.image_url = value.formVideoImage
              v.video_url = value.formVideoUrl
              v.buttonOkDisabled = false
              return v
            } else {
              return v
            }
          })
        }

        console.log(value.columnsStyles, getColumnsStyles())

        dispatch(updateState({
          columnsStyles: getColumnsStyles()
        }))
        resolve()
      }
    )
  )
}

async function ajaxDeleteColumn(value) {
  await new Promise((resolve, reject) =>
    ajax(
      'website/package/del-column', {
        column_id: value,
      },
      reject, reject, resolve
    )
  )
}


export {
  ajaxList,
  ajaxPreview,
  ajaxToggleStatus,
  ajaxToggleRecommendation,
  ajaxColumnStyles,
  ajaxAddColumn,
  ajaxEditColumn,
  ajaxDeleteColumn,
  ajaxAdd,
  ajaxDeleteLive,
  ajaxEditInfo,
  ajaxEdit,
}