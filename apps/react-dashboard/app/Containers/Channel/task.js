import {config} from '../../config'
const {title, subTitle} = config()
import {validator} from  '../../util/validator'
import {UpdateState} from './action'
import {
  ajaxAdList,
  ajaxDeleteNav,
  ajaxEditStatus,
  ajaxAddNav,
  ajaxNavEditInfo,
  ajaxEditNav,
  positionType,
  getUploadToken,
  ajaxChannelEditInfo,
  ajaxItemEditInfo,
  ajaxChannelNav,
  ajaxItemNav,
  ajaxremoveitem
} from './ajax'

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

const initializeChannel = () =>
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

      modalLoading2: false,
      modalAddVisible2: false,
      modalAddConfirmLoading2: false,
      modalEditVisible2: false,
      modalEditConfirmLoading2: false,

      modalLoading3: false,
      modalAddVisible3: false,
      modalAddConfirmLoading3: false,
      modalEditVisible3: false,
      modalEditConfirmLoading3: false,
      // 编辑字段
      intro: "",
      name: "",
      description: "",
      keyword: "",
      title: "",
      id: "", //编辑选项ID
      //频道管理字段
      channelList: [],
      ItemlList: [],
      channeloption: [],
      //
      buttonAddLoading: false,
      buttonSearchLoading: false,
      buttonResetLoading: false,

      //搜索条件
      channelnum: "",
      channelname: "",
//下拉菜单
      positionType: [], //广告位类型
    }))

    const params = getState().channel
    dispatch(updateState({tableLoading: true}))
    await ajaxAdList(dispatch, {...params})
    positionType(dispatch)
    dispatch(updateState({tableLoading: false}))
  }

const searchAdList = (values) =>
  async (dispatch, getState) => {
    console.log('searchAdList', getState(), values)
    dispatch(updateState({...values, tableLoading: true, buttonSearchLoading: true}))

    const params = getState().channel

    await ajaxAdList(dispatch, {...params})
    console.log('done!')
    dispatch(updateState({tableLoading: false, buttonSearchLoading: false}))
  }


const resetAdList = (values) =>
  async (dispatch, getState) => {
    console.log('resetAdList', getState(), values)
    dispatch(updateState({...values, tableLoading: true, buttonResetLoading: true}))

    const params = getState().channel

    await ajaxAdList(dispatch, {...params})
    console.log('done!')
    dispatch(updateState({tableLoading: false, buttonResetLoading: false}))
  }

const changePage = (values) =>
  async (dispatch, getState) => {
    console.log('changePage', getState(), values)
    dispatch(updateState({...values, tableLoading: true}))
    const params = getState().channel

    await ajaxAdList(dispatch, {...params})

    dispatch(updateState({tableLoading: false}))
  }

const confirmDelete = (id) =>
  async (dispatch, getState) => {
    console.log('deleteDate', getState(), id)
    dispatch(updateState({tableLoading: true}))
    const params = getState().channel

    await ajaxDeleteNav(id)
    await ajaxAdList(dispatch, {...params})

    dispatch(updateState({tableLoading: false}))
  }

const toggleStatus = (id, status) =>
  async (dispatch, getState) => {
    console.log('deleteDate', getState(), status)
    dispatch(updateState({tableLoading: true}))
    const params = getState().channel

    await ajaxEditStatus(id, status)
    await ajaxAdList(dispatch, {...params})

    dispatch(updateState({tableLoading: false}))
  }

const openModal = () => updateState({modalAddVisible: true})
const closeModal = () => updateState({modalAddVisible: false, modalEditVisible: false})
const closeChannelModal = () => updateState({modalAddVisible2: false, modalEditVisible2: false})
const closeItemModal = () => updateState({modalAddVisible3: false, modalEditVisible3: false})
const addNav = (values) =>
  async (dispatch, getState) => {
    console.log('addNav', getState(), values)
    dispatch(updateState({modalAddConfirmLoading: true}))
    const params = getState().ad

    await ajaxAddNav(values)
    await ajaxAdList(dispatch, {...params})

    dispatch(updateState({
      intro: "",
      name: "",
      page_id: "",
      qr_code: "",
      sort_order: "",
      status: 1,
      isUpload: true,
      modalAddConfirmLoading: false,
      modalAddVisible: false,
    }))
  }

