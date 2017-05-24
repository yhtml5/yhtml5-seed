import React from 'react'
import {Card, Form, Button, Input, Icon, DatePicker, message} from 'antd'
import {validator} from '../../../util/validator'


function Search({form, onSearch, onReset, buttonSearchLoading, buttonResetLoading}) {

  const formItemLayout = {
    labelCol: {span: 9},
    wrapperCol: {span: 15},
  }

  const getFormValues = () => {
    let searchTimeEnd = '', searchTimeStart = ''
    let searchName = form.getFieldValue('searchName')

    if (validator.isArrayNotEmpty(form.getFieldValue('time'))) {
      searchTimeStart = form.getFieldValue('time')[0].format('YYYY-MM-DD')
      searchTimeEnd = form.getFieldValue('time')[1].format('YYYY-MM-DD')
    }
    return {searchName, searchTimeStart, searchTimeEnd}
  }

  const handleSearch = (e) =>
    form.validateFields((err, values) => {
      e.preventDefault()
      if (!err) {
        if (process.env.NODE_ENV !== 'production'){
        console.log('Received values of form: ', values)
        }
        onSearch(values)
      }
    })

  const handleReset = () => {
    form.resetFields()
    onReset({
      tableCurrent: 1,
      tablePageSize: 10,
      searchName:"",
    })
  }

  return (
    <Card className="y-m-b-20">
      <Form layout='inline'>
        <Form.Item label="导航名称" {...formItemLayout}>
          {form.getFieldDecorator('searchName')(
            <Input type="text" placeholder="请输入导航名称"/>
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            className="y-m-l-10"
            onClick={handleSearch}
            loading={buttonSearchLoading}
          >搜索</Button>
          <Button
            className="y-m-l-10"
            onClick={handleReset}
            loading={buttonResetLoading}
          >重置</Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

Search = Form.create({})(Search)

export default Search
