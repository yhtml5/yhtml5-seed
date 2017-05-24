import React from 'react'
import {Table, Card, Popconfirm} from 'antd'
import {renderColumns, renderStatus, renderLiveType} from '../../../Components/Table/index.jsx'

function NewTable({loading, dataSource, onConfirmDelete, toggleStatus, onEdit}) {
  const columns = [{
    key: 'id',
    title: '直播编号',
    dataIndex: 'id',
    render: renderColumns
  }, {
    key: 'name',
    title: '直播标题',
    dataIndex: 'name',
    render: renderColumns
  }, {
    key: 'channel_name',
    title: '所属频道',
    dataIndex: 'channel_name',
    render: renderColumns
  }, {
    key: 'column_name',
    title: '所属栏目',
    dataIndex: 'column_name',
    render: renderColumns
  }, {
    key: 'type',
    title: '类型',
    dataIndex: 'type',
    render: renderLiveType
  }, {
    key: 'status',
    title: '状态',
    dataIndex: 'status',
    render: renderStatus
  }, {
    key: 'sort_order',
    title: '排序',
    dataIndex: 'sort_order',
    render: renderColumns
  }, {
    key: 'option',
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
      rowKey={record => record.id}
      columns={columns}
      bordered={true}
      loading={loading}
      dataSource={dataSource}
      pagination={false}
    />
  )
}

export default NewTable

