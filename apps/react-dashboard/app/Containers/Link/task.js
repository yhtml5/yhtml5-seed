import {config} from '../../config'
const {title, subTitle} = config()
import {validator} from  '../../util/validator'
import {UpdateState} from './action'
import {ajaxAdList, ajaxDeleteNav, ajaxEditStatus, ajaxAddNav, ajaxNavEditInfo, ajaxEditNav,positionType,getUploadToken} from './ajax'

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

const initializeLink = () =>
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
      image:"",
      link_url:"",
      name:"",
      status:"1",
      type:"1",
      sort_order:"",
      id:"", //编辑选项ID
      //
      buttonAddLoading: false,
      buttonSearchLoading: false,
      buttonResetLoading: false,

      //搜索条件
      adName:"",
//下拉菜单
      positionType:[], //广告位类型
      //图片上传相关参数
      uploadToken:"",
      isUpload:true,
      imgShow:false, //是否显示上传图片
    }))

    const params = getState().link

    dispatch(updateState({tableLoading: true}))
    await ajaxAdList(dispatch, {...params})
    getUploadToken(dispatch)
    positionType(dispatch)
    dispatch(updateState({tableLoading: false}))
  }

const searchAdList = (values) =>
  async (dispatch, getState) => {
    console.log('searchAdList', getState(), values)
    dispatch(updateState({...values, tableLoading: true, buttonSearchLoading: true}))

    const params = getState().link

    await ajaxAdList(dispatch, {...params})
    console.log('done!')
    dispatch(updateState({tableLoading: false, buttonSearchLoading: false}))
  }


const resetAdList = (values) =>
  async (dispatch, getState) => {
    console.log('resetAdList', getState(), values)
    dispatch(updateState({...values, tableLoading: true, buttonResetLoading: true}))

    const params = getState().link

    await ajaxAdList(dispatch, {...params})
    console.log('done!')
    dispatch(updateState({tableLoading: false, buttonResetLoading: false}))
  }

const changePage = (values) =>
  async (dispatch, getState) => {
    console.log('changePage', getState(), values)
    dispatch(updateState({...values, tableLoading: true}))
    const params = getState().link

    await ajaxAdList(dispatch, {...params})

    dispatch(updateState({tableLoading: false}))
  }

const confirmDelete = (id) =>
  async (dispatch, getState) => {
    console.log('deleteDate', getState(), id)
    dispatch(updateState({tableLoading: true}))
    const params = getState().link

    await ajaxDeleteNav(id)
    await ajaxAdList(dispatch, {...params})

    dispatch(updateState({tableLoading: false}))
  }

const toggleStatus = (id, status) =>
  async (dispatch, getState) => {
    console.log('deleteDate', getState(), status)
    dispatch(updateState({tableLoading: true}))
    const params = getState().link

    await ajaxEditStatus(id, status)
    await ajaxAdList(dispatch, {...params})

    dispatch(updateState({tableLoading: false}))
  }

const openModal = () => updateState({modalAddVisible: true})
const closeModal = () => updateState({img_url: "",imgShow:false,isUpload:true,modalAddVisible: false, modalEditVisible: false})

const addNav = (values) =>
  async (dispatch, getState) => {
    console.log('addNav', getState(), values)
    dispatch(updateState({modalAddConfirmLoading: true}))
    const params = getState().ad

    await ajaxAddNav(values)
    await ajaxAdList(dispatch, {...params})

    dispatch(updateState({
      ad_size:"",
      id: "",
      img_url: "",
      name: "",
      type: "",
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
    const params = getState().link

    await ajaxNavEditInfo(dispatch, id)

    dispatch(updateState({modalLoading: false,id:id}))
  }

const editNav = (values) =>
  async (dispatch, getState) => {
    console.log('editNav', getState(), values)
    dispatch(updateState({modalEditConfirmLoading: true}))
    const params = getState().link

    await ajaxEditNav(dispatch, values)
    dispatch(updateState({tableLoading: true, modalEditConfirmLoading: false}))
    await ajaxAdList(dispatch, {...params})

    dispatch(updateState({
      image:"",
      link_url:"",
      name:"",
      type:"1",
      sort_order:"",
      id:"",
      status: "1",
      isUpload:true,
      imgShow:false,
      tableLoading: false,
      modalEditVisible: false
    }))
  }

  const uploadImg = (value) => updateState({isUpload: value})
  const showchange= (value,status) => updateState({imgShow: value,isUpload:status})

export {
  updateState, initializeLink,
  searchAdList, resetAdList, changePage, confirmDelete, toggleStatus, openModal, closeModal, addNav, editNav, openEditNavModal,
  uploadImg , showchange
}
