import React from 'react'
import {Table, Card, Popconfirm} from 'antd'
import {renderColumns} from '../../../Components/Table/index.jsx'

function NewTable({loading, dataSource, toggleStatus, onEdit, channelEdit, itemEdit}) {
  const columns = [{
    key: '1',
    title: '频道名称',
    dataIndex: 'channel_name',
    render: renderColumns
  }, {
    key: '2',
    title: '栏目名称',
    dataIndex: 'column_name',
    render: renderColumns
  }, {
    key: '4',
    title: '标签组',
    dataIndex: 'labels',
    render: (text, record) =>
      <div style={{maxWidth: "200px"}}>
        {
          text.map((value, index) => {
            return <span style={{marginLeft: "5px"}}> {value.name} </span>
          })
        }
      </div>
  }, {
    key: '6',
    title: '操作',
    dataIndex: 'option',
    render: (text, record) =>
      <span>
        <a onClick={() => itemEdit(record)} className="table-operating">编辑标签</a>
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

