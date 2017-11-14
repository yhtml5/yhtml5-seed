import { message } from 'antd'
import { config } from '../../config'
import { history } from '../../redux/store'
import { isObject, isArrayEmpty } from '../../util/validator'
import { selectChannels, resetChannelsColumns } from '../App/task'
import { UpdateState } from './action'
import { ajaxLiveList, ajaxLiveSettings, ajaxDeleteLive, ajaxEditStatus, ajaxAddLive, ajaxEditInfo, ajaxEdit } from './ajax'
const { title, subTitle } = config()

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

const initializeLive = (value) =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('initializeLive', getState())
    }

    const params = getState().live
    const params2 = getState().app

    if (isArrayEmpty(params.formTypes)) {
      ajaxLiveSettings(dispatch)
    }

    switch (value) {
      case 'add':
        dispatch(updateState({
          formChannel: undefined,
          formColumn: undefined,
          formLabel: undefined,
          formMainImage: [],
          formCommunityName: '',
          formAnnouncer: '',
          formDesignImage: [],
        }))
        break
      case 'edit':
        if (!params.formId) {
          console.warn(params.formId, !params.formId)
          setTimeout(() => history.push('/live'))
        }
        break
      default:
        dispatch(updateState({ tableLoading: true }))
        await ajaxLiveList(dispatch, { ...params, ...params2 })
        dispatch(updateState({ tableLoading: false }))
        break
    }
  }

const searchLiveList = (value) =>
  async (dispatch, getState) => {
    process.env.NODE_ENV === 'production' || console.log('searchLiveList', getState(), value)

    dispatch(updateState({ ...value, tableCurrent: 1, tableLoading: true, buttonSearchLoading: true }))

    const params = getState().live

    await ajaxLiveList(dispatch, params)
    dispatch(updateState({ tableLoading: false, buttonSearchLoading: false }))
  }


const resetLiveList = (values) =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('resetLiveList', getState(), values)
    }
    dispatch(updateState({ ...values, tableCurrent: 1, tableLoading: true, buttonResetLoading: true }))

    const params = getState().live
    const paramsApp = getState().live

    await ajaxLiveList(dispatch, {
      ...params,
      searchChannel: paramsApp.selectedChannel,
      searchColumn: paramsApp.selectedColumn
    })

    dispatch(updateState({ tableLoading: false, buttonResetLoading: false }))
  }

const changePage = (values) =>
  async (dispatch, getState) => {
    process.env.NODE_ENV === 'production' || console.log('changePage', getState(), values)

    dispatch(updateState({ ...values, tableLoading: true }))
    const params = getState().live

    await ajaxLiveList(dispatch, { ...params })

    dispatch(updateState({ tableLoading: false }))
  }

const confirmDelete = (id) =>
  async (dispatch, getState) => {
    console.log('deleteDate', getState(), id)
    dispatch(updateState({ tableLoading: true }))
    const params = getState().live

    await ajaxDeleteLive(id)
    await ajaxLiveList(dispatch, { ...params })

    dispatch(updateState({ tableLoading: false }))
  }

const toggleStatus = (id, status) =>
  async (dispatch, getState) => {
    console.log('deleteDate', getState(), status)
    dispatch(updateState({ tableLoading: true }))
    const params = getState().live

    await ajaxEditStatus(id, status)
    await ajaxLiveList(dispatch, { ...params })

    dispatch(updateState({ tableLoading: false }))
  }

const openModal = () => updateState({ modalAddVisible: true })
const closeModal = () => updateState({ modalAddVisible: false, modalEditVisible: false })

const changeSearchChannel = (value) => updateState({ searchChannel: value })

/**
 * Todo
 *
 * live form submit
 *
 */

const changeFormAddType = (value) => (dispatch) => dispatch(updateState({ formType: value }))
const changeFormEditType = (value) => (dispatch) => dispatch(updateState({ formEditType: value }))
const changeFormStep = (value) => (dispatch) => dispatch(updateState({ formStep: value }))
const changeFormStepEdit = (value) => (dispatch) => dispatch(updateState({ formEditStep: value }))

