import React from 'react'
import { Card, Pagination } from 'antd'
import connect from 'react-redux/es/connect/connect'
import { history } from '../../redux/store'
import { validator } from '../../util/validator'
import Breadcrumb from '../../Components/Breadcrumb/index.jsx'
import { notRepeating } from '../../util/util'
import Table from './Components/Table.jsx'
import Search from './Components/Search.jsx'
import TableHeader from './Components/TableHeader.jsx'
import { searchLiveList, changeSearchChannel, resetLiveList, changePage, confirmDelete, toggleStatus, toEdit } from './task'

function Live({ dispatch, live, app }) {
  console.log('LiveProps: ', live, app)

  const breadcrumbProps = {
    breadcrumbs: [ {
      name: '页面管理',
    }, {
      name: '直播管理',
    }]
  }

  const searchProps = {
    selectChannels: app.selectChannels,
    buttonResetLoading: live.buttonResetLoading,
    buttonSearchLoading: live.buttonSearchLoading,
    async onSearch(values) {
      await notRepeating(() =>
        dispatch(searchLiveList(values))
      )
    },
    async onReset(values) {
      await notRepeating(() =>
        dispatch(resetLiveList(values))
      )
    }
  }

  const tableHeaderProps = {
    loading: live.buttonAddLoading,
    onClick() {
      history.push('/live/add')
    }
  }

  const tableProps = {
    dataSource: live.tableData,
    loading: live.tableLoading,
    onConfirmDelete(id) {
      notRepeating(() => dispatch(confirmDelete(id)))
    },
    toggleStatus(id, status) {
      notRepeating(() => dispatch(toggleStatus(id, status)))
    },
    onEdit(id) {
      dispatch(toEdit(id))
    }
  }

  const paginationProps = {
    className: 'y-card-pagination',
    showQuickJumper: true,
    showTotal: (total, range) => `共搜索到 ${live.tableTotals} 条数据`,
    // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    defaultCurrent: 1,
    current: live.tableCurrent,
    defaultPageSize: 10,
    total: live.tableTotals,
    onChange(page) {
      dispatch(changePage({ tableCurrent: page }))
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
    </div>
  )
}

export default connect(state => {
  return {
    app: state.app,
    live: state.live,
  }
})(Live)
