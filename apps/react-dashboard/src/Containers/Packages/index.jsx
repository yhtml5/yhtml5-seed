import React from 'react'
import { Card, Pagination } from 'antd'
import connect from 'react-redux/es/connect/connect'
import { history } from '../../redux/store'
import Breadcrumb from '../../Components/Breadcrumb/index.jsx'
import { notRepeating } from '../../util/util'
import Table from './Components/Table.jsx'
import TableHeader from './Components/TableHeader.jsx'
import {
  preview, toggleRecommendation, toggleStatus,
  searchLiveList, changeSearchChannel, resetLiveList, changePage, toEdit
} from './task'

function Component({ dispatch, props, app }) {
  process.env.NODE_ENV === 'production' || console.log('PackageProps: ', props, app)

  const breadcrumbProps = {
    breadcrumbs: [{
      name: '内容管理',
    }, {
      name: '套餐管理',
    }]
  }

  const tableHeaderProps = {
    onClick() {
      history.push('/packages/add')
    }
  }

  const tableProps = {
    dataSource: props.tableData,
    loading: props.tableLoading,
    toggleStatus(id, status) {
      notRepeating(() => dispatch(toggleStatus(id, status)))
    },
    toggleRecommendation(id, status) {
      notRepeating(() => dispatch(toggleRecommendation(id, status)))
    },
    onEdit(id) {
      notRepeating(() => dispatch(toEdit(id)))
    },
    onPreview(id) {
      notRepeating(() => dispatch(preview(id)))
    }
  }

  return (
    <div>
      <Breadcrumb {...breadcrumbProps} />
      <Card className="y-m-b-40">
        <TableHeader {...tableHeaderProps} />
        <Table {...tableProps} />
      </Card>
    </div>
  )
}

export default connect(state => {
  return {
    app: state.app,
    props: state.packages,
  }
})(Component)
