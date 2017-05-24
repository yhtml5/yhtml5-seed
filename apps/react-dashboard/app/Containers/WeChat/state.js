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
  // 新增编辑字段
  intro:"",
  name:"",
  page_id:"",
  qr_code:"",
  sort_order:"",
  id:"", //编辑选项ID
  //
  buttonAddLoading: false,
  buttonSearchLoading: false,
  buttonResetLoading: false,

  //搜索条件
  wxname:"",
//下拉菜单
  positionType:[], //广告位类型
  //图片上传相关参数
  uploadToken:"",
  isUpload:true,
}

export default state

