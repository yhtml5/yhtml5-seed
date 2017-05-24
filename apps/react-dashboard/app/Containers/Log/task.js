import {config} from '../../config'
const {title, subTitle} = config()
import {validator} from  '../../util/validator'
import {UpdateState} from './action'
import {ajaxAdList, ajaxDeleteNav, ajaxEditStatus, ajaxAddNav, ajaxNavEditInfo, ajaxEditNav, positionType, getUploadToken, ajaxlabelList} from './ajax'
import {history} from '../../redux/store'
import {message} from "antd"

function updateState(data) {
  if (validator.isObject(data)) {
    return {
      type: UpdateState,
      payload: data
    }
  } else {
    console.error('action updateState params must be a object')
  }
}

const initializeLog = () =>
  async (dispatch, getState) => {
    console.log('initializeAd', getState())
    await dispatch(updateState({
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
      // 新增编辑字段
      ad_position_id: '',
      img_url: '',
      link_url: '',
      name: '',
      sort_order: '',
      status: 1,
      //
      buttonAddLoading: false,
      buttonSearchLoading: false,
      buttonResetLoading: false,

      //搜索条件
      adNum: "",
      adName: "",
      adStatus: "",
      id: "", //编辑选项ID

      positionType: [],
      //图片上传相关参数
      uploadToken: "",
      isUpload: true
    }))

    const params = getState().log

    dispatch(updateState({tableLoading: true}))
    await ajaxAdList(dispatch, {...params})
    getUploadToken(dispatch)
    positionType(dispatch)
    dispatch(updateState({tableLoading: false}))
  }
const initializeLogAdd = () =>
  async (dispatch, getState) => {
    console.log('initializeAd', getState())
    await dispatch(updateState({
      id: "",
      labellist: [],  //关联标签
      formSureButton: false,
      channel_id: undefined,
      column_id: undefined,
      image: "",
      intro: "",
      is_reco: "2",
      keywords: "",
      label_ids: [],
      name: "",
      view_num: "",
      sort_order: "",
      summary: "",
      title: "",
    }))

  }
const initializeLogEdit = () =>
  async (dispatch, getState) => {
    console.log('initializeAd', getState())
    const params = getState().information
  }

const searchAdList = (values) =>
  async (dispatch, getState) => {
    console.log('searchAdList', getState(), values)
    dispatch(updateState({...values, tableLoading: true, buttonSearchLoading: true}))

    const params = getState().log

    await ajaxAdList(dispatch, {...params})
    console.log('done!')
    dispatch(updateState({tableLoading: false, buttonSearchLoading: false}))
  }


const resetAdList = (values) =>
  async (dispatch, getState) => {
    console.log('resetAdList', getState(), values)
    dispatch(updateState({...values, tableLoading: true, buttonResetLoading: true}))

    const params = getState().log
    await ajaxAdList(dispatch, {...params})
    console.log('done!')
    dispatch(updateState({tableLoading: false, buttonResetLoading: false}))
  }

const changePage = (values) =>
  async (dispatch, getState) => {
    console.log('changePage', getState(), values)
    dispatch(updateState({...values, tableLoading: true}))
    const params = getState().log

    await ajaxAdList(dispatch, {...params})

    dispatch(updateState({tableLoading: false}))
  }

const confirmDelete = (id) =>
  async (dispatch, getState) => {
    console.log('deleteDate', getState(), id)
    dispatch(updateState({tableLoading: true}))
    const params = getState().log

    await ajaxDeleteNav(id)
    await ajaxAdList(dispatch, {...params})

    dispatch(updateState({tableLoading: false}))
  }

const toggleStatus = (id, status) =>
  async (dispatch, getState) => {
    console.log('deleteDate', getState(), status)
    dispatch(updateState({tableLoading: true}))
    const params = getState().log

    await ajaxEditStatus(id, status)
    await ajaxAdList(dispatch, {...params})

    dispatch(updateState({tableLoading: false}))
  }

const openModal = () => updateState({modalAddVisible: true})

const closeModal = () => updateState({isUpload: true, modalAddVisible: false, modalEditVisible: false})


const openEditNavModal = (id) =>
  async (dispatch, getState) => {

    await ajaxNavEditInfo(dispatch, id)

  }

const uploadImg = (value) => updateState({isUpload: value})

const searchlabelList = (values) =>
  async (dispatch, getState) => {
    await ajaxlabelList(dispatch, values)
  }
const addNav = (values) =>
  async (dispatch, getState) => {
    dispatch(updateState({formSureButton: true}))

    await ajaxAddNav(values)
      .then(() => {
        message.success("操作成功")
        setTimeout(() => history.push('/log'), 2000)
      })
      .catch(() => console.error('ajaxAddNav fail！'))


    dispatch(updateState({
      labellist: [],  //关联标签
      formSureButton: false,
      channel_id: "",
      column_id: "",
      image: "",
      intro: "",
      is_reco: "2",
      keywords: "",
      label_ids: [],
      name: "",
      shows: "",
      sort_order: "",
      summary: "",
    }))
  }

const editNav = (values) =>
  async (dispatch, getState) => {
    dispatch(updateState({formSureButton: true}))
    await ajaxEditNav(values)
      .then(() => {
        message.success("操作成功")
        setTimeout(() => {
          history.push('/log')
        }, 2000)
        dispatch(updateState({
          labellist: [],  //关联标签
          formSureButton: false,
          channel_id: "",
          column_id: "",
          image: "",
          intro: "",
          is_reco: "2",
          keywords: "",
          label_ids: [],
          name: "",
          shows: "",
          sort_order: "",
          summary: "",
          id: ""
        }))
      })
      .catch(() => console.error('error'))
    dispatch(updateState({
      formSureButton: false,
    }))
  }

const changeChannelId = (value) => updateState({channel_id: value})

export {
  updateState, initializeLog, initializeLogAdd, initializeLogEdit,
  searchAdList, resetAdList, changePage, confirmDelete, toggleStatus, openModal, closeModal, addNav, editNav, openEditNavModal,
  uploadImg, searchlabelList, changeChannelId
}
