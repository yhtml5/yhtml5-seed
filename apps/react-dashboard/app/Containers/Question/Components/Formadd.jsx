import React from 'react'
import {Modal, Form, Select, Radio, Input, Spin, Upload, Icon, message, Button} from 'antd'
import {updateState} from '../task'
import Editor from '../../../Components/editor/'
var children = [];
var discount_content = ""
class InformationAdd extends React.Component {
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
      // this.state.isUpload = false
    }
    discount_content=this.props.answer
  }

  componentDidMount() {
    console.log('isUpload', this.state.isUpload)
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.answer!=nextProps.answer){
      discount_content=nextProps.answer
    }
  }

  handleSubmit() {
    this.props.form.validateFields((err, values) => {
      if (!!err) {
        return;
      }
      var img_urls = "";
      if (values.user_img.length != 0) {
        if (values.user_img[0].response != undefined) {
          img_urls = values.user_img[0].response.data.imgPath + values.user_img[0].response.data.message;
        } else if (values.user_img != "") {
          img_urls = values.user_img[0].url
        }
      }
      var ID = this.props.id;
      // console.log(values,111)
      // return false
      var content = ""
      // 如果没进行编辑，内容还是取原来的值，如果进行了编辑，取编辑后的值
      var pattern = "<p><br></p>";
      discount_content = discount_content.replace(new RegExp(pattern), ""); //去除编辑器默认的标签
      content = discount_content
      this.props.onOk({
        id: ID,
        channel_id: values.channel_id,
        column_id: values.column_id,
        question_author: values.question_author,
        user_img: img_urls,
        intro: values.intro,
        answer: content,
        is_reco: values.is_reco,
        sort_order: values.sort_order,
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
  modalCancel(){
    this.setState({ previewVisible: false })
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

  handleChangeChannels(value) {
    console.log(value)
    // this.props.form.resetFields(['column_id'])
    this.props.changeSelectChannels(value)
  }

  handleChangecolumn(value) {
    var channel_id = this.props.form.getFieldValue("channel_id")
    this.props.changeSelectcolumn({
      channel_id: channel_id,
      column_id: value,
    })
  }

  handleEditor(id, e) {
    discount_content = e;
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
      <Form>
        <Form.Item label="所属频道" {...formItemLayout}>
          {this.props.form.getFieldDecorator('channel_id', {
            initialValue: this.props.channel_id,
            rules: [
              {required: true, message: '请选择所属频道!'},
            ]
          })(
            <Select placeholder="请选择" onChange={this.handleChangeChannels.bind(this)}>
              {this.props.selectChannels.map((values, index) => <Select.Option key={index} value={String(values.channel_id)}>{values.channel_name}</Select.Option>)}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="所属栏目" {...formItemLayout}>
          {this.props.form.getFieldDecorator('column_id', {
            initialValue: this.props.column_id,
            rules: [
              {message: '请选择所属栏目!'},
            ]
          })(
            <Select placeholder="请先选择栏目">
              {this.props.selectColumns.map((values, index) => <Select.Option key={String(index)} value={String(values.column_id)}>{values.column_name}</Select.Option>)}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="提问用户" {...formItemLayout}>
          {this.props.form.getFieldDecorator('question_author', {
            initialValue: this.props.question_author,
            rules: [
              {required: true, message: '请输入提问用户'},
            ]
          })(
            <Input placeholder="请输入提问用户"/>
          )}
        </Form.Item>
        <Form.Item label="用户头像" {...formItemLayout}>
          {this.props.form.getFieldDecorator('user_img', {
            initialValue: this.props.user_img,
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
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.modalCancel.bind(this)}>
          <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
        </Modal>
        <Form.Item label="提问内容" {...formItemLayout}>
          {this.props.form.getFieldDecorator('intro', {
            initialValue: this.props.intro,
            rules: [
              {required: true, message: '请输入提问内容!'},
            ]
          })(
            <Input type="textarea" rows={4} maxLength={200} placeholder="请输入提问内容"/>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="回复内容" hasFeedback>
          {this.props.form.getFieldDecorator('editor1')(
            <Editor html={discount_content} handleEditor={this.handleEditor}/>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="推荐到首页" required>
          {this.props.form.getFieldDecorator('is_reco', {
            rules: [{required: true, message: '请选择状态'}],
            initialValue: this.props.is_reco,
          })(
            <Radio.Group>
              <Radio value={"1"}>是</Radio>
              <Radio value={"2"}>否</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="排序" {...formItemLayout}>
          {this.props.form.getFieldDecorator('sort_order', {
            initialValue: this.props.sort_order,
            rules: [
              {required: true, message: '请输入排序!', pattern: /^[0-9]*[1-9][0-9]*$/},
            ]
          })(
            <Input placeholder="请输入排序"/>
          )}
        </Form.Item>
        <Form.Item wrapperCol={{span: 22, offset: 3}}>
          <Button type="primary" onClick={this.handleSubmit.bind(this)} loading={this.props.formSureButton}>提交</Button>
          <Button type="ghost" style={{marginLeft: "30px"}} onClick={this.handleCancel.bind(this)}>返回</Button>
        </Form.Item>
      </Form>
    )
  }

}

InformationAdd = Form.create({})(InformationAdd)

export default InformationAdd

