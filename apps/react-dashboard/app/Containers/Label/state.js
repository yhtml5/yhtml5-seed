const state = {
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
  channel_id:"",
  column_id:"",
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
}

export default state

