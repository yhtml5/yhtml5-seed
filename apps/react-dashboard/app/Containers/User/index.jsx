import React from 'react'
import {Card, Pagination} from 'antd'
import connect from 'react-redux/es/connect/connect' // import {connect} from 'react-redux'
import Layout from '../Layout/index.jsx'
import {validator}from '../../util/validator'
import Breadcrumb from '../../Components/Breadcrumb/index.jsx'
import Table from './Components/Table.jsx'
import Search from './Components/Search.jsx'
import TableHeader from './Components/TableHeader.jsx'
import {searchUserList, resetUserList} from  './task'

function User({dispatch, user}) {
  console.log('UserProps: ', user)

  const breadcrumbProps = {
    breadcrumbs: [{
      name: '首页',
    }, {
      name: '模块',
    }, {
      name: '列表',
    }, {
      name: '详情',
    }]
  }

  const searchProps = {
    buttonResetLoading: user.buttonResetLoading,
    buttonSearchLoading: user.buttonSearchLoading,
    onOk(){
      console.log('onOk')
    },
    onSearch(number, timeStart, timeEnd){
      dispatch(searchUserList(number, timeStart, timeEnd))
    },
    onReset(){
      dispatch(resetUserList())
    }
  }

  const tableHeaderProps = {
    loading: user.buttonAddLoading,
    onExport(){
      // notRepeating(() => dispatch(exportBill()))
    }
  }

  const tableProps = {
    dataSource: user.tableData,
    loading: user.tableLoading
  }

  const paginationProps = {
    className: 'y-card-pagination',
    showQuickJumper: true,
    showTotal: (total, range) => `共搜索到 ${user.tableTotals} 条数据`,
    // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    defaultCurrent: 1,
    current: user.tableCurrent,
    defaultPageSize: 10,
    total: user.tableTotals,
    onChange(page){
      // dispatch(changePage(page))
    }
  }

  return (
    <Layout>
      <Breadcrumb {...breadcrumbProps}/>
      <Search {...searchProps}/>
      <Card className="y-m-b-40">
        <TableHeader {...tableHeaderProps}/>
        <Table {...tableProps}/>
        <Pagination {...paginationProps}/>
      </Card>
    </Layout>
  )
}

export default connect(state => {
  return {
    user: state.user,
  }
})(User)
