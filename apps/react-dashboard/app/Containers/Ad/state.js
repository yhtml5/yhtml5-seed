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
  ad_position_id: '',
  img_url: '',
  link_url: '',
  name: '11',
  sort_order: '',
  status: 1,
  id:"", //编辑选项ID
  //
  buttonAddLoading: false,
  buttonSearchLoading: false,
  buttonResetLoading: false,

  //搜索条件
  adNum:"",
  adName:"",
  adBlow:"",
  adStatus:"",
  // 下拉列表
  adBlowOptions:[], //所属广告位下拉
  //图片上传相关参数
  uploadToken:"",
  isUpload:true

}

export default state

