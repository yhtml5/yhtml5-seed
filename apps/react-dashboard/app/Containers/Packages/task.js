import { message } from 'antd'
import { config } from '../../config'
import { history } from '../../redux/store'
import { isObject ,isArrayEmpty} from '../../util/validator'
import { UpdateState } from './action'
import {
  ajaxList,
  ajaxToggleStatus,
  ajaxToggleRecommendation,
  ajaxPreview,
  ajaxColumnStyles,
  ajaxAddColumn,
  ajaxEditColumn,
  ajaxDeleteColumn,
  ajaxAdd,
  ajaxEditInfo,
  ajaxEdit
} from './ajax'
const { title, subTitle } = config()

/* ===== base =====*/

function updateState(data) {
  if (isObject(data)) {
    return {
      type: UpdateState,
      payload: data
    }
  } else {
    console.error('action updateState params must be a object')
  }
}

const init = (value) =>
  async (dispatch, getState) => {
    process.env.NODE_ENV === 'production' || console.log('initPackages', getState())
    const params = getState().packages
    const params2 = getState().app

    if (isArrayEmpty(params.modalColumnsStyles)) {
      ajaxColumnStyles(dispatch)
        .catch((err) => console.error(err))
    }

    switch (value) {
      case 'add':
        dispatch(updateState({
          formType: 'add',
          formStatus: undefined,
          formIsReco: undefined,
          headerPreviewDisabled: true,
          headerOnlineDisabled: true,
          headerRecommendDisabled: true,
          modalColumsId: undefined,
          columnsStyles: []
        }))
        break
      case 'edit':
        if (!params.formId) {
          console.warn(params.formId, !params.formId)
          setTimeout(() => history.push('/packages'))
          return
        }
        dispatch(checkColumn())
        dispatch(updateState({
          formType: 'edit',
          //headerPreviewDisabled: false,
          //headerOnlineDisabled: false,
          //headerRecommendDisabled: false,
          modalColumsId: undefined,
        }))
        break
      default:
        dispatch(updateState({
          tableLoading: true
        }))
        await ajaxList(dispatch, {
          ...params,
          ...params2
        }).catch((err) => console.error(err))

        dispatch(updateState({
          tableLoading: false,
          columnsStyles: [],
          formId: false,
          packageId: '',
          formType: 'default',
          formStatus: undefined,
          formIsReco: undefined,
          formName: '',
          formSort: '',
          formImage: [],
          formPrice: '',
          formQuota: '',
          formSurplus: '',
          formSaveLoading: false,
          formSaveDisabled: false,
          formAddColumnLoading: false,
        }))
        break
    }
  }

/* ===== index =====*/

const preview = (id) =>
  async (dispatch, getState) => {
    process.env.NODE_ENV === 'production' || console.log('preview', id)
    const params = getState().packages

    await ajaxPreview(dispatch, id ? id : getState().packages.packageId)
      .catch((err) => console.error(err))

    const url = getState().packages.previewUrl

    console.log('end', url)
    if (url) {
      window.open(url)
    }
  }

const toggleRecommendation = (id, status) =>
  async (dispatch, getState) => {
    process.env.NODE_ENV === 'production' || console.log('toggleRecommendation', id, status)
    const params = getState().packages
    const type = getState().packages.formType

    await ajaxToggleRecommendation(id, status)
      .catch((err) => console.error(err))

    if (history.location.pathname === '/packages') {
      dispatch(updateState({
        tableLoading: true
      }))
      await ajaxList(dispatch, {
        ...params
      })
        .catch((err) => console.error(err))
      dispatch(updateState({
        tableLoading: false
      }))
    }

    if (type === 'edit' || type === 'add') {
      await ajaxEditInfo(dispatch, id)
        .catch((err) => console.error(err))
    }
  }

const toggleStatus = (id, status) =>
  async (dispatch, getState) => {
    process.env.NODE_ENV === 'production' || console.log('toggleStatus', id, status)
    const params = getState().packages
    const type = getState().packages.formType

    await ajaxToggleStatus(id, status)
      .catch((err) => console.error(err))

    if (history.location.pathname === '/packages') {
      dispatch(updateState({
        tableLoading: true
      }))
      await ajaxList(dispatch, {
        ...params
      })
        .catch((err) => console.error(err))
      dispatch(updateState({
        tableLoading: false
      }))
    }

    if (type === 'edit' || type === 'add') {
      await ajaxEditInfo(dispatch, id)
        .catch((err) => console.error(err))
    }

  }

/* ===== add =====*/

