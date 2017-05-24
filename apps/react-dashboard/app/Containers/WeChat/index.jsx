import React from 'react'
import { Card, Pagination } from 'antd'
import connect from 'react-redux/es/connect/connect'
import { notRepeating } from '../../util/util'
import { validator } from '../../util/validator'
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
} from './task'

function Wechat({ dispatch, weChat }) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('weChatProps: ', weChat)
  }

  const breadcrumbProps = {
    breadcrumbs: [{
      name: '内容管理',
    }, {
      name: '微信群管理',
    }]
  }

  const searchProps = {
    buttonResetLoading: weChat.buttonResetLoading,
    buttonSearchLoading: weChat.buttonSearchLoading,
    onSearch(values) {
      notRepeating(() => dispatch(searchAdList(values)))
    },
    onReset(values) {
      notRepeating(() => dispatch(resetAdList(values)))
    }
  }

  const tableHeaderProps = {
    loading: weChat.buttonAddLoading,
    onClick() {
      dispatch(openModal())
    }
  }

  const tableProps = {
    dataSource: weChat.tableData,
    loading: weChat.tableLoading,
    onConfirmDelete(id) {
      notRepeating(() => dispatch(confirmDelete(id)))
    },
    toggleStatus(id, status) {
      notRepeating(() => dispatch(toggleStatus(id, status)))
    },
    onEdit(id) {
      dispatch(openEditNavModal(id))
    }
  }


  const modalAddProps = {
    title: '新增微信群',
    visible: weChat.modalAddVisible,
    confirmLoading: weChat.modalAddConfirmLoading,
    positionType: weChat.positionType,
    status: weChat.status,
    uploadToken: weChat.uploadToken,
    isUpload: weChat.isUpload,
    imgShow: weChat.imgShow,
    async onOk(values, resetForm) {
      await notRepeating(() => dispatch(addNav(values)))
      resetForm()
    },
    onCancel() {
      dispatch(closeModal())
    },
    uploadImg(value) {
      dispatch(uploadImg(value))
    }
  }

  const modalEditProps = {
    title: '编辑微信群',
    visible: weChat.modalEditVisible,
    modalLoading: weChat.modalLoading,
    confirmLoading: weChat.modalEditConfirmLoading,
    intro: weChat.intro,
    page_id: weChat.page_id,
    name: weChat.name,
    status: weChat.status,
    sort_order: weChat.sort_order,
    qr_code: weChat.qr_code,
    positionType: weChat.positionType,
    uploadToken: weChat.uploadToken,
    isUpload: weChat.isUpload,
    imgShow: weChat.imgShow,
    id: weChat.id,
    async onOk(values, resetForm) {
      await notRepeating(() => dispatch(editNav(values)))
      resetForm()
    },
    onCancel() {
      dispatch(closeModal())
    },
    uploadImg(value) {
      dispatch(uploadImg(value))
    },
  }

  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Search {...searchProps} />
      <Card className="y-m-b-40">
        <TableHeader {...tableHeaderProps} />
        <Table {...tableProps} />
      </Card>
      <Modal {...modalAddProps} />
      <Modal {...modalEditProps} />
    </div>
  )
}

export default connect(state => {
  return {
    weChat: state.weChat,
  }
})(Wechat)
