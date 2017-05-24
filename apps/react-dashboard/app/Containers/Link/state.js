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
}

export default state

