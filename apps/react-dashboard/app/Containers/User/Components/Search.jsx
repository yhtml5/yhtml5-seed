import React from 'react'
import {Card, Form, Button, Input, Icon, DatePicker, message} from 'antd'
import {validator} from '../../../util/validator'


const splitTime = (time) => {
  let end = '', start = ''

  if (validator.isArrayNotEmpty(time)) {
    start = time[0].format('YYYY-MM-DD')
    end = time[1].format('YYYY-MM-DD')
  }
  return {start, end}
}


function Search({form, onSearch, onReset}) {

  const formItemLayout = {
    labelCol: {span: 9},
    wrapperCol: {span: 15},
  }

  const handleSearch = () => {
    let time = {
      start: '',
      end: ''
    }
    if (validator.isArrayNotEmpty(form.getFieldValue('time'))) {
      time.start = form.getFieldValue('time')[0].format('YYYY-MM-DD')
      time.end = form.getFieldValue('time')[1].format('YYYY-MM-DD')
    }
    onSearch(form.getFieldValue('number'), time.start, time.end)
  }

  const handleReset = () => {
    form.resetFields()
    onSearch('', '', '')
  }

  return (
    <Card className="y-m-b-20">
      <Form layout='inline'>
        <Form.Item label="交易流水号" {...formItemLayout}>
          {form.getFieldDecorator('number')(
            <Input type="text" placeholder="请输入流水号"/>
          )}
        </Form.Item>
        <Form.Item label="缴费时间"  {...formItemLayout}>
          {form.getFieldDecorator('time')(
            <DatePicker.RangePicker />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            className="y-m-l-10"
            onClick={handleSearch}
          >搜索</Button>
          <Button
            className="y-m-l-10"
            onClick={handleReset}
          >重置</Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

Search = Form.create({})(Search)

export default Search
