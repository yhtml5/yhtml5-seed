import React from 'react'
import {Card, Form, Button, Input, Icon, Select} from 'antd'
import {validator} from '../../../util/validator'
import styles from '../index.pcss'

function Search({
                  form, buttonSearchLoading, buttonResetLoading, selectChannels,
                  onReset, onSearch,
                }) {
  form.getFieldDecorator('searchColumns', {initialValue: []})

  const formItemLayout = {
    labelCol: {span: 9},
    wrapperCol: {span: 15},
  }

  const handleSearch = (e) =>
    form.validateFields((err, values) => {
      e.preventDefault()
      if (process.env.NODE_ENV !== 'production' && !err) {
        console.log('Received values of form: ', values)
      }
      onSearch(values)
    })

  const handleReset = () => {
    form.resetFields()
    onReset(form.getFieldsValue())
  }

  const handleChangeChannels = (id) => {
    form.resetFields(['searchColumns, searchColumn'])
    const index = selectChannels.findIndex((value, index) => value.channel_id === id)
    form.setFieldsValue({searchColumns: selectChannels[index].columns})
  }

  return (
    <Card className="y-m-b-20">
      <Form layout='inline' className={styles.form}>
        <Form.Item label="直播编号" {...formItemLayout}>
          {form.getFieldDecorator('searchNumber')(
            <Input type="text" placeholder="请输入直播编号"/>
          )}
        </Form.Item>
        <Form.Item label="直播标题" {...formItemLayout}>
          {form.getFieldDecorator('searchTitle')(
            <Input type="text" placeholder="请输入直播标题"/>
          )}
        </Form.Item>
        <Form.Item label="直播状态" {...formItemLayout} style={{width: '240px'}}>
          {form.getFieldDecorator('searchStatus', {})(
            <Select placeholder="请选择直播状态">
              <Select.Option value='1'>显示</Select.Option>
              <Select.Option value="2">隐藏</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="所属频道" {...formItemLayout}>
          {form.getFieldDecorator('searchChannel', {})(
            <Select placeholder="请选择一个频道" onChange={handleChangeChannels}>
              {selectChannels.map((values, index) =>
                <Select.Option key={index} value={String(values.channel_id)}>{values.channel_name}</Select.Option>)
              }
            </Select>
          )}
        </Form.Item>
        <Form.Item label="所属栏目" {...formItemLayout}>
          {form.getFieldDecorator('searchColumn', {})(
            <Select placeholder="请选择所属栏目">
              {form.getFieldValue('searchColumns').map((values, index) => <Select.Option key={index} value={String(values.column_id)}>{values.column_name}</Select.Option>)}
            </Select>
          )}
        </Form.Item>
        <Form.Item wrapperCol={{span: 18, offset: 9}}>
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

export default Search
