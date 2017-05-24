import React from 'react'
import {Card, Pagination} from 'antd'
import connect from 'react-redux/es/connect/connect'
import {notRepeating}from '../../util/util'
import {validator}from '../../util/validator'
import Breadcrumb from '../../Components/Breadcrumb/index.jsx'
import Table from './Components/Table.jsx'
import Modal from './Components/Modal.jsx'
import Search from './Components/Search.jsx'
import {changeSelectChannels} from '../App/task'
import TableHeader from './Components/TableHeader.jsx'
import {history} from '../../redux/store'

import {
  changeSearchChannel,
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
  openReplyModal,
  reply
} from  './task'

function Question({dispatch, question, app}) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('questionProps: ', question)
  }

  const breadcrumbProps = {
    breadcrumbs: [ {
      name: '内容管理',
    }, {
      name: '问答管理',
    }]
  }

  const searchProps = {
    selectChannels: app.selectChannels,
    selectColumns: app.selectColumns,
    searchchannelid: question.searchchannelid,
    searchcolumnid: question.searchcolumnid,
    searchChannel: question.searchChannel,
    buttonResetLoading: question.buttonResetLoading,
    buttonSearchLoading: question.buttonSearchLoading,
    onSearch(values){
      notRepeating(() => dispatch(searchAdList(values)))
    },
    onReset(values){
      notRepeating(() => dispatch(resetAdList(values)))
    },
    changeSelectChannels(value){
      dispatch(changeSelectChannels(value))
      dispatch(changeSearchChannel(value))
    }
  }

  const tableHeaderProps = {
    loading: question.buttonAddLoading,
    onClick(){
      history.push('/question/add')
    }
  }

  const tableProps = {
    dataSource: question.tableData,
    loading: question.tableLoading,
    onConfirmDelete(id){
      notRepeating(() => dispatch(confirmDelete(id)))
    },
    toggleStatus(id, status){
      notRepeating(() => dispatch(toggleStatus(id, status)))
    },
    onReply(id){
      dispatch(openReplyModal(id))
    },
    onEdit(id){
      history.push('/question/edit')
      dispatch(openEditNavModal(id))
    }
  }

  const paginationProps = {
    className: 'y-card-pagination',
    showQuickJumper: true,
    showTotal: (total, range) => `共搜索到 ${question.tableTotals} 条数据`,
    // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    defaultCurrent: 1,
    current: question.tableCurrent,
    defaultPageSize: 10,
    total: question.tableTotals,
    onChange(page){
      dispatch(changePage({tableCurrent: page}))
    }
  }

  const modalAddProps = {
    title: '回复',
    visible: question.modalAddVisible,
    confirmLoading: question.modalAddConfirmLoading,
    id: question.id,
    async onOk(values, resetForm){
      await notRepeating(() => dispatch(reply(values)))
      resetForm()
    },
    onCancel(){
      dispatch(closeModal())
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
    </div>
  )
}

export default connect(state => {
  return {
    question: state.question,
    app: state.app,
  }
})(Question)
