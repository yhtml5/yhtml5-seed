import React from 'react'
import {Card, Form, Button, Input, Icon, DatePicker, message} from 'antd'
import {validator} from '../../app/validator'
import './index.less'
import '../../app/glob.less'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      formula: '',
      formulaResult: '暂无结果',
      validateStatus: ''
    };
    console.log('FormulaAddModalProps', props)
  }

  handleSearch() {
    let time = {
      start: '',
      end: ''
    }
    if (validator.isArrayNotEmpty(this.props.form.getFieldValue('time'))) {
      time.start = this.props.form.getFieldValue('time')[0].format('YYYY-MM-DD')
      time.end = this.props.form.getFieldValue('time')[1].format('YYYY-MM-DD')
    }
    this.props.onSearch(this.props.form.getFieldValue('number'), time.start, time.end)
  }

  handleReset() {
    this.props.form.resetFields()
    this.props.onSearch('', '', '')
  }

  render() {
    const formItemLayout = {
      labelCol: {span: 9},
      wrapperCol: {span: 15},
    }
    return (
      <Card className="y-m-b-20">
        <Form inline={true}
              onSubmit={() => {
              }}>
          <Form.Item label="交易流水号" {...formItemLayout}>
            {this.props.form.getFieldDecorator('number')(
              <Input type="text" placeholder="请输入流水号"/>
            )}
          </Form.Item>
          <Form.Item label="缴费时间"  {...formItemLayout}>
            {this.props.form.getFieldDecorator('time')(
              <DatePicker.RangePicker />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              className="y-m-l-10"
              onClick={this.handleSearch}
            >搜索</Button>
            <Button
              className="y-m-l-10"
              onClick={this.handleReset}
            >重置</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

Search = Form.create({})(Search)

export default Search
