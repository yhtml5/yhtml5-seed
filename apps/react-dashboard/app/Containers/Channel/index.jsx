import React from 'react'
import {Card, Pagination} from 'antd'
import connect from 'react-redux/es/connect/connect'
import {notRepeating}from '../../util/util'
import {validator}from '../../util/validator'
import Breadcrumb from '../../Components/Breadcrumb/index.jsx'
import Table from './Components/Table.jsx'
import Modal from './Components/Modal.jsx'
import ChannelEditModal from './Components/ChannelEditModal.jsx'
import ItemEditModal from './Components/ItemEditModal.jsx'
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
  openChannelEditNavModal,
  openItemEditNavModal,
  closeChannelModal,
  closeItemModal,
  editItem,
  editchannelNav,
  removeitem
} from  './task'

function Channel({dispatch, channel}) {
  console.log('channelProps: ', channel)

  const breadcrumbProps = {
    breadcrumbs: [{
      name: '页面管理',
    }, {
      name: '频道管理',
    }]
  }

  const searchProps = {
    buttonResetLoading: channel.buttonResetLoading,
    buttonSearchLoading: channel.buttonSearchLoading,
    onSearch(values){
      notRepeating(() => dispatch(searchAdList(values)))
    },
    onReset(values){
      notRepeating(() => dispatch(resetAdList(values)))
    }
  }


  const tableProps = {
    dataSource: channel.tableData,
    loading: channel.tableLoading,
    toggleStatus(id, status){
      notRepeating(() => dispatch(toggleStatus(id, status)))
    },
    onEdit(id){
      dispatch(openEditNavModal(id))
    },
    channelEdit(id){
      dispatch(openChannelEditNavModal(id))
    },
    itemEdit(id){
      dispatch(openItemEditNavModal(id))
    }
  }


  const modalEditProps = {
    titles: '频道编辑',
    visible: channel.modalEditVisible,
    modalLoading: channel.modalLoading,
    confirmLoading: channel.modalEditConfirmLoading,
    intro: channel.intro,
    description: channel.description,
    name: channel.name,
    keyword: channel.keyword,
    title: channel.title,
    id: channel.id,
    async onOk(values, resetForm){
      await notRepeating(() => dispatch(editNav(values)))
      resetForm()
    },
    onCancel(){
      dispatch(closeModal())
    },
  }

  const channelModalEditProps = {
    titles: '频道编辑',
    visible: channel.modalEditVisible2,
    modalLoading: channel.modalLoading2,
    confirmLoading: channel.modalEditConfirmLoading2,
    channelList: channel.channelList,
    channeloption:channel.channeloption,
    id: channel.id,
    async onOk(values, resetForm){
      await notRepeating(() => dispatch(editchannelNav(values)))
      resetForm()
    },
    onCancel(){
      dispatch(closeChannelModal())
    },
  }
  const ItemEditModalProps={
    titles: '栏目编辑',
    visible: channel.modalEditVisible3,
    modalLoading: channel.modalLoading3,
    confirmLoading: channel.modalEditConfirmLoading3,
    channelList: channel.ItemlList,
    id: channel.id,
    async onOk(values, resetForm){
      await notRepeating(() => dispatch(editItem(values)))
      resetForm()
    },
    onCancel(){
      dispatch(closeItemModal())
    },

    async removeitem(values,remove){
      await notRepeating(() => dispatch(removeitem(values,remove)))
    }
  }
  return (
    <div>
      <Breadcrumb {...breadcrumbProps}/>
      <Search {...searchProps}/>
      <Card className="y-m-b-40">
        <Table {...tableProps}/>
      </Card>
      <Modal {...modalEditProps}/>
      <ChannelEditModal {...channelModalEditProps}/>
      <ItemEditModal {...ItemEditModalProps}/>
    </div>
  )
}

export default connect(state => {
  return {
    channel: state.channel,
  }
})(Channel)
