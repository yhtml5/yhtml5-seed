'use strict';
import React from 'react';
import {
  connect
} from 'react-redux';
import * as actions from '../../actions/estateManager/serveManagerUpdate';
import './css/serveManagerUpdate.less';
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

class serveManagerUpdate extends React.Component {
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
      var ID = this.props.location.query.id;
      this.props.dispatch(actions.serverShow({
         service_id: ID
      }));
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

  handleSubmit(e) {
      this.props.form.validateFields((err, values) => {
        if (!!err) {
  				return;
  			}
        var img_urls=[];
        if(values.img_url[0].response!=undefined){
          img_urls=values.img_url[0].response.data.imgPath+values.img_url[0].response.data.message;
        }else{
            img_urls=values.img_url[0].url
        }
        var ID = this.props.location.query.id;
        this.props.dispatch(actions.serverUpdate({
          name: values.name,
          parent_id: values.parent_id,
          img_url: img_urls,
          intro: values.intro,
          order_sort: values.order_sort,
          status: values.status,
          service_id:ID,
        },()=>{
          message.success('编辑成功！');
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

  render() {
    const {
      getFieldDecorator,
    } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 6 },
    };
    const {parentList,info,uploadToken} = this.props.serveManagerUpdate;
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
          <Breadcrumb.Item>编辑服务</Breadcrumb.Item>
        </Breadcrumb>
        <section className="section">
          <Form>
            <FormItem {...formItemLayout} label="服务名称" hasFeedback>
              {getFieldDecorator('name',{rules:[{type: "string",pattern: /^[\u2E80-\u9FFF]+$/,required: true, message: '请输入20以内文字'}],initialValue:info.name})(<Input maxLength={20} placeholder="请输入服务名称"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="父级名称" hasFeedback>
              {getFieldDecorator('parent_id',{rules:[{required: true, message: '请选择父级名称'}],initialValue:info.parent_id})(
                <Select placeholder="请选择父级名称">
                <Option key={-1} value="0">无</Option>
                {parentList.map((value,index)=>{
                  return <Option key={index} value={value.service_id}>{value.name}</Option>
                })}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="服务图标">
              {getFieldDecorator('img_url', {
                rules: [
                      {required: true, message: '请上传服务图标!'},
                  ],
                initialValue: info.img_url,
                valuePropName: 'fileList',
                normalize: this.normFile,
                onChange:this.handImgChange.bind(this)
              })(
                <Upload name="file" action="http://up.qiniu.com/" data={{token:uploadToken,key:this.state.name,file:this.state.files}} onPreview={this.handlePreview.bind(this)} listType="picture-card" beforeUpload={this.beforeUpload.bind(this)}>
                  {this.state.isUpload&&info.img_url&&info.img_url.length!=1?uploadButton:null}
                </Upload>
              )}
              <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
              </Modal>
            </FormItem>
            <FormItem {...formItemLayout} label="服务说明" hasFeedback>
              {getFieldDecorator('intro',{initialValue:info.intro})(<Input maxLength={100} placeholder="请输入服务说明"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="服务排序" hasFeedback>
              {getFieldDecorator('order_sort',{rules:[{type: "string",pattern: /^(([1-9]\d?)|100)$/,required: true, message: '请输入正整数1-100以内'}],initialValue:info.order_sort})(<Input placeholder="请输入服务排序"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label="状态" required>
              {getFieldDecorator('status',{rules:[{required:true,message:'请选择状态'}],initialValue:info.status})(
                <RadioGroup>
                  <Radio value="1">启用</Radio>
                  <Radio value="2">停用</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem wrapperCol={{ span: 12, offset: 2 }}>
                <Button type="ghost" onClick={this.handleBack.bind(this)} className="mr1">返回</Button>
                <Popconfirm title="确定要编辑服务？" onConfirm={this.handleSubmit.bind(this)}>
                  <Button type="primary" className="ant-btn-lg">提交</Button>
                </Popconfirm>
            </FormItem>
          </Form>
        </section>
      </div>
    )
  }
}
serveManagerUpdate = Form.create({})(serveManagerUpdate);
export default connect(state => {
  return {
    serveManagerUpdate: state.serveManagerUpdate
  }
})(serveManagerUpdate);
