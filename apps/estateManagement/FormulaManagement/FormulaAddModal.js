import React from 'react'
import {Row, Col, Button, Modal, Form, Input, Icon} from 'antd'
import Calculator from './Calculator.js'

class FormulaAddModal extends React.Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleCalculating = this.handleCalculating.bind(this);
    this.handleOnCancel = this.handleOnCancel.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.state = {
      formula: '',
      formulaResult: '',
      validateStatus: ''
    };
    console.log('FormulaAddModalProps', props)
  }

  checkFormula() {
    console.log('checkFormula', this.state.formula)
    if (this.state.formula == '') {
      return '公式不能为空'
    } else if (/[\+\-\*\/\.]{2}/g.test(this.state.formula)) {
      return '公式错误，不能连续输入运算符！'
    } else if (/[0-9][a-zA-Z]/g.test(this.state.formula)) {
      return '公式错误，字母前请加运算符！'
    } else if (/[a-zA-Z][a-zA-Z]/g.test(this.state.formula)) {
      return '公式错误，字母只能单独出现！'
    } else if (/[hH]/g.test(this.state.formula) && /[cC]/g.test(this.state.formula)) {
      return '公式错误，房屋面积和车位面积只能选一个！'
    } else if (/(\.[a-zA-Z])|([a-zA-Z]\.)/g.test(this.state.formula)) {
      return '公式错误，小数点位置不正确！'
    } else if (/^[+\-*\/]/g.test(this.state.formula)) {
      return '公式错误，不能以运算符开头！'
    } else {
      try {
        const formulaResult = eval(this.state.formula.replace(/C/g, 10).replace(/H/g, 100))
        if (formulaResult < 0) {
          return '公式错误，值不能为负数！'
        } else if (typeof formulaResult !== 'number' || isNaN(formulaResult)) {
          return '公式错误，值不正常！'
        } else {
          return formulaResult
        }
      }
      catch (err) {
        return '公式错误，请检查！'
      }
    }
  }

  handleInput(value) {
    let newFormula = this.state.formula + value
    this.setState({
      formula: newFormula,
      validateStatus: '',
    });
    this.props.form.setFieldsValue({['formula']: newFormula})
  }

  handleClear() {
    this.setState({
      formula: ''
    });
    this.props.form.setFieldsValue({['formula']: ''})
  }

  handleBack() {
    console.log('handleBack', this.state.formula)
    let newFormula = this.state.formula.slice(0, this.state.formula.length - 1)
    this.setState({
      formula: newFormula
    });
    this.props.form.setFieldsValue({
      ['formula']: newFormula
    })
  }

  handleCalculating() {
    this.setState({
      formulaResult: this.checkFormula(),
      validateStatus: (typeof this.checkFormula() == 'number') ? '' : 'error'
    })
  }

  handleOnCancel() {
    this.props.form.resetFields();
    this.setState({
      formula: '',
      formulaResult: ''
    });
    this.props.onCancel()
  }

  handleOnSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields()
    this.setState({
      formulaResult: this.checkFormula()
    })
    let valid = typeof this.props.form.getFieldValue('formulaName') !== 'undefined' && typeof this.checkFormula() == 'number'
    if (valid) {
      this.props.onSubmit(
        this.props.form.getFieldValue('formulaName'),
        this.state.formula,
        this.handleOnCancel
      )
    } else {
      this.setState({
        validateStatus: 'error',
      })
      this.handleCalculating()
    }
  }

  render() {
    return (
      <div>
        <Modal
          visible={this.props.visible}
          title="新增公式"
          onOk={this.props.onOk}
          onCancel={this.handleOnCancel}
          footer={[
            <Button key="back"
                    size="large"
                    onClick={this.handleOnCancel}>
              关闭</Button>,
            <Button key="submit"
                    type="primary"
                    size="large"
                    loading={this.props.loading}
                    onClick={this.handleOnSubmit}>
              保存</Button>,
          ]}>
          <Form onSubmit={this.handleOnSubmit}>
            <Form.Item
              labelCol={{span: 6}}
              wrapperCol={ {span: 14}}
              label="名称"
              hasFeedback>
              {this.props.form.getFieldDecorator('formulaName', {
                rules: [{
                  required: true,
                  pattern: /\S/,
                  message: '公式名不能为空',
                }],
              })(
                <Input placeholder="请输入公式名称"/>
              )}
            </Form.Item>
            <Form.Item
              labelCol={{span: 6}}
              wrapperCol={{span: 14}}
              validateStatus={this.state.validateStatus}
              label="公式">
              {this.props.form.getFieldDecorator('formula', {})(
                <Input placeholder="请使用计算器输入公式" disabled/>
              )}
            </Form.Item>
            <Calculator
              formulaResult={this.state.formulaResult}
              calculatorInput={this.handleInput}
              calculatorBack={this.handleBack}
              calculatorClear={this.handleClear}
            />
          </Form>
        </Modal>
      </div>
    )
  }
}

{/*<Button key="test" size="large" onClick={this.handleCalculating}>计算</Button>,*/
}

FormulaAddModal = Form.create({})(FormulaAddModal);

export default FormulaAddModal
