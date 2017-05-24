import React from 'react'
import {Modal, Form, Select, Radio, Input, Spin, Upload, Icon,message,Button} from 'antd'
import {updateState} from '../task'
import Editor from '../../../Components/editor/'
var children=[];
var discount_content=""
class InformationAdd extends React.Component {
  constructor(props) {
    super(props);

    // 设置 initial state
    this.state = {
      name: "",
      file: "",
      previewImage: "",
      previewVisible:false,
      isUpload: true
    };
    if (this.props.img_url) {
      // this.state.isUpload = false
    }
    discount_content=this.props.intro
  }

  componentDidMount() {
    if (process.env.NODE_ENV !== 'production'){
    console.log('isUpload', this.state.isUpload)
    }
  }
  handleSubmit() {
    this.props.form.validateFields((err, values) => {
      if (!!err) {
        return;
      }
      var img_urls = "";
      if(values.image.length!=0){
        if (values.image[0].response != undefined) {
          img_urls = values.image[0].response.data.imgPath + values.image[0].response.data.message;
        } else if(values.image!=""){
          img_urls = values.image[0].url
        }
      }
      var ID = this.props.id;
      // console.log(values,111)
      // return false

      var content=""
      // 如果没进行编辑，内容还是取原来的值，如果进行了编辑，取编辑后的值
      var pattern = "<p><br></p>";
      discount_content = discount_content.replace(new RegExp(pattern), ""); //去除编辑器默认的标签
      content=discount_content
      if(discount_content==""){
        // message.destroy();
        message.error("资讯内容不能为空");
        return false
      }

      this.props.onOk({
        id: ID,
        image: img_urls,
        channel_id:values.channel_id,
        column_id:values.column_id,
        intro:content,
        is_reco:values.is_reco,
        keywords:values.keywords,
        label_ids:values.label_ids,
        name:values.name,
        shows:values.shows,
        sort_order:values.sort_order,
        summary:values.summary,
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
    if (process.env.NODE_ENV !== 'production'){
    console.log(value)
    }
    this.props.form.resetFields(['column_id','label_ids'])
    this.props.changeSelectChannels(value)
  }
  handleChangecolumn(value){
   var  channel_id=this.props.form.getFieldValue("channel_id")
    this.props.form.resetFields(['label_ids'])
    this.props.changeSelectcolumn({
      channel_id:channel_id,
      column_id:value,
    })
  }
  componentWillReceiveProps(nextProps) {
    if (process.env.NODE_ENV !== 'production'){
    }
    if(this.props.intro!=nextProps.intro){
      discount_content=nextProps.intro
    }
    children=[]
    nextProps.labellist.map((values, index) => children.push(<Select.Option key={index} value={String(values.id)}>{values.name}</Select.Option>))
    }

  handleEditor(id,e){
    discount_content = e;
  }
  render() {
    console.log(this.props.isUpload,1111)
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
              {this.props.form.getFieldDecorator('channel_id',{
                initialValue: this.props.channel_id,
                rules: [
                  {required: true, message: '请选择所属频道!'},
                ]
              })(
                <Select placeholder="请选择"  onChange={this.handleChangeChannels.bind(this)}>
                  {this.props.selectChannels.map((values, index) => <Select.Option key={index} value={String(values.channel_id)}>{values.channel_name}</Select.Option>)}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="所属栏目" {...formItemLayout}>
              {this.props.form.getFieldDecorator('column_id',{
                initialValue: this.props.column_id,
                rules: [
                  {message: '请选择所属栏目!'},
                ]
              })(
                <Select placeholder="请先选择栏目" onChange={this.handleChangecolumn.bind(this)}>
                  {this.props.selectColumns.map((values, index) => <Select.Option key={String(index)} value={String(values.column_id)}>{values.column_name}</Select.Option>)}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="关联标签" {...formItemLayout}>
              {this.props.form.getFieldDecorator('label_ids',{
                initialValue: this.props.label_ids,
              })(
                <Select mode="multiple" placeholder="请先选择栏目">
                  {children}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="资讯标题" {...formItemLayout}>
              {this.props.form.getFieldDecorator('name', {
                initialValue: this.props.name,
                rules: [
                  {required: true, message: '请输入资讯标题'},
                ]
              })(
                <Input placeholder="请输入资讯标题"/>
              )}
            </Form.Item>
            <Form.Item label="资讯主图" {...formItemLayout}>
              {this.props.form.getFieldDecorator('image', {
                initialValue: this.props.image,
                valuePropName: 'fileList',
                normalize: this.normFile,
                onChange: this.handImgChange.bind(this),
                rules: [
                  {required: true, message: '请上传资讯主图!'},
                ]
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
            <Form.Item label="资讯摘要" {...formItemLayout}>
              {this.props.form.getFieldDecorator('summary', {
                initialValue: this.props.summary,
                rules: [
                  {required: true, message: '请输入资讯摘要!'},
                ]
              })(
                <Input type="textarea" rows={4} maxLength={200} placeholder="请输入资讯摘要"/>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="资讯内容" hasFeedback required>
              {this.props.form.getFieldDecorator('editor1')(
                <Editor  html={discount_content} handleEditor={this.handleEditor}/>
              )}
            </Form.Item>
            <Form.Item label="浏览量" {...formItemLayout}>
              {this.props.form.getFieldDecorator('shows', {
                initialValue: this.props.shows,
                rules: [
                  { message: '请输入浏览量!', pattern: /^\d+$/},
                ]
              })(
                <Input placeholder="请输入浏览量"/>
              )}
            </Form.Item>
            <Form.Item label="关键词" {...formItemLayout}>
              {this.props.form.getFieldDecorator('keywords', {
                initialValue: this.props.keywords,
                rules: [
                  { message: '请输入关键词!'},
                ]
              })(
                <Input placeholder="请输入关键词"/>
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
                  { required: true,message: '请输入排序!', pattern: /^[0-9]*[1-9][0-9]*$/},
                ]
              })(
                <Input placeholder="请输入排序"/>
              )}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 22, offset: 3 }}>
              <Button type="primary" onClick={this.handleSubmit.bind(this)} loading={this.props.formSureButton}>提交</Button>
              <Button type="ghost" style={{marginLeft:"30px"}} onClick={this.handleCancel.bind(this)}>返回</Button>
            </Form.Item>
          </Form>
    )
  }

}

InformationAdd = Form.create({})(InformationAdd)

export default InformationAdd

