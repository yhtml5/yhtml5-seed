import React from 'react'
import {Table, Card, Popconfirm} from 'antd'
import {renderColumns} from '../../../Components/Table/index.jsx'

function NewTable({loading, dataSource, onConfirmDelete, toggleStatus, onEdit,onReply}) {
  const columns = [{
    key: '1',
    title: '问答编号',
    dataIndex: 'serial_no',
    render: renderColumns
  }, {
    key: '8',
    title: '发布者',
    dataIndex: 'question_author',
    render: renderColumns
  }, {

    key: '3',
    title: '所属频道',
    dataIndex: 'channels',
    render: (text, record) =>
      <span>{text!=null?text.name:""}</span>
  }, {

    key: '4',
    title: '所属栏目',
    dataIndex: 'columns',
    render:(text, record) =>
      <span>{text!=null?text.name:""}</span>
  }, {
    key: '9',
    title: '问答内容',
    dataIndex: 'intro',
    render:(text, record) =>
      <div style={{maxWidth:"300px"}}>{text}</div>
  },{
    key: '5',
    title: '排序',
    dataIndex: 'sort_order',
    render: renderColumns
  }, {
    key: '6',
    title: '状态',
    dataIndex: 'is_reply',
    render: (text, record) =>
      <span>{text=="1"?"已回复":"未回复"}</span>
  }, {
    key: '7',
    title: '操作',
    dataIndex: 'option',
    render: (text, record) =>
      <span>
        <Popconfirm title={`确定要${(Number(record.status) === 1) ? '屏蔽' : '显示' }吗?`}
                    onConfirm={() => toggleStatus(record.id, (Number(record.status) === 1) ? 2 : 1)}
                    onCancel={false}
                    okText="确定"
                    cancelText="取消">
        <a className="table-operating">{(Number(record.status) === 1) ? '屏蔽' : '显示' }</a>
        </Popconfirm>
        <a onClick={() => onEdit(record.id)} className="table-operating">编辑</a>
        <Popconfirm title="确定要删除吗?"
                    onConfirm={() => onConfirmDelete(record.id)}
                    onCancel={false}
                    okText="确定"
                    cancelText="取消">
          <a className="table-operating">删除</a>
        </Popconfirm>
        {record.is_reply=="2"? <a onClick={() => onReply(record.id)} className="table-operating">回复</a>:""}
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

