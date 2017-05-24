import React from 'react'
import {Card, Form, Button, Input, Icon, DatePicker, message, Select} from 'antd'
import {validator} from '../../../util/validator'
import styles from '../index.pcss'
const Option = Select.Option;

function Search({
                  form, onSearch, onReset, adBlowOptions, buttonSearchLoading, buttonResetLoading, reset,
                  selectChannels, changeSelectChannels, selectColumns, searchChannel
                }) {

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
      serial_no: "",
      is_reply: "",
      channel_id: "",
      column_id: "",
    })
  }
  const handleChangeChannels = (value) => {
    form.resetFields(['selectedColumn'])
    changeSelectChannels(value)
  }
  return (
    <Card className="y-m-b-20">
      <Form layout='inline' className={styles.form}>
        <Form.Item label="问答编号" {...formItemLayout}>
          {form.getFieldDecorator('serial_no')(
            <Input type="text" placeholder="请输入日志编号"/>
          )}
        </Form.Item>
        <Form.Item label="所属频道" {...formItemLayout}>
          {form.getFieldDecorator('channel_id', {
            initialValue: searchChannel
          })(
            <Select placeholder="请选择" onChange={handleChangeChannels}>
              {selectChannels.map((values, index) =>
                <Select.Option key={index}
                               value={String(values.channel_id)}
                >{values.channel_name}</Select.Option>)
              }
            </Select>
          )}
        </Form.Item>
        <Form.Item label="所属栏目" {...formItemLayout}>
          {form.getFieldDecorator('column_id')(
            <Select placeholder="请先选择栏目">
              {selectColumns.map((values, index) =>
                <Select.Option
                  key={index}
                  value={String(values.column_id)}
                >{values.column_name}
                </Select.Option>)
              }
            </Select>
          )}
        </Form.Item>
        <Form.Item label="问答状态" {...formItemLayout} style={{width: '240px'}}>
          {form.getFieldDecorator('is_reply')(
            <Select placeholder="请选择">
              <Select.Option value="">全部</Select.Option>
              <Select.Option value="1">已回复</Select.Option>
              <Select.Option value="2">未回复</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item wrapperCol={{span: 15, offset: 9}}>
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
