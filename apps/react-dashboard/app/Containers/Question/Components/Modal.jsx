import React from 'react'
import {Modal, Form, Select, Radio, Input, Spin, Upload, Icon,message} from 'antd'
import {updateState} from '../task'
import Editor from '../../../Components/editor/'
var discount_content=""
class newModal extends React.Component {
  constructor(props) {
    super(props);

  }


  handleSubmit() {
    this.props.form.validateFields((err, values) => {
      if (!!err) {
        return;
      }
      var ID=this.props.id
      var content=""
      // 如果没进行编辑，内容还是取原来的值，如果进行了编辑，取编辑后的值
      var pattern = "<p><br></p>";
      discount_content = discount_content.replace(new RegExp(pattern), ""); //去除编辑器默认的标签
      content=discount_content
      if(discount_content==""){
        // message.destroy()
        message.error("公告内容不能为空");
        return false
      }
      this.props.onOk({
        id: ID,
        answer: content,
      }, this.props.form.resetFields)
    });
  }

  handleCancel() {
    this.props.onCancel()
    this.props.form.resetFields()
  }
  handleEditor(id,e){
    discount_content = e;
  }
  render() {
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 18},
    };
    return (
      <Modal title={this.props.title}
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
            <Form.Item {...formItemLayout} label="问答回复" hasFeedback required>
              {this.props.form.getFieldDecorator('editor1')(
                <Editor  html={this.props.answer} handleEditor={this.handleEditor}/>
              )}
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    )
  }

}

newModal = Form.create({})(newModal)

export default newModal

