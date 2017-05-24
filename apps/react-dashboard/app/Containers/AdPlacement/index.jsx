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
  uploadImg
} from './task'

function AdPlacement({ dispatch, adPlacement }) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('adPlacementProps: ', adPlacement)
  }

  const breadcrumbProps = {
    breadcrumbs: [{
      name: '页面管理',
    }, {
      name: '广告位管理',
    }]
  }

  const searchProps = {
    buttonResetLoading: adPlacement.buttonResetLoading,
    buttonSearchLoading: adPlacement.buttonSearchLoading,
    onSearch(values) {
      notRepeating(() => dispatch(searchAdList(values)))
    },
    onReset(values) {
      notRepeating(() => dispatch(resetAdList(values)))
    }
  }

  const tableHeaderProps = {
    loading: adPlacement.buttonAddLoading,
    onClick() {
      dispatch(openModal())
    }
  }

  const tableProps = {
    dataSource: adPlacement.tableData,
    loading: adPlacement.tableLoading,
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

  const paginationProps = {
    className: 'y-card-pagination',
    showQuickJumper: true,
    showTotal: (total, range) => `共搜索到 ${adPlacement.tableTotals} 条数据`,
    // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    defaultCurrent: 1,
    current: adPlacement.tableCurrent,
    defaultPageSize: 10,
    total: adPlacement.tableTotals,
    onChange(page) {
      dispatch(changePage({ tableCurrent: page }))
    }
  }

  const modalAddProps = {
    title: '新增广告位',
    visible: adPlacement.modalAddVisible,
    confirmLoading: adPlacement.modalAddConfirmLoading,
    positionType: adPlacement.positionType,
    status: adPlacement.status,
    uploadToken: adPlacement.uploadToken,
    isUpload: adPlacement.isUpload,
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
    title: '编辑广告位',
    visible: adPlacement.modalEditVisible,
    modalLoading: adPlacement.modalLoading,
    confirmLoading: adPlacement.modalEditConfirmLoading,
    ad_size: adPlacement.ad_size,
    img_url: adPlacement.img_url,
    name: adPlacement.name,
    type: adPlacement.type,
    status: adPlacement.status,
    positionType: adPlacement.positionType,
    uploadToken: adPlacement.uploadToken,
    isUpload: adPlacement.isUpload,
    id: adPlacement.id,
    async onOk(values, resetForm) {
      await notRepeating(() => dispatch(editNav(values)))
      resetForm()
    },
    onCancel() {
      dispatch(closeModal())
    },
    uploadImg(value) {
      dispatch(uploadImg(value))
    }
  }

  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Search {...searchProps} />
      <Card className="y-m-b-40">
        <TableHeader {...tableHeaderProps} />
        <Table {...tableProps} />
        <Pagination {...paginationProps} />
      </Card>
      <Modal {...modalAddProps} />
      <Modal {...modalEditProps} />
    </div>
  )
}

export default connect(state => {
  return {
    adPlacement: state.adPlacement,
  }
})(AdPlacement)