const add = (value) =>
  async (dispatch, getState) => {
    process.env.NODE_ENV === 'production' || console.log('add', getState(), value)

    dispatch(updateState({
      formSaveLoading: true
    }))
    const params = getState().packages

    await ajaxAdd(dispatch, {
      ...value
    })
      .then(() => {
        dispatch(updateState({ formSaveDisabled: true }))
        dispatch(checkColumn())
        // message.destroy()
        message.success('新增成功')
      })
      .catch((err) => console.error(err))

    dispatch(updateState({
      formSaveLoading: false
    }))

  }

/* ===== edit =====*/

const toEdit = (id) =>
  async (dispatch, getState) => {
    console.log('toEdit', getState(), id)

    dispatch(updateState({
      formId: id,
      packageId: id,
      formChannel: undefined,
      formColumn: undefined,
      formLabel: undefined,
    }))

    history.push('/packages/edit')

    await ajaxEditInfo(dispatch, id)
      .then(() => {
        dispatch(checkColumn())
      })
      .catch((err) => console.error(err))

    // dispatch(updateState({modalLoading: false,}))
  }

const edit = (value) =>
  async (dispatch, getState) => {
    console.log('edit', getState(), value)
    const id = getState().packages.packageId

    dispatch(updateState({
      formSaveLoading: true
    }))

    await ajaxEdit(dispatch, {
      ...value,
      id
    })
      .then(() => {
        message.success('编辑成功')
        dispatch(updateState({}))
      })
      .catch((err) => console.error(err))

    dispatch(updateState({
      formSaveLoading: false,
    }))
  }

/* ===== column =====*/

let uuid = 90001
const selectColumnsStyle = () =>
  async (dispatch, getState) => {
    const id = getState().packages.modalColumsId
    const arr1 = getState().packages.columnsStyles
    const arr2 = arr1.concat({
      type_id: id,
      id: uuid++,
      items: []
    })

    console.log('selectColumnsStyle', arr2)

    dispatch(updateState({
      modalColumsVisible: false,
      columnsStyles: arr2,
    }))
  }

const addColumn = (value) =>
  async (dispatch, getState) => {
    process.env.NODE_ENV === 'production' || console.log('addColumn', value)
    const packageId = getState().packages.packageId
    const columnsStyles = getState().packages.columnsStyles

    if (!packageId) {
      message.info('请先保存套餐信息')
      return
    }

    await ajaxAddColumn(dispatch, {
      ...value,
      packageId,
      columnsStyles
    })
      .then(() => {
        dispatch(checkColumn())
        message.success('新增成功')
      })
      .catch((err) => console.error(err))
    // dispatch(updateState(unLoading))
  }

const editColumn = (value) =>
  async (dispatch, getState) => {
    process.env.NODE_ENV === 'production' || console.log('editColumn', value)
    const packageId = getState().packages.packageId
    const columnsStyles = getState().packages.columnsStyles

    if (!packageId) {
      // message.info('请先保存套餐信息')
      history.push('/packages')
      return
    }

    await ajaxEditColumn(dispatch, {
      ...value,
      packageId,
      columnsStyles
    })
      .then(() => {
        message.success('保存成功')
      })
      .catch((err) => console.error(err))
    // dispatch(updateState(unLoading))
  }


const checkColumn = () =>
  async (dispatch, getState) => {
    const columnsStyles = getState().packages.columnsStyles
    console.warn('checkColumn\n', columnsStyles)
    if (columnsStyles && columnsStyles.length > 0) {
      dispatch(updateState({
        headerPreviewDisabled: false,
        headerOnlineDisabled: false,
        headerRecommendDisabled: false,
      }))
    } else {
      dispatch(updateState({
        headerPreviewDisabled: true,
        headerOnlineDisabled: true,
        headerRecommendDisabled: true,
      }))
    }
  }

const deleteColumn = (value) =>
  async (dispatch, getState) => {
    const columnsStyles = getState().packages.columnsStyles
    const getColumnsStyles = () => columnsStyles.filter(v => v.id !== value)
    process.env.NODE_ENV === 'production' || console.log('deleteColumn', value, getColumnsStyles())

    if (value > 80000) {
      dispatch(updateState({
        columnsStyles: getColumnsStyles()
      }))
    } else {
      await ajaxDeleteColumn(value)
        .then(() => {
          dispatch(updateState({
            columnsStyles: getColumnsStyles()
          }))
          dispatch(checkColumn())
        })
        .catch((err) => console.error(err))
    }
  }

export {
  updateState,
  init,
  preview,
  toggleRecommendation,
  toggleStatus,
  add,
  edit,
  toEdit,
  selectColumnsStyle,
  addColumn,
  checkColumn,
  deleteColumn,
  editColumn,
}
