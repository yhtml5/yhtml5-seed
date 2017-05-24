import React from 'react'
import {Card, Pagination} from 'antd'
import connect from 'react-redux/es/connect/connect'
import {notRepeating}from '../../util/util'
import {validator}from '../../util/validator'
import Breadcrumb from '../../Components/Breadcrumb/index.jsx'
import Table from './Components/Table.jsx'
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

function Component({dispatch, label, app}) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('labelProps: ', label)
  }

  const breadcrumbProps = {
    breadcrumbs: [{
      name: '页面管理',
    }, {
      name: '标签管理',
    }]
  }

  const searchProps = {
    selectChannels: app.selectChannels,
    buttonResetLoading: label.buttonResetLoading,
    buttonSearchLoading: label.buttonSearchLoading,
    onSearch(values){
      notRepeating(() => dispatch(searchAdList(values)))
    },
    onReset(values){
      notRepeating(() => dispatch(resetAdList(values)))
    }
  }


  const tableProps = {
    dataSource: label.tableData,
    loading: label.tableLoading,
    itemEdit(value){
      dispatch(openItemEditNavModal(value))
    }
  }

  // const paginationProps = {
  //   className: 'y-card-pagination',
  //   showQuickJumper: true,
  //   showTotal: (total, range) => `共搜索到 ${label.tableTotals} 条数据`,
  //   // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  //   defaultCurrent: 1,
  //   current: label.tableCurrent,
  //   defaultPageSize: 10,
  //   total: label.tableTotals,
  //   onChange(page){
  //     dispatch(changePage({tableCurrent: page}))
  //   }
  // }
  const ItemEditModalProps = {
    titles: '标签编辑',
    visible: label.modalEditVisible3,
    modalLoading: label.modalLoading3,
    confirmLoading: label.modalEditConfirmLoading3,
    channelList: label.ItemlList,
    channel_id: label.channel_id,
    column_id: label.column_id,
    async onOk(values, resetForm){
      await notRepeating(() => dispatch(editItem(values)))
      resetForm()
    },
    onCancel(){
      dispatch(closeItemModal())
    },
  }
  return (
    <div>
      <Breadcrumb {...breadcrumbProps}/>
      <Search {...searchProps}/>
      <Card className="y-m-b-40">
        <Table {...tableProps}/>
        {/*<Pagination {...paginationProps}/>*/}
      </Card>
      <ItemEditModal {...ItemEditModalProps}/>
    </div>
  )
}

export default connect(state => {
  return {
    label: state.label,
    app: state.app
  }
})(Component)
