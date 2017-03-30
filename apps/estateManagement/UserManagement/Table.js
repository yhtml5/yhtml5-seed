import React from 'react'
import {Table, Popover} from 'antd'
import {validator} from '../../app/validator'

function NewTable({
  loading, dataSource, managerId,
  onChangeStatus, onEdit
}) {
  const columns = [{
    title: '姓名',
    dataIndex: 'name',
    render: renderColumns
  }, {
    title: '性别',
    dataIndex: 'sex',
    render: (text, record) => (record.sex == '1') ? '男' : '女'
  }, {
    title: '手机号',
    dataIndex: 'mobile',
    render: renderColumns
  }, {
    title: '菜单权限',
    dataIndex: 'menus',
    render: (text, record, index) => renderAuthorityDetails(record.menus)
  }, {
    title: '小区权限',
    dataIndex: 'communitys',
    render: (text, record, index) => renderAuthorityDetails(record.communitys)
  }, {
    title: '状态',
    dataIndex: 'is_enable',
    render: (text, record) => (record.is_enable == '1') ? '启用' : '禁用'
  }, {
    title: '操作',
    dataIndex: 'operate',
    render: (text, record, index) => {
      const isDark = (record.id == managerId) ? {color: '#999'} : {}
      return (
        <span>
          <a style={isDark}
             onClick={() => onEdit(record)}>编辑</a>
          <a className="y-m-l-10"
             style={isDark}
             onClick={() => onChangeStatus(record)}>
            {(record.is_enable == '1') ? '禁用' : '启用'}
          </a>
        </span>
      )
    }
  }]

  function renderColumns(text, record, index) {
    return (validator.isStringEmpty(text)) ? '--' : text
  }

  function renderAuthorityDetails(data) {
    return (
      <Popover title="权限详情" content={data.map((value, index) => {
        return (
          <span key={index}>{(index + 1) + '. ' + value.name}<br/></span>
        )
      })}>
        <a>查看详情</a>
      </Popover>
    )
  }

  return (
    <Table
      rowKey={record => record.id}
      columns={columns}
      loading={loading}
      dataSource={dataSource}
      pagination={false}
    />
  )
}

export default NewTable

