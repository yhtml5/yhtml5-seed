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
  buttonAddLoading: false,
  buttonSearchLoading: false,
  buttonResetLoading: false,
  //搜索条件
  adNum: "",
  adName: "",
  adStatus: "",
  searchchannelid: "",
  //下拉菜单
  positionType: [], //广告位类型
  //图片上传相关参数
  uploadToken: "",
  isUpload: true,
  //新增
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
  title: "",
}

export default state

