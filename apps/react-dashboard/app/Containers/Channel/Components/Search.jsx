import React from 'react'
import {Card, Form, Button, Input, Icon, DatePicker, message,Select} from 'antd'
import {validator} from '../../../util/validator'
import styles from '../index.pcss'
const Option = Select.Option;

function Search({form, onSearch, onReset, adBlowOptions, buttonSearchLoading, buttonResetLoading,reset}) {

  const formItemLayout = {
    labelCol: {span: 9},
    wrapperCol: {span: 15},
  }

  const getFormValues = () => {
    // let searchTimeEnd = '', searchTimeStart = ''
    // let searchName = form.getFieldValue('searchName')
    //
    // if (validator.isArrayNotEmpty(form.getFieldValue('time'))) {
    //   searchTimeStart = form.getFieldValue('time')[0].format('YYYY-MM-DD')
    //   searchTimeEnd = form.getFieldValue('time')[1].format('YYYY-MM-DD')
    // }
    // return {searchName, searchTimeStart, searchTimeEnd}
  }

  const handleSearch = (e) =>
    form.validateFields((err, values) => {
      e.preventDefault()
      if (!err) {
        console.log('Received values of form: ', values)
        onSearch(values)
      }
    })

  const handleReset = () => {
    form.resetFields()
    onReset({
      channelnum:"",
      channelname:""
    })
  }

  return (
    <Card className="y-m-b-20">
      <Form layout='inline' className={styles.form}>
        <Form.Item label="频道编号" {...formItemLayout}>
          {form.getFieldDecorator('channelnum')(
            <Input type="text" placeholder="请输入频道编号"/>
          )}
        </Form.Item>
        <Form.Item label="频道名称" {...formItemLayout}>
          {form.getFieldDecorator('channelname')(
            <Input type="text" placeholder="请输入频道名称"/>
          )}
        </Form.Item>
        <Form.Item  wrapperCol={{span: 15, offset: 9}}>
          <Button
            type="primary"
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
// export default connect(state => {
//   return {
//     ad: state.ad,
//   }
// })(Search)
export default Search
