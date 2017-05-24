const state = {
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
  intro:"",
  name:"",
  description:"",
  keyword:"",
  title:"",
  id:"", //编辑选项ID
  //频道管理字段
  channelList:[],
  ItemlList:[],
  channeloption:[],
  //
  buttonAddLoading: false,
  buttonSearchLoading: false,
  buttonResetLoading: false,

  //搜索条件
  channelnum:"",
  channelname:"",
//下拉菜单
  positionType:[], //广告位类型
}

export default state

