import {config} from '../../config'
import {isObject} from  '../../util/validator'
import {UpdateState} from './action'
import {ajaxNavigationList, ajaxDeleteNav, ajaxEditStatus, ajaxAddNav, ajaxNavEditInfo, ajaxEditNav, ajaxNavTypeList} from './ajax'

const {title, subTitle} = config()

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

const initializeNavigation = () =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('initializeNavigation', getState())
    }
    dispatch(updateState({
      searchName: '',
      navTypes: [],
      tableData: [],
      tableTotals: 0,
      tableCurrent: 1,
      tablePageSize: 10,
      tableLoading: false,
      modalLoading: false,
      modalAddVisible: false,
      modalAddConfirmLoading: false,
      modalEditVisible: false,
      modalEditConfirmLoading: false,
      modalId: '',
      modalChannel: undefined,
      modalLinkUrl: '',
      modalName: '11',
      modalSort: '',
      modalType: undefined,
      buttonAddLoading: false,
      buttonSearchLoading: false,
      buttonResetLoading: false,
    }))
    const params = getState().navigation
    const params2 = getState().app
    dispatch(updateState({tableLoading: true}))

    await ajaxNavigationList(dispatch, {...params, ...params2})
    await ajaxNavTypeList(dispatch)

    dispatch(updateState({tableLoading: false}))
  }

const searchNavigationList = (values) =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('searchNavigationList', getState(), values)
    }
    dispatch(updateState({...values, tableLoading: true, buttonSearchLoading: true}))

    const params = getState().navigation
    const params2 = getState().app

    await ajaxNavigationList(dispatch, {...params, ...params2})
    dispatch(updateState({tableLoading: false, buttonSearchLoading: false}))
  }


const resetNavigationList = (values) =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('resetNavigationList', getState(), values)
    }
    dispatch(updateState({...values, tableLoading: true, buttonResetLoading: true}))

    const params = getState().navigation
    const params2 = getState().app

    await ajaxNavigationList(dispatch, {...params, ...params2})
    dispatch(updateState({tableLoading: false, buttonResetLoading: false}))
  }

const changePage = (values) =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('changePage', getState(), values)
    }
    dispatch(updateState({...values, tableLoading: true}))
    const params = getState().navigation

    await ajaxNavigationList(dispatch, {...params})

    dispatch(updateState({tableLoading: false}))
  }

const confirmDelete = (id) =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('deleteDate', getState(), id)
    }
    dispatch(updateState({tableLoading: true}))
    const params = getState().navigation

    await ajaxDeleteNav(id)
    await ajaxNavigationList(dispatch, {...params})

    dispatch(updateState({tableLoading: false}))
  }

const toggleStatus = (id, status) =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('deleteDate', getState(), status)
    }
    dispatch(updateState({tableLoading: true}))
    const params = getState().navigation

    await ajaxEditStatus(id, status)
    await ajaxNavigationList(dispatch, {...params})

    dispatch(updateState({tableLoading: false}))
  }

const openModal = () => updateState({modalAddVisible: true})
const closeModal = () => updateState({modalType: undefined, modalAddVisible: false, modalEditVisible: false})

/**
 * Todo
 * 1. Nest promise ?
 */

const addNav = (values) =>
  async (dispatch, getState) => {
    process.env.NODE_ENV === 'production' || console.log('addNav', getState(), values)
    dispatch(updateState({modalAddConfirmLoading: true}))
    const params = getState().navigation

    await ajaxAddNav(values)
      .then(async () => {
        await ajaxNavigationList(dispatch, {...params})
        dispatch(updateState({
          modalChannel: undefined,
          modalLinkUrl: '',
          modalName: '',
          modalSort: '',
          modalType: undefined,
          modalAddVisible: false
        }))
      })
      .catch(() => console.log('Add fail!'))

    dispatch(updateState({modalAddConfirmLoading: false}))
  }

const editNav = (values) =>
  async (dispatch, getState) => {
    process.env.NODE_ENV === 'production' || console.log('edit', values)
    dispatch(updateState({modalEditConfirmLoading: true}))
    const params = getState().navigation
    const modalId = getState().navigation.modalId

    await ajaxEditNav(dispatch, {...values, modalId})
      .then(async () => {
        dispatch(updateState({
          modalChannel: undefined,
          modalLinkUrl: '',
          modalName: '',
          modalSort: '',
          modalType: undefined,
          modalEditVisible: false,
          modalEditConfirmLoading: false,
          tableLoading: true
        }))
        await ajaxNavigationList(dispatch, {...params})
      })
      .catch(() => console.error('Edit fail!'))

    dispatch(updateState({
      tableLoading: false,
    }))
  }


const openEditNavModal = (id) =>
  async (dispatch, getState) => {
    process.env.NODE_ENV === 'production' || console.log('openEditNavModal', id)

    dispatch(updateState({
      modalEditVisible: true,
      modalLoading: true,
      modalId: id
    }))

    await ajaxNavEditInfo(dispatch, id)

    dispatch(updateState({modalLoading: false,}))
  }


const changeNavType = (value) => (dispatch) => dispatch(updateState({modalType: value}))


export {
  updateState, initializeNavigation,
  searchNavigationList, resetNavigationList, changePage, confirmDelete, toggleStatus, openModal, closeModal, addNav, editNav, openEditNavModal, changeNavType
}
