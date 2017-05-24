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

const initializelabel = () =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production'){
    console.log('initializelabel', getState())
    }
    await dispatch(updateState({
      tableData: [],
      tableTotals: 0,
      tableCurrent: 1,
      tablePageSize: 10,
      tableLoading: false,
      modalLoading: false,

      modalLoading3: false,
      modalAddVisible3: false,
      modalAddConfirmLoading3: false,
      modalEditVisible3: false,
      modalEditConfirmLoading3: false,
      // 编辑字段
      intro:"",
      name:"",
      description:"",
      keyword:"",
      title:"",
      id:"", //编辑选项ID
      //频道管理字段
      ItemlList:[],
      //
      buttonAddLoading: false,
      buttonSearchLoading: false,
      buttonResetLoading: false,

      //搜索条件
      searchid: "",
      searchname: "",
//下拉菜单
      positionType:[],
    }))

    const params = getState().label
    dispatch(updateState({tableLoading: true}))
    await ajaxAdList(dispatch, {...params})
    positionType(dispatch)
    dispatch(updateState({tableLoading: false}))
  }

const searchAdList = (values) =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production'){
    console.log('searchAdList', getState(), values)
    }

    dispatch(updateState({...values, tableLoading: true, buttonSearchLoading: true}))

    const params = getState().label
    await ajaxAdList(dispatch, {...params})
    dispatch(updateState({tableLoading: false, buttonSearchLoading: false}))
  }


const resetAdList = (values) =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production'){
    console.log('resetAdList', getState(), values)
    }
    dispatch(updateState({...values, tableLoading: true, buttonResetLoading: true}))

    const params = getState().label

    await ajaxAdList(dispatch, {...params})
    dispatch(updateState({tableLoading: false, buttonResetLoading: false}))
  }

const changePage = (values) =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production'){
    console.log('changePage', getState(), values)
    }
    dispatch(updateState({...values, tableLoading: true}))
    const params = getState().label

    await ajaxAdList(dispatch, {...params})

    dispatch(updateState({tableLoading: false}))
  }

const confirmDelete = (id) =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production'){
    console.log('confirmDelete', getState(), id)
    }
    dispatch(updateState({tableLoading: true}))
    const params = getState().label

    await ajaxDeleteNav(id)
    await ajaxAdList(dispatch, {...params})

    dispatch(updateState({tableLoading: false}))
  }

const toggleStatus = (id, status) =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('toggleStatus', getState(), status)
    }
    dispatch(updateState({tableLoading: true}))
    const params = getState().label

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
    if (process.env.NODE_ENV !== 'production'){
    console.log('addNav', getState(), values)
    }
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
    if (process.env.NODE_ENV !== 'production'){
    console.log('openEditNavModal', getState(), id)
    }
    dispatch(updateState({modalEditVisible: true, modalLoading: true}))
    const params = getState().label

    await ajaxNavEditInfo(dispatch, id)

    dispatch(updateState({modalLoading: false, id: id}))
  }
const openChannelEditNavModal = (id) =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production'){
    console.log('openChannelEditNavModal', getState(), id)
    }
    dispatch(updateState({modalEditVisible2: true, modalLoading2: true}))
    const params = getState().label

    await ajaxChannelEditInfo(dispatch, id)

    dispatch(updateState({modalLoading2: false, id: id}))
  }
const openItemEditNavModal = (value) =>
  async (dispatch, getState) => {
    dispatch(updateState({modalEditVisible3: true, modalLoading3: true}))
    const params = getState().label

    await ajaxItemEditInfo(dispatch, value)

    dispatch(updateState({modalLoading3: false,}))
  }
const editNav = (values) =>
  async (dispatch, getState) => {
    if (process.env.NODE_ENV !== 'production'){
    console.log('editNav', getState(), values)
    }
    dispatch(updateState({modalEditConfirmLoading: true}))
    const params = getState().label

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
    if (process.env.NODE_ENV !== 'production'){
    console.log('editNav', getState(), values)
    }
    dispatch(updateState({modalEditConfirmLoading2: true}))
    const params = getState().label

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
    if (process.env.NODE_ENV !== 'production'){
    console.log('editNav', getState(), values)
    }
    dispatch(updateState({modalEditConfirmLoading3: true}))
    const params = getState().label

    await ajaxItemNav(dispatch, values)
    dispatch(updateState({tableLoading: true, modalEditConfirmLoading3: false, modalEditVisible3: false}))
    await ajaxAdList(dispatch, {...params})
    dispatch(updateState({
      channel_id:"",
      column_id:"",
      ItemlList: [],
    }))
  }
const removeitem = (values, remove) =>
  async (dispatch, getState) => {
    const params = getState().label

    await ajaxremoveitem(dispatch, values, {...params})
      .then(() => {
        if (process.env.NODE_ENV !== 'production'){
        console.log('removeitem sucess!')
        }
          remove()
        }
      )
      .catch(()=>console.error('removeitem fail!'))



    // dispatch(updateState({
    //   id:"",
    //   ItemlList:[],
    // }))
  }
export {
  updateState,
  initializelabel,
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
