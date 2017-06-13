import {config} from '../../config'
const {title, subTitle} = config()
import {isObject} from  '../../util/validator'
import {UpdateState} from './action'
import {ajaxAdList, ajaxDeleteNav, ajaxEditStatus, ajaxAddNav, ajaxNavEditInfo, ajaxEditNav, positionType, getUploadToken, ajaxReply} from './ajax'
import {history} from '../../redux/store'
import {message} from "antd"

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

const initializeQuestion = () =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('initializeAd', getState())
    }
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
      buttonAddLoading: false,
      buttonSearchLoading: false,
      buttonResetLoading: false,
      //搜索条件
      adNum: "",
      adName: "",
      adStatus: "",
      searchchannelid: undefined,
      searchcolumnid: undefined,
      searchChannel: undefined,
      //下拉菜单
      positionType: [], //广告位类型
      //图片上传相关参数
      uploadToken: "",
      isUpload: true,
      //新增
      id: "",
      formSureButton: false,
      channel_id: undefined,
      column_id: undefined,
      question_author: "",
      title: "",
      user_img: "",
      intro: "",
      answer: "",
      is_reco: "2",
      sort_order: "",
    }))

    const params = getState().question

    dispatch(updateState({tableLoading: true}))
    await ajaxAdList(dispatch, {...params})
    getUploadToken(dispatch)
    positionType(dispatch)
    dispatch(updateState({tableLoading: false}))
  }

const initializeQuestionAdd = () =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('initializeAd', getState())
    }
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
    }))
  }

const initializeQuestionEdit = () =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('initializeAd', getState())
    }
    const params = getState().information
  }

const searchAdList = (values) =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('searchAdList', getState(), values)
    }
    dispatch(updateState({...values, tableLoading: true, buttonSearchLoading: true}))

    const params = getState().question

    await ajaxAdList(dispatch, {...params})
    if (process.env.NODE_ENV !== 'production') {
      console.log('done!')
    }
    dispatch(updateState({tableLoading: false, buttonSearchLoading: false}))
  }


const resetAdList = (values) =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('resetAdList', getState(), values)
    }
    dispatch(updateState({
      ...values,
      tableLoading: true,
      buttonResetLoading: true,
      searchChannel: undefined,
    }))

    const params = getState().question

    await ajaxAdList(dispatch, {...params})
    dispatch(updateState({tableLoading: false, buttonResetLoading: false}))
  }

const changePage = (values) =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('changePage', getState(), values)
    }
    dispatch(updateState({...values, tableLoading: true}))
    const params = getState().question

    await ajaxAdList(dispatch, {...params})

    dispatch(updateState({tableLoading: false}))
  }

const confirmDelete = (id) =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('deleteDate', getState(), id)
    }
    dispatch(updateState({tableLoading: true}))
    const params = getState().question

    await ajaxDeleteNav(id)
    await ajaxAdList(dispatch, {...params})

    dispatch(updateState({tableLoading: false}))
  }

const toggleStatus = (id, status) =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('deleteDate', getState(), status)
    }
    dispatch(updateState({tableLoading: true}))
    const params = getState().question

    await ajaxEditStatus(id, status)
    await ajaxAdList(dispatch, {...params})

    dispatch(updateState({tableLoading: false}))
  }

const openModal = () => updateState({modalAddVisible: true})

const closeModal = () => updateState({id: "", modalAddVisible: false, modalEditVisible: false})


const openEditNavModal = (id) =>
  async (dispatch, getState) => {

    await ajaxNavEditInfo(dispatch, id)

  }

const uploadImg = (value) => updateState({isUpload: value})


const addNav = (values) =>
  async (dispatch, getState) => {
    dispatch(updateState({formSureButton: true}))

    await ajaxAddNav(values)
      .then(() => {
        message.success("操作成功")
        setTimeout(() => history.push('/question'), 2000)
        dispatch(updateState({
          id: "",
          formSureButton: false,
          channel_id: "",
          column_id: "",
          question_author: "",
          title: "",
          user_img: "",
          intro: "",
          answer: "",
          is_reco: "2",
          sort_order: "",
        }))
      })
      .catch(() => console.error('ajaxAddNav fail！'))
    dispatch(updateState({
      formSureButton: false,
    }))

  }
const editNav = (values) =>
  async (dispatch, getState) => {
    dispatch(updateState({formSureButton: true}))
    await ajaxEditNav(values)
      .then(() => {
        message.success("操作成功")
        setTimeout(() => {
          history.push('/question')
        }, 2000)
        dispatch(updateState({
          id: "",
          formSureButton: false,
          channel_id: "",
          column_id: "",
          question_author: "",
          title: "",
          user_img: "",
          intro: "",
          answer: "",
          is_reco: "2",
          sort_order: "",
        }))
      })
      .catch(() => console.error('error'))
    dispatch(updateState({
      formSureButton: false,
    }))

  }

const openReplyModal = (id) =>
  async (dispatch, getState) => {
    dispatch(updateState({id: id, modalAddVisible: true, modalLoading: true}))
  }

const changeSearchChannel = (value) => updateState({searchChannel: value})
const changeChannelId = (value) => updateState({channel_id: value})

const reply = (values) =>
  async (dispatch, getState) => {
    dispatch(updateState({modalLoading: true}))

    await ajaxReply(values)
      .then(() => {
        message.success("操作成功")
      })
      .catch(() => console.error('ajax fail！'))

    const params = getState().question

    await ajaxAdList(dispatch, {...params})
    dispatch(updateState({
      id: "",
      modalAddVisible: false,
      modalLoading: false
    }))
  }

export {
  updateState, initializeQuestion, initializeQuestionEdit, initializeQuestionAdd,
  searchAdList, resetAdList, changePage, confirmDelete, toggleStatus, openModal, closeModal, addNav, editNav, openEditNavModal,
  uploadImg, openReplyModal, reply, changeSearchChannel, changeChannelId
}
