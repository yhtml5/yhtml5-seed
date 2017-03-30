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
    console.log('FormulaAddModalProps', props)
  }

  componentDidMount() {
    this.props.form.setFieldsValue({['user']: this.props.userName})
  }

  handleSearch() {
    this.props.onSearch(this.props.form.getFieldValue('user'))
  }

  handleReset() {
    this.props.form.resetFields()
    this.props.onReset()
  }

  render() {
    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 18},
    }
    return (
      <Card className="y-m-b-20">
        <Form inline={true}>
          <Form.Item label="用户"
                     style={{width: '300px'}}
                     {...formItemLayout}>
            {this.props.form.getFieldDecorator('user', {
              rules: [{
                pattern: /^[0-9a-zA-Z\u4e00-\u9fa5]+$/,
                message: '请输入正确的用户名！',
              }],
            })(
              <Input type="text" placeholder="请输入姓名/手机号码"/>
            )}
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              className="y-m-l-10"
              loading={this.props.buttonConfirmLoading}
              onClick={this.handleSearch}
            >搜索</Button>
            <Button
              className="y-m-l-10"
              loading={this.props.buttonResetLoading}
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
