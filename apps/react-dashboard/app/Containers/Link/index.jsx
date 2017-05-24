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
  uploadImg,
  showchange
} from  './task'

function Link({dispatch, link}) {
  console.log('linkProps: ', link)

  const breadcrumbProps = {
    breadcrumbs: [ {
      name: '页面管理',
    }, {
      name: '友情链接管理',
    }]
  }

  const searchProps = {
    buttonResetLoading: link.buttonResetLoading,
    buttonSearchLoading: link.buttonSearchLoading,
    onSearch(values){
      notRepeating(() => dispatch(searchAdList(values)))
    },
    onReset(values){
      notRepeating(() => dispatch(resetAdList(values)))
    }
  }

  const tableHeaderProps = {
    loading: link.buttonAddLoading,
    onClick(){
      dispatch(openModal())
    }
  }

  const tableProps = {
    dataSource: link.tableData,
    loading: link.tableLoading,
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
    showTotal: (total, range) => `共搜索到 ${link.tableTotals} 条数据`,
    // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    defaultCurrent: 1,
    current: link.tableCurrent,
    defaultPageSize: 10,
    total: link.tableTotals,
    onChange(page){
      dispatch(changePage({tableCurrent: page}))
    }
  }

  const modalAddProps = {
    title: '新增友情链接',
    visible: link.modalAddVisible,
    confirmLoading: link.modalAddConfirmLoading,
    positionType: link.positionType,
    type: link.type,
    status: link.status,
    uploadToken: link.uploadToken,
    isUpload: link.isUpload,
    imgShow:link.imgShow,
    async onOk(values, resetForm){
      await notRepeating(() => dispatch(addNav(values)))
      resetForm()
    },
    onCancel(){
      dispatch(closeModal())
    },
    uploadImg(value){
      dispatch(uploadImg(value))
    },
    showchange(value){
      var status=""
      link.image==""||link.image==undefined? status=true:status=false;
      dispatch(showchange(value,status))
    },
  }

  const modalEditProps = {
    title: '编辑友情链接',
    visible: link.modalEditVisible,
    modalLoading: link.modalLoading,
    confirmLoading: link.modalEditConfirmLoading,
    image: link.image,
    link_url: link.link_url,
    name: link.name,
    type: link.type,
    status: link.status,
    sort_order:link.sort_order,
    positionType: link.positionType,
    uploadToken: link.uploadToken,
    isUpload: link.isUpload,
    imgShow:link.imgShow,
    id: link.id,
    async onOk(values, resetForm){
      await notRepeating(() => dispatch(editNav(values)))
      resetForm()
    },
    onCancel(){
      dispatch(closeModal())
    },
    uploadImg(value){
      dispatch(uploadImg(value))
    },
    showchange(value){
      var status=""
      link.image==""||link.image==undefined? status=true:status=false;
      dispatch(showchange(value,status))
    },
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
    link: state.link,
  }
})(Link)
