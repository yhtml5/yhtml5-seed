import {config} from '../../config'
const {title, subTitle} = config()
import {validator} from  '../../util/validator'
import {UpdateState} from './action'
import {ajaxAdList, ajaxDeleteNav, ajaxEditStatus, ajaxAddNav, ajaxNavEditInfo, ajaxEditNav,adBlowList,getUploadToken} from './ajax'

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

const initializeAd = () =>
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
      adNum:"",
      adName:"",
      adBlow:"",
      adStatus:"",
      id:"", //编辑选项ID
      // 下拉列表
      adBlowOptions:[], //所属广告位下拉
      //图片上传相关参数
      uploadToken:"",
      isUpload:true
    }))

    const params = getState().ad

    dispatch(updateState({tableLoading: true}))
    await ajaxAdList(dispatch, {...params})
    adBlowList(dispatch)//所属广告位下拉
    getUploadToken(dispatch)
    dispatch(updateState({tableLoading: false}))
  }

const searchAdList = (values) =>
  async (dispatch, getState) => {
    console.log('searchAdList', getState(), values)
    dispatch(updateState({...values, tableLoading: true, buttonSearchLoading: true}))

    const params = getState().ad

    await ajaxAdList(dispatch, {...params})
    console.log('done!')
    dispatch(updateState({tableLoading: false, buttonSearchLoading: false}))
  }


const resetAdList = (values) =>
  async (dispatch, getState) => {
    console.log('resetAdList', getState(), values)
    dispatch(updateState({...values, tableLoading: true, buttonResetLoading: true}))

    const params = getState().ad

    await ajaxAdList(dispatch, {...params})
    console.log('done!')
    dispatch(updateState({tableLoading: false, buttonResetLoading: false}))
  }

const changePage = (values) =>
  async (dispatch, getState) => {
    console.log('changePage', getState(), values)
    dispatch(updateState({...values, tableLoading: true}))
    const params = getState().ad

    await ajaxAdList(dispatch, {...params})

    dispatch(updateState({tableLoading: false}))
  }

const confirmDelete = (id) =>
  async (dispatch, getState) => {
    console.log('deleteDate', getState(), id)
    dispatch(updateState({tableLoading: true}))
    const params = getState().ad

    await ajaxDeleteNav(id)
    await ajaxAdList(dispatch, {...params})

    dispatch(updateState({tableLoading: false}))
  }

const toggleStatus = (id, status) =>
  async (dispatch, getState) => {
    console.log('deleteDate', getState(), status)
    dispatch(updateState({tableLoading: true}))
    const params = getState().ad

    await ajaxEditStatus(id, status)
    await ajaxAdList(dispatch, {...params})

    dispatch(updateState({tableLoading: false}))
  }

const openModal = () => updateState({modalAddVisible: true})

const closeModal = () => updateState({isUpload:true,modalAddVisible: false, modalEditVisible: false})

const addNav = (values) =>
  async (dispatch, getState) => {
    console.log('addNav', getState(), values)
    dispatch(updateState({modalAddConfirmLoading: true}))
    const params = getState().ad

    await ajaxAddNav(values)
    await ajaxAdList(dispatch, {...params})

    dispatch(updateState({
      ad_position_id:"",
      id: "",
      img_url: "",
      link_url: "",
      name: "",
      sort_order: "",
      status: 1,
      isUpload:true,
      modalAddConfirmLoading: false,
      modalAddVisible: false,
    }))
  }

const openEditNavModal = (id) =>
  async (dispatch, getState) => {
    console.log('openEditNavModal', getState(), id)
    dispatch(updateState({modalEditVisible: true, modalLoading: true}))
    const params = getState().ad

    await ajaxNavEditInfo(dispatch, id)

    dispatch(updateState({modalLoading: false,id:id}))
  }

const editNav = (values) =>
  async (dispatch, getState) => {
    console.log('editNav', getState(), values)
    dispatch(updateState({modalEditConfirmLoading: true}))
    const params = getState().ad

    await ajaxEditNav(dispatch, values)
    dispatch(updateState({tableLoading: true, modalEditConfirmLoading: false}))
    await ajaxAdList(dispatch, {...params})

    dispatch(updateState({
      ad_position_id:"",
      id: "",
      img_url: "",
      link_url: "",
      name: "",
      sort_order: "",
      status: 1,
      isUpload:true,
      tableLoading: false,
      modalEditVisible: false
    }))
  }

  const uploadImg = (value) => updateState({isUpload: value})

export {
  updateState, initializeAd,
  searchAdList, resetAdList, changePage, confirmDelete, toggleStatus, openModal, closeModal, addNav, editNav, openEditNavModal,
  uploadImg
}