const resetFormAdd = (value) => (dispatch) => {
  dispatch(updateState({ ...value }))
  history.push('/live')
}

const resetEdit = () =>
  async (dispatch, getState) => {
    history.push('/live')
  }

const addLive = (value) =>
  async (dispatch, getState) => {
    console.log('addLive', getState(), value)
    dispatch(updateState({ formAddButtonSubmitLoading: true }))
    const params = getState().live

    await ajaxAddLive({ ...value, formStep: params.formStep })
      .then(() => {
        console.log(11)
        dispatch(updateState({
          formAreas: [],
          formHomes: [],
          formTypes: [],
          formSteps: [],
          formImages: [],
          formStep: 0,
          formTitle: '',
          formMainImage: [],
          formCommunityName: '',
          formAnnouncer: '',
          formDesignImage: [],
          formSort: '',
          formArea: undefined,
          formHome: undefined,
          formIsHomepage: undefined,
          formIsDone: undefined,
          formType: undefined,
          formVideoIntroduction: '',
          formVideoUrl: '',
          formVideoView: '',
        }))
        // message.destroy()
        message.success('新增成功')
        setTimeout(() => history.push('/live'), 1000)
      }
      )
      .catch(() => console.error('ajaxAddLive error'))

    dispatch(updateState({ formAddButtonSubmitLoading: false }))

  }


const toEdit = (id) =>
  async (dispatch, getState) => {
    console.log('toEdit', getState(), id)
    dispatch(updateState({
      formId: id,
      formChannel: undefined,
      formColumn: undefined,
      formLabel: undefined,
    }))


    await ajaxEditInfo(dispatch, id)
      .then(() => {
        const id = getState().live.formChannel
        dispatch(selectChannels(id, true))
        history.push('/live/edit')
      })
      .catch(() => {
        console.error('ajaxEditInfo fail!')
      })

    // dispatch(updateState({modalLoading: false,}))
  }

const editLive = (values) =>
  async (dispatch, getState) => {
    console.log('editNav', getState(), values)
    const id = getState().live.formId
    const paramsLive = getState().live

    dispatch(updateState({ formEditButtonSubmitLoading: true }))

    await ajaxEdit(dispatch, { ...values, id, formStep: paramsLive.formEditStep })
      .then(() => {
        message.success('编辑成功')
        history.push('/live')
        dispatch(updateState({
          formId: '',
          formChannel: undefined,
          formColumn: undefined,
          formLabel: undefined,
          formEditButtonSubmitLoading: false,
          formEditStep: 0,
          formEditImages: [],
          formEditTitle: '',
          formEditMainImage: [],
          formEditCommunityName: '',
          formEditAnnouncer: '',
          formEditDesignImage: [],
          formEditSort: '',
          formEditArea: undefined,
          formEditHome: undefined,
          formEditIsHomepage: undefined,
          formEditIsDone: undefined,
          formEditType: '',
          formEditVideoIntroduction: '',
          formEditVideoUrl: '',
          formEditVideoView: '',
        }))
      }
      )
      .catch(() => console.error('ajaxEdit fail!'))

    dispatch(updateState({ formEditButtonSubmitLoading: false, tableLoading: true, modalEditConfirmLoading: false }))
    await ajaxLiveList(dispatch, { ...paramsLive })
    dispatch(updateState({ tableLoading: false }))
  }


const changeChannel = (id) =>
  async (dispatch, getState) => {
    await dispatch(selectChannels(id, true))
    dispatch(updateState({
      formChannel: id,
      formColumn: undefined,
      formLabel: undefined
    }))
  }

export {
  updateState, initializeLive,
  searchLiveList, changeSearchChannel, resetLiveList, changePage, confirmDelete, toggleStatus, openModal, closeModal, editLive,
  changeFormAddType, resetFormAdd, addLive, changeFormStep, toEdit, resetEdit, changeFormEditType, changeFormStepEdit, changeChannel,
}