const openEditNavModal = (id) =>
  async (dispatch, getState) => {
    console.log('openEditNavModal', getState(), id)
    dispatch(updateState({modalEditVisible: true, modalLoading: true}))
    const params = getState().channel

    await ajaxNavEditInfo(dispatch, id)

    dispatch(updateState({modalLoading: false, id: id}))
  }
const openChannelEditNavModal = (id) =>
  async (dispatch, getState) => {
    console.log('openChannelEditNavModal', getState(), id)
    dispatch(updateState({modalEditVisible2: true, modalLoading2: true}))
    const params = getState().channel

    await ajaxChannelEditInfo(dispatch, id)

    dispatch(updateState({modalLoading2: false, id: id}))
  }
const openItemEditNavModal = (id) =>
  async (dispatch, getState) => {
    console.log('openChannelEditNavModal', getState(), id)
    dispatch(updateState({modalEditVisible3: true, modalLoading3: true}))
    const params = getState().channel

    await ajaxItemEditInfo(dispatch, id)

    dispatch(updateState({modalLoading3: false, id: id}))
  }
const editNav = (values) =>
  async (dispatch, getState) => {
    console.log('editNav', getState(), values)
    dispatch(updateState({modalEditConfirmLoading: true}))
    const params = getState().channel

    await ajaxEditNav(dispatch, values)
    dispatch(updateState({tableLoading: true, modalEditConfirmLoading: false, modalEditVisible: false}))
    await ajaxAdList(dispatch, {...params})
    dispatch(updateState({
      intro: "",
      name: "",
      description: "",
      keyword: "",
      title: "",
      id: "",
      tableLoading: false,
    }))
  }
const editchannelNav = (values) =>
  async (dispatch, getState) => {
    console.log('editNav', getState(), values)
    dispatch(updateState({modalEditConfirmLoading2: true}))
    const params = getState().channel

    await ajaxChannelNav(dispatch, values)
    dispatch(updateState({tableLoading: true, modalEditConfirmLoading2: false, modalEditVisible2: false}))
    await ajaxAdList(dispatch, {...params})
    dispatch(updateState({
      id: "",
      child_channels: ""
    }))
  }
const editItem = (values) =>
  async (dispatch, getState) => {
    console.log('editNav', getState(), values)
    dispatch(updateState({modalEditConfirmLoading3: true}))
    const params = getState().channel

    await ajaxItemNav(dispatch, values)
    dispatch(updateState({tableLoading: true, modalEditConfirmLoading3: false, modalEditVisible3: false}))
    await ajaxAdList(dispatch, {...params})
    dispatch(updateState({
      id: "",
      ItemlList: [],
    }))
  }
const removeitem = (values, remove) =>
  async (dispatch, getState) => {
    const params = getState().channel

    await ajaxremoveitem(dispatch, values, {...params})
      .then(() => {
          console.log('removeitem sucess!')
          remove()
        }
      )
      .catch(()=>console.log('removeitem fail!'))



    // dispatch(updateState({
    //   id:"",
    //   ItemlList:[],
    // }))
  }
export {
  updateState,
  initializeChannel,
  searchAdList,
  resetAdList,
  changePage,
  confirmDelete,
  toggleStatus,
  openModal,
  closeModal,
  addNav,
  editNav,
  openEditNavModal,
  openChannelEditNavModal,
  closeChannelModal,
  openItemEditNavModal,
  closeItemModal,
  editItem,
  editchannelNav,
  removeitem
}
