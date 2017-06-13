import React from 'react'
import {Card, Pagination} from 'antd'
import connect from 'react-redux/es/connect/connect'
import Breadcrumb from '../../Components/Breadcrumb/index.jsx'
import {notRepeating}from '../../util/util'
import {selectChannels, resetChannelsColumns} from '../App/task'
import Table from './Components/Table.jsx'
import Modal from './Components/Modal.jsx'
import Search from './Components/Search.jsx'
import TableHeader from './Components/TableHeader.jsx'
import {searchNavigationList, resetNavigationList, changePage, confirmDelete, toggleStatus, openModal, closeModal, addNav, editNav, openEditNavModal, changeNavType} from  './task'

function Navigation({dispatch, app, navigation}) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('NavigationProps: ', navigation)
  }

  const breadcrumbProps = {
    breadcrumbs: [ {
      name: '页面管理',
    }, {
      name: '导航管理',
    }]
  }

  const searchProps = {
    selectChannels: app.selectChannels,
    buttonResetLoading: navigation.buttonResetLoading,
    buttonSearchLoading: navigation.buttonSearchLoading,
    onSearch(values){
      notRepeating(() => dispatch(searchNavigationList(values)))
    },
    onReset(values){
      console.log(values,111)
      notRepeating(() => dispatch(resetNavigationList(values)))
    }
  }

  const tableHeaderProps = {
    loading: navigation.buttonAddLoading,
    onClick(){
      dispatch(openModal())
    }
  }

  const tableProps = {
    dataSource: navigation.tableData,
    loading: navigation.tableLoading,
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
    showTotal: (total, range) => `共搜索到 ${navigation.tableTotals} 条数据`,
    // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    defaultCurrent: 1,
    current: navigation.tableCurrent,
    defaultPageSize: 10,
    total: navigation.tableTotals,
    onChange(page){
      dispatch(changePage({tableCurrent: page}))
    }
  }

  const modalAddProps = {
    title: '新增导航',
    selectChannels: app.selectChannels,
    visible: navigation.modalAddVisible,
    navTypes: navigation.navTypes,
    modalType: navigation.modalType,
    confirmLoading: navigation.modalAddConfirmLoading,
    async onOk(values, resetForm){
      await notRepeating(() => dispatch(addNav(values)))
      resetForm()
    },
    onCancel(){
      dispatch(closeModal())
    },
    onChange(value){
      dispatch(changeNavType(value))
    }
  }

  const modalEditProps = {
    title: '编辑导航',
    selectChannels: app.selectChannels,
    visible: navigation.modalEditVisible,
    navTypes: navigation.navTypes,
    confirmLoading: navigation.modalEditConfirmLoading,
    modalLoading: navigation.modalLoading,
    modalChannelId: navigation.modalChannelId,
    modalLinkUrl: navigation.modalLinkUrl,
    modalName: navigation.modalName,
    modalSort: navigation.modalSort,
    modalType: navigation.modalType,
    modalChannel: navigation.modalChannel,
    async onOk(values, resetForm){
      await notRepeating(() => dispatch(editNav(values)))
      resetForm()
    },
    onCancel(){
      dispatch(closeModal())
    },
    onChange(value){
      dispatch(changeNavType(value))
    }
  }

  return (
    <div>
      <Breadcrumb {...breadcrumbProps}/>
      <Search {...searchProps}/>
      <Card className="y-m-b-40">
        <TableHeader {...tableHeaderProps}/>
        <Table {...tableProps}/>
      </Card>
      <Modal {...modalAddProps}/>
      <Modal {...modalEditProps}/>
    </div>
  )
}

export default connect(state => {
  return {
    navigation: state.navigation,
    app: state.app,
  }
})(Navigation)
