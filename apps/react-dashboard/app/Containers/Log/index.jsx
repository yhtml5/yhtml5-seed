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
import {history} from '../../redux/store'
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

function Log({dispatch, log,app}) {
  if (process.env.NODE_ENV !== 'production'){
  console.log('logProps: ', log)
  }


  const breadcrumbProps = {
    breadcrumbs: [{
      name: '内容管理',
    }, {
      name: '日志管理',
    }]
  }

  const searchProps = {
    selectChannels: app.selectChannels,
    buttonResetLoading: log.buttonResetLoading,
    buttonSearchLoading: log.buttonSearchLoading,
    onSearch(values){
      notRepeating(() => dispatch(searchAdList(values)))
    },
    onReset(values){
      notRepeating(() => dispatch(resetAdList(values)))
    }
  }

  const tableHeaderProps = {
    loading: log.buttonAddLoading,
    onClick(){
      history.push('/log/add')
    }
  }

  const tableProps = {
    dataSource: log.tableData,
    loading: log.tableLoading,
    onConfirmDelete(id){
      notRepeating(() => dispatch(confirmDelete(id)))
    },
    toggleStatus(id, status){
      notRepeating(() => dispatch(toggleStatus(id, status)))
    },
    onEdit(id){
      history.push('/log/edit')
      dispatch(openEditNavModal(id))
    }
  }

  const paginationProps = {
    className: 'y-card-pagination',
    showQuickJumper: true,
    showTotal: (total, range) => `共搜索到 ${log.tableTotals} 条数据`,
    // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    defaultCurrent: 1,
    current: log.tableCurrent,
    defaultPageSize: 10,
    total: log.tableTotals,
    onChange(page){
      dispatch(changePage({tableCurrent: page}))
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
    </div>
  )
}

export default connect(state => {
  return {
    log: state.log,
    app:state.app,
  }
})(Log)
