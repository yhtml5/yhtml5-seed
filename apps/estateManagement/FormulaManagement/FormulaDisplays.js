import React from 'react'
import {Row, Col, Card, Icon} from 'antd'
import FormulaDeleteConfirm from './FormulaDeleteConfirm.js'

function FormulaDisplays({items, onAdd, onDelete}) {
  console.log('FormulaDisplays: ', {items})
  return (
    <Row>
      <Col span="8">
        <Card className="FormulaManagement-add">
          <Icon type="plus"
                onClick={onAdd}/>
        </Card>
      </Col>
      {items.map((value, index) => {
        return (
          <Col key={index} span="8">
            <Card className="FormulaManagement-normal"
                  title={value.name}
                  bordered={true}>
              <div className="y-icon">
                {/*<Icon type="edit"/>*/}
                <Icon type="delete"
                      onClick={() => {
                        FormulaDeleteConfirm({onDelete, value})
                      }}/>
              </div>
              <p className="y-text">{value.formula}</p>
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}

export default FormulaDisplays
