import React from 'react'
import {Table, Card, Popconfirm} from 'antd'
import {renderColumns} from '../../../Components/Table/index.jsx'

function NewTable({loading, dataSource, toggleStatus, onEdit, channelEdit, itemEdit}) {
  const columns = [{
    key: '1',
    title: '频道编号',
    dataIndex: 'serial_no',
    render: renderColumns
  }, {
    key: '2',
    title: '频道名称',
    dataIndex: 'name',
    render: renderColumns
  }, {
    key: '3',
    title: '关联模板',
    dataIndex: 'template_name',
    render: renderColumns
  }, {
    key: '4',
    title: '包含栏目',
    dataIndex: 'columns',
    render: (text, record) =>
      <div style={{maxWidth: "200px"}}>{
        text.map((value, index) => {
          return <span style={{marginLeft: "5px"}}> {value.name} </span>
        })
      }</div>
  }, {
    key: '5',
    title: '状态',
    dataIndex: 'status',
    render: (text, record) =>
      <span>{text == "1" ? "启用" : "禁用"}</span>
  }, {
    key: '6',
    title: '操作',
    dataIndex: 'option',
    render: (text, record) =>
      <span>
        {record.name_el != "site" ?
        <Popconfirm title={`确定要${(Number(record.status) === 1) ? '禁用' : '启用' }吗?`}
                    onConfirm={() => toggleStatus(record.id, (Number(record.status) === 1) ? 2 : 1)}
                    onCancel={false}
                    okText="确定"
                    cancelText="取消">
        <a className="table-operating">{(Number(record.status) === 1) ? '禁用' : '启用' }</a>
        </Popconfirm>
          :""}
        <a onClick={() => onEdit(record.id)} className="table-operating">编辑</a>
        {record.name_el == "site" ? <a onClick={() => channelEdit(record.id)} className="table-operating">频道管理</a> : ""}
        {record.has_column == "1" ? <a onClick={() => itemEdit(record.id)} className="table-operating">编辑栏目</a> : ""}


      </span>
  }]

  return (
    <Table
      className='y-table'
      rowKey={record => JSON.stringify(record)}
      columns={columns}
      bordered={true}
      loading={loading}
      dataSource={dataSource}
      pagination={false}
    />
  )
}

export default NewTable

