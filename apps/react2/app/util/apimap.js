'use strict';
export default {

  //服务管理
  serverList: ['/property/service/list', 'get'], //服务列表
  serverCheck: ['/property/service/check', 'post'], //启用/停用服务
  parentName: ['/property/service/parent', 'get'], //查找父级服务
  serverUpdate: ['/property/service/update', 'post'],//添加/编辑服务
  serverShow: ['/property/service/show', 'get'],//查看服务详情
  //小区管理
  statusChange: ['/property/community/check', 'get'], //上线下线
  getArea: ['/property/house/area', 'get'], //获取省市
  serverLists: ['/property/service/service', 'get'], //获取开通服务
  getcompanyList: ['/property/company/company', 'get'], //获取开启物业公司
  updateCommunity: ['/property/community/update', 'post'], //新增编辑小区
  communityShow: ['/property/community/show', 'post'], //查看小区详情
  communityList: ['/property/community/lists', 'get'], //服务列表
  //物业公司管理
  companyList: ['/property/company/list', 'post'], //物业公司列表
  companyOpenDown: ['/property/company/open-down', 'post'], //启用停用物业公司
  companyParent: ['/property/company/parent', 'post'], //查找父级物业公司
  companyUpdate: ['/property/company/update', 'post'], //添加/编辑物业公司
  companyShow: ['/property/company/show', 'post'], //查看物业公司

  billExport: ['/property/bill/export', 'get'],
  billLists: ['/property/bill/lists', 'post'],
  billShow: ['/property/bill/show', 'post'],
  serviceService: ['/property/service/service', 'get'],
  serviceBillList: ['/property/service/bill-list', 'get'],

  logout: ['/property/user/login-out', 'post'],
  resetPassword: ['/property/user/change-password', 'post']
};
