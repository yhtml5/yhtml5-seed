'use strict';
import React from 'react';
import {
  connect
} from 'react-redux';
import * as actions from '../../actions/estateManager/serveManagerAdd';
import {
  Form,
  Breadcrumb,
  Input,
  Button,
  Select,
  Upload,
  Icon,
  Radio,
  Popconfirm,
  message,
  Modal,
} from 'antd';
import {
  Link
} from 'react-router';
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class serveManagerAdd extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        isUpload: true,
        previewVisible: false,
        previewImage: '',
        name: '',
        files: '',
      }
      this.props.dispatch(actions.parentName());
      this.props.dispatch(actions.getUploadToken("yaoping","123456"));
  }

  handImgChange(e) {
    if (e.fileList.length) {
      this.setState({
        isUpload: false
      })
    } else {
      this.setState({
        isUpload: true
      })
    }
    if (e.file.status == 'error') {
      message.error('很遗憾...这次上传失败了。');
    }
  }

  handleSubmit(e) {
      this.props.form.validateFields((err, values) => {
        if (!!err) {
  				return;
  			}
        values.img_url=values.img_url[0].response.data.imgPath+values.img_url[0].response.data.message;
        this.props.dispatch(actions.serverUpdate({
          name: values.name,
          parent_id: values.parent_id,
          img_url: values.img_url,
          intro: values.intro,
          order_sort: values.order_sort,
          status: values.status,
        },()=>{
          message.success('新增成功！');
          setTimeout(() => {
            location.href = "#/serveManager";
          },1000)
        }));
      });
  }

  handleBack(e) {
    history.go(-1);
  }

  normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  handlePreview(file){
   this.setState({
     previewImage: file.url || file.thumbUrl,
     previewVisible: true,
   });
 }

 handleCancel(e){
   this.setState({
     previewVisible: false
   })
 }

 beforeUpload(file) {
   const isJPEG = file.type === 'image/jpeg';
   const isPNG = file.type === 'image/png';
   const isJPG = file.type === 'image/jpg';
   if (!isJPG&&!isJPEG&&!isPNG) {
     message.error('只能上传.jpeg,.jpg,.png图片');
     return false;
   }
   const isLt2M = file.size / 1024 / 1024 < 2;
   if (!isLt2M) {
     message.error('请上传小于 2MB 的图片!');
     return false;
   }
   const newDate = new Date().getTime();
   const strs=file.type.split("/");
   this.setState({
     name: "zhihuishequ_text/"+newDate+"."+strs[1],
     files: file
   });
 }

  render() {
    const {
      getFieldDecorator,
    } = this.props.form;
    const Id = this.props.location.query.id;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 6 },
    };
    const {parentList,uploadToken} = this.props.serveManagerAdd;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">选择图片</div>
      </div>
    );
    return (
      <div className="page-content">
        <Breadcrumb separator="/">
          <Breadcrumb.Item><a href="#/serveManager">物业管理</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href="#/serveManager">服务管理</a></Breadcrumb.Item>
          <Breadcrumb.Item>新增子服务</Breadcrumb.Item>
        </Breadcrumb>
        <section className="section">
          <Form>
            <FormItem {...formItemLayout} label="服务名称" hasFeedback>
              {getFieldDecorator('name',{rules:[{type: "string",pattern: /^[\u2E80-\u9FFF]+$/,required: true, message: '请输入20以内文字'}]})(<Input maxLength={20} placeholder="请输入服务名称"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="父级名称" hasFeedback>
              {getFieldDecorator('parent_id',{initialValue:Id})(
                <Select placeholder="请选择父级名称" disabled>
                <Option key={-1} value={Id}>{this.props.location.query.name}</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="服务图标">
              {getFieldDecorator('img_url', {
                rules: [
                      {required: true, message: '请上传服务图标!'},
                  ],
                valuePropName: 'fileList',
                normalize: this.normFile,
                onChange:this.handImgChange.bind(this)
              })(
                <Upload name="file" action="http://up.qiniu.com/" data={{token:uploadToken,key:this.state.name,file:this.state.files}} onPreview={this.handlePreview.bind(this)} listType="picture-card" beforeUpload={this.beforeUpload.bind(this)}>
                  {this.state.isUpload?uploadButton:null}
                </Upload>
              )}
              <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
              </Modal>
            </FormItem>
            <FormItem {...formItemLayout} label="服务说明" hasFeedback>
              {getFieldDecorator('intro')(<Input maxLength={100} placeholder="请输入服务说明"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="服务排序" hasFeedback>
              {getFieldDecorator('order_sort',{rules:[{type: "string",pattern: /^(([1-9]\d?)|100)$/,required: true, message: '请输入正整数1-100以内'}]})(<Input placeholder="请输入服务排序"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="状态" required>
              {getFieldDecorator('status',{rules:[{required:true,message:'请选择状态'}],initialValue:1})(
                <RadioGroup>
                  <Radio value={1}>启用</Radio>
                  <Radio value={2}>停用</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem wrapperCol={{ span: 12, offset: 2 }}>
                <Button type="ghost" onClick={this.handleBack.bind(this)} className="mr1">返回</Button>
                <Popconfirm title="确定要新增服务？" onConfirm={this.handleSubmit.bind(this)}>
                  <Button type="primary">提交</Button>
                </Popconfirm>
            </FormItem>
          </Form>
        </section>
      </div>
    )
  }
}
serveManagerAdd = Form.create({})(serveManagerAdd);
export default connect(state => {
  return {
    serveManagerAdd: state.serveManagerAdd
  }
})(serveManagerAdd);
