import React from 'react'
import {Table, Card} from 'antd'
import {renderColumns} from '../../../Components/Table/index.jsx'

function NewTable({loading, dataSource}) {
  const columns = [{
    key: 'trade_no',
    title: '交易流水号',
    dataIndex: 'trade_no',
    render: renderColumns
  }, {
    key: 'paid_at',
    title: '缴费时间',
    dataIndex: 'paid_at',
    render: renderColumns
  }, {
    key: 'amount',
    title: '缴费金额',
    dataIndex: 'amount',
    render: renderColumns
  }, {

    key: 'buyer_login_id',
    title: '支付账号',
    dataIndex: 'buyer_login_id',
    render: renderColumns
  }, {
    key: 'note',
    title: '备注',
    dataIndex: 'note',
    render: renderColumns
  }]

  return (
    <Table
      style={{minHeight: '200px'}}
      rowKey={record => record.id}
      columns={columns}
      loading={loading}
      dataSource={dataSource}
      pagination={false}
    />
  )
}

export default NewTable

