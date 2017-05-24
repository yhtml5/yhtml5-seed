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
      previewVisible: false,
      isUpload: true
    };
    if (this.props.img_url) {
      this.state.isUpload = false
    }
  }

  componentDidMount() {
    console.log('isUpload', this.state.isUpload)
  }

  handleSubmit() {
    this.props.form.validateFields((err, values) => {
      console.log('handleSubmit', values)
      if (!!err) {
        return;
      }
      var img_urls = "";
      if (values.img_url[0].response != undefined) {
        img_urls = values.img_url[0].response.data.imgPath + values.img_url[0].response.data.message;
      } else {
        img_urls = values.img_url[0].url
      }
      var ID = this.props.id;
      var community = [];
      community[0] = values.communitys;
      this.props.onOk({
        communitys: community,
        id: ID,
        ad_position_id: values.ad_position_id,
        ad_type: values.ad_type,
        img_url: img_urls,
        link_url: values.link_url,
        name: values.name,
        sort_order: values.sort_order,
        status: values.status,
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
    })
  }
  modalCancel(){
    this.setState({ previewVisible: false })
  }
  normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }


  handleChange(value) {
    if (value == 1) {
      this.props.dispatch(actions.showChange("show"))
    } else if (value == 2) {
      this.props.dispatch(actions.showChange("hide"))
    }
  }

  handImgChange(e) {
    if (e.fileList.length) {
      console.log('success')
      this.props.uploadImg(false)
    } else {
      this.props.uploadImg(true)
    }
    if (e.file.status == 'error') {
      message.error('很遗憾...这次上传失败了。');
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
            <Form.Item label="广告位置" {...formItemLayout}>
              {this.props.form.getFieldDecorator('ad_position_id', {
                initialValue: this.props.ad_position_id,
                rules: [
                  {required: true, message: '请选择广告位置!'},
                ]
              })(
                <Select placeholder="请选择">
                  {this.props.adBlowOptions.map((value, index) => {
                    return <Select.Option key={index} value={value.position_id}>{value.postion_name}</Select.Option>
                  })}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="广告名称" {...formItemLayout}>
              {this.props.form.getFieldDecorator('name', {
                initialValue: this.props.name,
                rules: [
                  {required: true, message: '请输入广告名称!'},
                ]
              })(
                <Input placeholder="请输入广告名称"/>
              )}
            </Form.Item>
            <Form.Item label="广告图片" {...formItemLayout}>
              {this.props.form.getFieldDecorator('img_url', {
                initialValue: this.props.img_url,
                rules: [
                  {required: true, message: '请上传广告图片!'},
                ],
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                // normalize: this.normFile,
                onChange: this.handImgChange.bind(this)
              })(
                <Upload action="http://up.qiniu.com/"
                        listType="picture-card"
                        onPreview={this.handlePreview.bind(this)}
                        beforeUpload={this.beforeUpload.bind(this)}
                        data={{token: this.props.uploadToken, key: this.state.name, file: this.state.files}}
                >
                  {
                    this.props.isUpload ? uploadButton : null
                  }
                </Upload>
              )}
            </Form.Item>
            <Modal visible={this.state.previewVisible} footer={null} onCancel={this.modalCancel.bind(this)}>
              <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
            </Modal>
            <Form.Item label="广告链接" {...formItemLayout}>
              {this.props.form.getFieldDecorator('link_url', {
                initialValue: this.props.link_url,
                rules: [
                  {message: '请输入链接地址!', type: "string"},
                ]
              })(
                <Input placeholder="请输入链接地址"/>
              )}
            </Form.Item>
            <Form.Item label="广告排序" {...formItemLayout}>
              {this.props.form.getFieldDecorator('sort_order', {
                initialValue: this.props.sort_order,
                rules: [
                  {required: true, pattern: /^[0-9]*[1-9][0-9]*$/, message: '请输入正确广告排序!'},
                ]
              })(
                <Input placeholder="请输入广告排序"/>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="广告状态" required>
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

