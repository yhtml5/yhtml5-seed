import React from 'react'
import {Table, Card, Popconfirm} from 'antd'
import {renderColumns, renderStatus, renderNavType} from '../../../Components/Table/index.jsx'
import {createTimestamp, createNonceStr} from '../../../util/security'

function NewTable({loading, dataSource, onConfirmDelete, toggleStatus, onEdit}) {
  const columns = [{
    key: '1',
    title: '编号',
    dataIndex: 'serial_no',
    render: renderColumns
  }, {
    key: '2',
    title: '导航名称',
    dataIndex: 'name',
    render: renderColumns
  }, {
    key: '3',
    title: '导航类型',
    dataIndex: 'type',
    render: renderNavType
  }, {

    key: '4',
    title: '状态',
    dataIndex: 'status',
    render: renderStatus
  }, {
    key: '5',
    title: '排序',
    dataIndex: 'sort_order',
    render: renderColumns
  }, {
    key: '6',
    title: '操作',
    dataIndex: 'option',
    render: (text, record) =>
      <span>
        <Popconfirm title={`确定要${(Number(record.status) === 1) ? '隐藏' : '显示' }吗?`}
                    onConfirm={() => toggleStatus(record.id, (Number(record.status) === 1) ? 2 : 1)}
                    onCancel={false}
                    okText="确定"
                    cancelText="取消">
        <a className="table-operating">{(Number(record.status) === 1) ? '隐藏' : '显示' }</a>
        </Popconfirm>
        <a onClick={() => onEdit(record.id)} className="table-operating">编辑</a>
        <Popconfirm title="确定要删除吗?"
                    onConfirm={() => onConfirmDelete(record.id)}
                    onCancel={false}
                    okText="确定"
                    cancelText="取消">
          <a className="table-operating">删除</a>
        </Popconfirm>
      </span>
  }]

  return (
    <Table
      className='y-table'
      rowKey={record => record.channel_id}
      columns={columns}
      bordered={true}
      loading={loading}
      dataSource={dataSource}
      pagination={false}
    />
  )
}

export default NewTable

