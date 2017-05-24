import React from 'react'
import {Modal, Form, Input, Spin, Icon, message, Button,Select} from 'antd'
import  styles from './Modal.pcss'
import {updateState} from '../task'
const Option = Select.Option;
let uuid=0
class ChannelEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: [],
    };
    console.clear()
  }
  add(){
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }
  handleSubmit() {
    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (!!err) {
        return;
      }
      var child_channels=[]
      this.props.form.getFieldValue('keys2').map((value,index) => {
          let s1 = {}
          s1.id = values[`name${value.id}`]
          s1.sort_order = values[`sort_order${value.id}`];
        child_channels.push(s1)
        })
      this.props.form.getFieldValue('keys').map((value,index) => {
        let s1 = {}
        s1.id = values[`names${value}`]
        s1.sort_order = values[`sort_orders${value}`];
        child_channels.push(s1)
      })
      var ID = this.props.id;
      this.props.onOk({
        id: ID,
        child_channels: child_channels,
      }, this.props.form.resetFields)
    });
  }
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }
  remove2 = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys2 = form.getFieldValue('keys2');
    // We need at least one passenger

    // can use data-binding to set
    console.log(keys2)
    form.setFieldsValue({
      keys2: keys2.filter(key => key.id !=k),
    });
  }

  handleCancel() {
    this.props.onCancel()
    this.props.form.resetFields()
    this.setState({
      num:[],
    })
  }


  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 15},
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 20, offset: 4},
      },
    };
    getFieldDecorator('keys2', { initialValue: this.props.channelList });
    const keys2 = getFieldValue('keys2');
    const formItems = keys2.map((k, i) => {
      return (
        <div  key={`divname${i}`}>
          <Form.Item label="频道名称" {...formItemLayout}>
            {this.props.form.getFieldDecorator(`name${k.id}`, {
              initialValue: k.id,
              rules: [
                {required: true, message: '请输入频道名称!'},
              ]
            })(
              <Select placeholder="请选择"  style={{width:"80%",marginRight:"30px"}}>
                {this.props.channeloption.map((value,index)=>{
                  return <Option key={index} value={value.id}>{value.name}</Option>
                })}
              </Select>
            )}
            <Icon
              className={styles.delete}
              type="minus-circle-o"
              onClick={() => this.remove2(k.id)}
            />
          </Form.Item>
          <Form.Item label="排序" {...formItemLayout}>
          {this.props.form.getFieldDecorator(`sort_order${k.id}`, {
            initialValue: k.sort_order,
            rules: [
              {required: true, pattern: /^[0-9]*[1-9][0-9]*$/,message: '请输入正确排序!'},
            ]
          })(
            <Input maxLength={10} placeholder="请输入排序"/>
          )}
          </Form.Item>
        </div>
      );
    });
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItemsadd = keys.map((k, index) => {
      return (
        <div key={`divnames${k}`}>
          <Form.Item label="频道名称" {...formItemLayout} >
            {this.props.form.getFieldDecorator(`names${k}`, {
              initialValue: "",
              rules: [
                {required: true, message: '请输入频道名称!'},
              ]
            })(
              <Select placeholder="请选择" style={{width:"80%",marginRight:"30px"}}>
                {this.props.channeloption.map((value,index)=>{
                  return <Option key={index} value={value.id}>{value.name}</Option>
                })}
              </Select>
            )}
            <Icon
              className={styles.delete}
              type="minus-circle-o"
              onClick={() => this.remove(k)}
            />
          </Form.Item>
          <Form.Item label="排序" {...formItemLayout}>
            {this.props.form.getFieldDecorator(`sort_orders${k}`, {
              initialValue: "",
              rules: [
                {required: true, pattern: /^[0-9]*[1-9][0-9]*$/,message: '请输入正确排序!'},
              ]
            })(
              <Input maxLength={10} placeholder="请输入排序"/>
            )}
          </Form.Item>
        </div>
      );
    });
    return (
      <Modal title={this.props.titles}
             visible={this.props.visible}
             confirmLoading={this.props.confirmLoading}
             okText="确定"
             cancelText="取消"
             onOk={this.handleSubmit.bind(this)}
             onCancel={this.handleCancel.bind(this)}
      >
        <Spin tip="获取数据中..."
              spinning={(this.props.modalLoading) ? this.props.modalLoading : false}>
          <Form>
            {formItems}
            {formItemsadd}
            <Form.Item wrapperCol={{span: 16, offset: 6}}>
              <Button type="dashed" onClick={this.add.bind(this)} style={{width: '95%'}}>
                <Icon type="plus"/> 新增频道
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    )
  }

}

ChannelEditModal = Form.create({})(ChannelEditModal)

export default ChannelEditModal

