import React from 'react'
import {Modal, Form, Select, Radio, Input, Spin, Upload, Icon,message} from 'antd'
import {updateState} from '../task'
class newModal extends React.Component {
  constructor(props) {
    super(props);

    // 设置 initial state
    this.state = {
      name: "",
      file: "",
      previewImage: "",
      previewVisible: "",
      isUpload: true
    };
    if (this.props.img_url) {
      this.state.isUpload = false
    }
    console.log(this.props.type)
  }

  componentDidMount() {
    console.log('isUpload', this.state.isUpload)
  }

  handleSubmit() {
    this.props.form.validateFields((err, values) => {
      if (!!err) {
        return;
      }
      var img_urls;
      if (values.image!=undefined && values.image[0].response != undefined) {
        img_urls = values.image[0].response.data.imgPath + values.image[0].response.data.message;
      } else if(values.image!=undefined){
        img_urls = values.image[0].url
      }
      var ID = this.props.id;
      var community = [];
      community[0] = values.communitys;
      this.props.onOk({
        id: ID,
        link_url: values.link_url,
        type: values.type,
        image: img_urls,
        name: values.name,
        status: values.status,
        sort_order:values.sort_order,
      }, this.props.form.resetFields)
    });
  }

  handleCancel() {
    this.props.onCancel()
    this.props.form.resetFields()
    this.setState({
      isUpload: true,
    });
  }

  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  beforeUpload(file) {
    const isJPEG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    const isJPG = file.type === 'image/jpg';
    if (!isJPG && !isJPEG && !isPNG) {
      message.error('只能上传.jpeg,.jpg,.png图片');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('请上传小于 2MB 的图片!');
      return false;
    }
    const newDate = new Date().getTime();
    const strs = file.type.split("/");
    this.setState({
      name: "jiazhuanghoutai/" + newDate + "." + strs[1],
      files: file
    });
  }

  normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }



  handImgChange(e) {
    if (e.fileList.length) {
      this.props.uploadImg(false)
    } else {
      this.props.uploadImg(true)
    }
    if (e.file.status == 'error') {
      message.error('很遗憾...这次上传失败了。');
    }
  }
  typeChange(e){
    if(e.target.value==1){
      this.props.showchange(false)
    }else {
      this.props.showchange(true)
    }
  }
  render() {
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 18},
    };
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">选择图片</div>
      </div>
    )
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
            <Form.Item {...formItemLayout} label="链接类型" required>
              {this.props.form.getFieldDecorator('type', {
                rules: [{required: true, message: '请选择链接类型'}],
                initialValue: this.props.type
              })(
                <Radio.Group onChange={this.typeChange.bind(this)}>
                  <Radio value={"1"}>文字</Radio>
                  <Radio value={"2"}>图片</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item label="链接名称" {...formItemLayout}>
              {this.props.form.getFieldDecorator('name', {
                initialValue: this.props.name,
                rules: [
                  {required: true, message: '请输入链接名称!'},
                ]
              })(
                <Input placeholder="请输入链接名称"/>
              )}
            </Form.Item>
            {this.props.imgShow ?
              <Form.Item label="链接图片" {...formItemLayout}>
                {this.props.form.getFieldDecorator('image', {
                  initialValue: this.props.image,
                  rules: [
                    {required: true, message: '请上传链接图片!'},
                  ],
                  valuePropName: 'fileList',
                  normalize: this.normFile,
                  onChange: this.handImgChange.bind(this)
                })(
                  <Upload action="http://up.qiniu.com/"
                          data={{token: this.props.uploadToken, key: this.state.name, file: this.state.files}}
                          onPreview={this.handlePreview.bind(this)}
                          listType="picture-card"
                          beforeUpload={this.beforeUpload.bind(this)}>
                    {
                      this.props.isUpload ? uploadButton : null
                    }
                  </Upload>
                )}
              </Form.Item>
              :""
            }
            <Form.Item label="链接地址" {...formItemLayout}>
              {this.props.form.getFieldDecorator('link_url', {
                initialValue: this.props.link_url,
                rules: [
                  {required: true, type: "string",pattern: /^((https?|ftp|news):\/\/)?([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/,message: '请输入正确链接地址!'},
                ]
              })(
                <Input placeholder="请输入链接地址"/>
              )}
            </Form.Item>
            <Form.Item label="排序" {...formItemLayout}>
              {this.props.form.getFieldDecorator('sort_order', {
                initialValue: this.props.sort_order,
                rules: [
                  {required: true,pattern: /^[0-9]*[1-9][0-9]*$/,message: '请输入正确排序!'},
                ]
              })(
                <Input placeholder="请输入排序"/>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="链接状态" required>
              {this.props.form.getFieldDecorator('status', {
                rules: [{required: true, message: '请选择状态'}],
                initialValue: this.props.status
              })(
                <Radio.Group>
                  <Radio value={"1"}>显示</Radio>
                  <Radio value={"2"}>隐藏</Radio>
                </Radio.Group>
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

