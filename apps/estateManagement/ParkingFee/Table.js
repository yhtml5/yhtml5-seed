import React from 'react'
import {Table, Card} from 'antd'
import {validator} from '../../app/validator'

function NewTable({loading, dataSource}) {
  const columns = [{
    key: 1,
    title: '缴费时间',
    dataIndex: 'paid_at',
    render: renderColumns
  }, {
    key: 2,
    title: '缴费金额',
    dataIndex: 'amount',
    render: renderColumns
  }, {
    key: 3,
    title: '交易流水号',
    dataIndex: 'trade_no',
    render: renderColumns
  }, {
    key: 4,
    title: '支付账号',
    dataIndex: 'buyer_login_id',
    render: renderColumns
  }, {
    key: 5,
    title: '备注',
    dataIndex: 'note',
    render: renderColumns
  }]

  function renderColumns(text, record) {
    return (validator.isStringEmpty(text)) ? '--' : text
  }

  return (
    <Table
      style={{minHeight: '300px'}}
      rowKey={record => record.id}
      columns={columns}
      loading={loading}
      dataSource={dataSource}
      pagination={false}
    />
  )
}

export default NewTable

