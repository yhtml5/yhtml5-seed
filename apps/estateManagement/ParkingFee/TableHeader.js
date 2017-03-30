import React from 'react'
import {Table, Button} from 'antd'
import {validator} from '../../app/validator'

function TableHeader({
  loading, onExport
}) {

  return (
    <Button type='primary'
            loading={loading}
            onClick={onExport}
            style={{marginBottom: '20px'}}
    >导出账单</Button>
  )
}

export default TableHeader

