import React from 'react'
import {Card, Pagination} from 'antd'
import connect from 'react-redux/es/connect/connect'
import {notRepeating}from '../../util/util'
import {validator}from '../../util/validator'
import Breadcrumb from '../../Components/Breadcrumb/index.jsx'
import Table from './Components/Table.jsx'
import Modal from './Components/Modal.jsx'
import Search from './Components/Search.jsx'
import TableHeader from './Components/TableHeader.jsx'
import {
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
  uploadImg
} from  './task'

function Ad({dispatch, ad}) {
  console.log('AdProps: ', ad)

  const breadcrumbProps = {
    breadcrumbs: [ {
      name: '页面管理',
    }, {
      name: '广告管理',
    }]
  }

  const searchProps = {
    buttonResetLoading: ad.buttonResetLoading,
    buttonSearchLoading: ad.buttonSearchLoading,
    adBlowOptions: ad.adBlowOptions,
    onSearch(values){
      notRepeating(() => dispatch(searchAdList(values)))
    },
    onReset(values){
      notRepeating(() => dispatch(resetAdList(values)))
    }
  }

  const tableHeaderProps = {
    loading: ad.buttonAddLoading,
    onClick(){
      dispatch(openModal())
    }
  }

  const tableProps = {
    dataSource: ad.tableData,
    loading: ad.tableLoading,
    onConfirmDelete(id){
      notRepeating(() => dispatch(confirmDelete(id)))
    },
    toggleStatus(id, status){
      notRepeating(() => dispatch(toggleStatus(id, status)))
    },
    onEdit(id){
      dispatch(openEditNavModal(id))
    }
  }

  const paginationProps = {
    className: 'y-card-pagination',
    showQuickJumper: true,
    showTotal: (total, range) => `共搜索到 ${ad.tableTotals} 条数据`,
    // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    defaultCurrent: 1,
    current: ad.tableCurrent,
    defaultPageSize: 10,
    total: ad.tableTotals,
    onChange(page){
      dispatch(changePage({tableCurrent: page}))
    }
  }

  const modalAddProps = {
    title: '新增广告',
    visible: ad.modalAddVisible,
    confirmLoading: ad.modalAddConfirmLoading,
    adBlowOptions: ad.adBlowOptions,
    status: ad.status,
    uploadToken: ad.uploadToken,
    isUpload: ad.isUpload,
    async onOk(values, resetForm){
      await notRepeating(() => dispatch(addNav(values)))
      resetForm()
    },
    onCancel(){
      dispatch(closeModal())
    },
    uploadImg(value){
      dispatch(uploadImg(value))
    }
  }

  const modalEditProps = {
    title: '编辑广告',
    visible: ad.modalEditVisible,
    modalLoading: ad.modalLoading,
    confirmLoading: ad.modalEditConfirmLoading,
    ad_position_id: ad.ad_position_id,
    img_url: ad.img_url,
    link_url: ad.link_url,
    name: ad.name,
    sort_order: ad.sort_order,
    status: ad.status,
    adBlowOptions: ad.adBlowOptions,
    uploadToken: ad.uploadToken,
    isUpload: ad.isUpload,
    id: ad.id,
    async onOk(values, resetForm){
      await notRepeating(() => dispatch(editNav(values)))
      resetForm()
    },
    onCancel(){
      dispatch(closeModal())
    },
    uploadImg(value){
      dispatch(uploadImg(value))
    }
  }

  return (
    <div>
      <Breadcrumb {...breadcrumbProps}/>
      <Search {...searchProps}/>
      <Card className="y-m-b-40">
        <TableHeader {...tableHeaderProps}/>
        <Table {...tableProps}/>
        <Pagination {...paginationProps}/>
      </Card>
      <Modal {...modalAddProps}/>
      <Modal {...modalEditProps}/>
    </div>
  )
}

export default connect(state => {
  return {
    ad: state.ad,
  }
})(Ad)
