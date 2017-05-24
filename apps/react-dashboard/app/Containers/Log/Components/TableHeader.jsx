import React from 'react'
import {Table, Button} from 'antd'

function TableHeader({loading, onClick}) {
  return (
    <Button type='primary'
            loading={loading}
            onClick={onClick}
            style={{marginBottom: '20px'}}
    >新增日志</Button>
  )
}

export default TableHeader

