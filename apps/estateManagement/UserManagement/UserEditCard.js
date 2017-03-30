import React from 'react'
import {Card, Tree, Form, Button, Input, Icon, DatePicker, message, Select, Col, Spin} from 'antd'
import {validator} from '../../app/validator'
import './index.less'
import '../../app/glob.less'

function UserAddEditMenus({
  offset, title, data, loading, keys,
  onCheck,
}) {
  return (
    <Col span={11} offset={offset}>
      <Card className="y-card">
        <Spin spinning={loading}
              tip="玩命加载中...">
          <h4 className="y-card-title">{title}</h4>
          {data.length
            ? <Tree
              checkable
              defaultExpandAll={true}
              defaultExpandedKeys={['all']}
              checkedKeys={keys}
              onSelect={() => {
              }}
              onCheck={onCheck}
            >
              <Tree.TreeNode title="全选" key="all">
                {data.map((value, index) => <Tree.TreeNode title={value.name} key={value.id}/>)}
              </Tree.TreeNode>
            </Tree>
            : '渲染中......'
          }
        </Spin>
      </Card>
    </Col>
  )
}


export default UserAddEditMenus
