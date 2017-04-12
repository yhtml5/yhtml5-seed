import React from 'react'
import {Table, Button} from 'antd'

function TableHeader({loading, onExport}) {
  return (
    <Button type='primary'
            loading={loading}
            onClick={onExport}
            style={{marginBottom: '20px'}}
    >新增</Button>
  )
}

export default TableHeader

