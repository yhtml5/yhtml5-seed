import React from 'react'
import { Table, Card, Popconfirm } from 'antd'
import { isStringEmpty } from '../../../util/validator'
import { renderColumns, renderStatus, renderLiveType, renderRecommendation } from '../../../Components/Table/index.jsx'

function NewTable({ loading, dataSource, toggleRecommendation, toggleStatus, onEdit, onPreview }) {
  const columns = [{
    key: 'sort_order',
    title: '套餐排序',
    dataIndex: 'sort_order',
    render: renderColumns
  }, {
    key: 'name',
    title: '套餐名称',
    dataIndex: 'name',
    render: renderColumns
  }, {
    key: 'is_reco',
    title: '是否推荐到首页',
    dataIndex: 'is_reco',
    render: renderRecommendation
  }, {
    key: 'status',
    title: '状态',
    dataIndex: 'status',
    render: (text, record) => (isStringEmpty(text)) ? '--' : (Number(record.status) === 1) ? '上线' : '下线'
  }, {
    key: 'option',
    title: '操作',
    dataIndex: 'option',
    render: (text, record) =>
      <span>
        <a onClick={() => onPreview(record.id)} className="table-operating">预览</a>
        <a onClick={() => onEdit(record.id)} className="table-operating">编辑</a>
        <Popconfirm title={`确定要${(Number(record.status) === 1) ? '下线' : '上线'}吗?`}
          onConfirm={() => toggleStatus(record.id, (Number(record.status) === 1) ? 2 : 1)}
          onCancel={false}
          okText="确定"
          cancelText="取消">
          <a className="table-operating">{(Number(record.status) === 1) ? '下线' : '上线'}</a>
        </Popconfirm>
        <Popconfirm title={`确定要${(Number(record.is_reco) === 1) ? '取消推荐' : '推荐首页'}吗?`}
          onConfirm={() => toggleRecommendation(record.id, (Number(record.is_reco) === 1) ? 2 : 1)}
          onCancel={false}
          okText="确定"
          cancelText="取消">
          <a className="table-operating">{(Number(record.is_reco) === 1) ? '取消推荐' : '推荐首页'}</a>
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

