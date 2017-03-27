'use strict';
import React from 'react';
import {
    connect
} from 'react-redux';
import * as actions from '../../actions/estateManager/communityManagerAdd';
import {
    Form,
    Breadcrumb,
    Table,
    Input,
    Button,
    Card,Cascader,Row,Col,Select,Modal,Popconfirm,TreeSelect, Upload, Icon,message ,Radio
} from 'antd';
import {
    Link
} from 'react-router';
var Mock = require('mockjs');
const Option = Select.Option;
const FormItem = Form.Item;
const createForm = Form.create;
const dataSource = [];
const InputGroup = Input.Group;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
var js="(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}"
const Layout = {
    labelCol: {
        span: 3
    },
    wrapperCol: {
        span: 6
    },
}
var serverLists=[];//存放选中的物业服务
class communityManagerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpload:true,
            isUpload2:true,
            previewVisible:false,
            previewImage: "",
        }
        this.props.dispatch(actions.getArea());
        this.props.dispatch(actions.getServerList());
        this.props.dispatch(actions.getCompanyList());
        this.props.dispatch(actions.getUploadToken("yaoping","123456"));
    }
    handleCancel() {
        this.setState({
            visible: false
        })
    }
    handleCancel() {
        this.setState({
            previewVisible: false
        })
    }
    handlePreview(file) {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
      }
    handleSubmit(){
        let {dispatch} = this.props;
        this.props.form.validateFields((err, values) => {
            if (!!err) {
              return;
          }
            let {city_id,name,group,address,pro_company_id,phone,service_list,logo_url,img_list,status,community_no} = values;
            var city_ids=[];
            var logo_urls="";
            var img_lists=[];
            city_ids=values.city_id[1];
            logo_urls=values.logo_url[0].response.data.imgPath+values.logo_url[0].response.data.message
            for(var i=0;i<values.img_list.length;i++){
                img_lists[i]=values.img_list[i].response.data.imgPath+values.img_list[i].response.data.message
            }
            //在编辑时未编辑服务，serverLists等于默认值，否则等于所有选中的值
          if(serverLists.length==0){
            serverLists=values.service_list;
          }else {
            serverLists=serverLists
          }
            dispatch(actions.updateCommunity({
                "address":address,
                "city_id":city_ids,
                "group":group,
                "img_list":img_lists,
                "logo_url":logo_urls,
                "name":name,
                "phone":phone,
                "pro_company_id":pro_company_id,
                "service_list":serverLists,
                "status":status,
                "community_no":community_no
            }));
        });
    }
    //号码验证
    phoneCheck(val){
    }
    handImgChange(e){
        if(e.fileList.length){
            this.setState({isUpload:false})
        }else{
            this.setState({isUpload:true})
        }
        if (e.file.status == 'error') {
            message.error('很遗憾...这次上传失败了。');
        }
    }
    handImgChange2(e){
        if(e.fileList.length>2){
            this.setState({isUpload2:false})
        }else{
            this.setState({isUpload2:true})
        }
        if (e.file.status == 'error') {
            message.error('很遗憾...这次上传失败了。');
        }
    }
    normFile(e) {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
    normFile2(e) {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
      handleBack(e) {
       history.go(-1);
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
      beforeUpload2(file) {
        const isJPEG = file.type === 'image/jpeg';
        const isJPG = file.type === 'image/jpg';
        if (!isJPG&&!isJPEG) {
          message.error('只能上传.jpeg,.jpg图片');
          return false;
        }
        const isLt100k = file.size / 1024  < 100;
        if (!isLt100k) {
          message.error('请上传小于 100kb 的图片!');
              return false;
        }
        const newDate = new Date().getTime();
        const strs=file.type.split("/");
        this.setState({
          name: "zhihuishequ_text/"+newDate+"."+strs[1],
          files: file
        });
      }
      onChange(value) {
        //将所有选中项推入数组serverLists
      serverLists=[];
      for (var i=0;i<arguments[2].allCheckedNodes.length;i++){
        if(arguments[2].allCheckedNodes[i].children!=undefined){
          serverLists.push(arguments[2].allCheckedNodes[i].node.key)
          for(var j=0;j<arguments[2].allCheckedNodes[i].children.length;j++){
            serverLists.push(arguments[2].allCheckedNodes[i].children[j].node.key)
          }
        }else {
           serverLists.push(arguments[2].allCheckedNodes[i].node.key)
        }
      }
     }
    render() {

        const uploadButton = (
            <div>
            <Icon type="plus" />
            <div className="ant-upload-text">选择图片</div>
            </div>
    );
        const {
            data,
            options,
            treeData,
            parentList,
            uploadToken
            } = this.props.communityManagerAdd;
        const tProps = {
            treeData,
            // value: this.state.value,
            onChange: this.onChange,
            multiple: true,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: '请选择',
        };
        const {
            getFieldDecorator
            } = this.props.form;
        return (
            <div className="page-content">
            <Breadcrumb separator="/">
            <Breadcrumb.Item><a href="#/serveManager">物业管理</a></Breadcrumb.Item>
            <Breadcrumb.Item><a href="#/communityManager">小区管理</a></Breadcrumb.Item>
            <Breadcrumb.Item>新增小区</Breadcrumb.Item>
            </Breadcrumb>
            <Card className="mb1">
 <Form>
         <FormItem label="小区编号" {...Layout}>
            {getFieldDecorator('community_no', {
                rules: [
                    {required: true, pattern: /^[0-9a-zA-Z]{1,20}$/, message: '请输入20位数字+字母!',type: "string"},
                ],
            })(
                <Input maxLength={20} placeholder="小区编号" />
            )}
        </FormItem>
        <FormItem label="小区区域" {...Layout}>
        {getFieldDecorator('city_id', {
            rules: [
                {required: true, message: '选择小区区域!'},
            ],
        })(
        <Cascader options={options}  placeholder="小区区域"  />
        )}
        </FormItem>
            <FormItem label="小区名称" {...Layout}>
            {getFieldDecorator('name', {
                rules: [
                    {required: true, message: '请输入20字以内的文字加字母!',pattern: /^[\u2E80-\u9FFFa-zA-Z]+$/,type: "string"},
                ],
            })(
            <Col>
                <Input maxLength={20} placeholder="小区名称" />
             </Col>
            )}
        </FormItem>
            <FormItem label="苑/期/区" {...Layout}>
            {getFieldDecorator('group', {
               rules: [
                    {pattern: /^[^ ]{1,15}$/,message: '请输入非空格'},
                ],
            })(
            <Col>
                <Input maxLength={15} placeholder="苑/期/区" />
                </Col>
            )}
        </FormItem>
            <FormItem label="小区地址" {...Layout}>
            {getFieldDecorator('address', {
                rules: [
                    {required: true, message: '请输入50字以内中文+数字+字母!',pattern: /^[\u2E80-\u9FFFa-zA-Z0-9]+$/,type: "string"},
                ],
            })(
            <Input maxLength={50} placeholder="小区地址" />
            )}
        </FormItem>
            <FormItem label="关联物业公司" {...Layout}>
            {getFieldDecorator('pro_company_id', {
                rules: [
                    {required: true, message: '请选择关联物业公司!'},
                ],
            })(
            <Select placeholder="请选择物业公司"  notFoundContent="没有数据">
                {parentList.map((value,index)=>{return <Option key={index} value={value.property_id}>{value. property_name}</Option>})}
            </Select>
            )}
        </FormItem>
            <FormItem label="物业电话" {...Layout}>
            {getFieldDecorator('phone', {
                rules: [
                    {type: "string",pattern: /^((0\d{2,3}-\d{7,8})|(1\d{10}))$/,required: true, message: '请输入物业电话!'},
                ],
                onChange:this.phoneCheck.bind(this.value)
            })(
            <Input placeholder="物业电话" />
            )}
        </FormItem>
            <FormItem label="开通服务" {...Layout}>
            {getFieldDecorator('service_list', {
                rules: [
                    {required: true, message: '请选择要开通的服务!'},
                ],
            })(
            <TreeSelect {...tProps} />
            )}
        </FormItem>
            <FormItem {...Layout} label="小区logo">
            {getFieldDecorator('logo_url', {
                rules: [
                      {required: true, message: '请上传小区logo!'},
                  ],
                valuePropName: 'fileList',
                normalize: this.normFile,
                onChange:this.handImgChange.bind(this),
            })(
            <Upload name="file" action="http://up.qiniu.com/"  data={{token:uploadToken,key:this.state.name,file:this.state.files}} listType="picture-card" onPreview={this.handlePreview.bind(this)} beforeUpload={this.beforeUpload2.bind(this)}>
            {this.state.isUpload?uploadButton:null}
        </Upload>
        )}
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
          <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
        </Modal>
        </FormItem>
            <FormItem {...Layout} label="小区图片">
            {getFieldDecorator('img_list', {
                rules: [
                      {required: true, message: '请上传小区图片!'},
                  ],
                valuePropName: 'fileList2',
                normalize: this.normFile,
                onChange:this.handImgChange2.bind(this)
            })(
            <Upload name="file" action="http://up.qiniu.com/"  data={{token:uploadToken,key:this.state.name,file:this.state.files}} listType="picture-card" onPreview={this.handlePreview.bind(this)} beforeUpload={this.beforeUpload.bind(this)}>
            {this.state.isUpload2?uploadButton:null}
        </Upload>
        )}
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
          <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
        </Modal>
        </FormItem>
          <FormItem label="状态" {...Layout}>
            {getFieldDecorator('status',{rules:[{required:true,message:'请选择状态'}],initialValue:"1"})(
              <RadioGroup>
                <Radio value="1">上线</Radio>
                <Radio value="2">下线</Radio>
              </RadioGroup>
            )}
          </FormItem>
            <FormItem wrapperCol={{ span: 12, offset: 2 }}>
              <Button type="ghost" onClick={this.handleBack.bind(this)} className="mr1">返回</Button>
              <Popconfirm title="确定要新增小区吗？" onConfirm={this.handleSubmit.bind(this)}>
                <Button type="primary" className="ant-btn-lg">提交</Button>
              </Popconfirm>
            </FormItem>
</Form>
            </Card>
        </div>
    )
    }
}
communityManagerAdd = createForm()(communityManagerAdd);
export default connect(state => {
    return {
        communityManagerAdd: state.communityManagerAdd
    }
})(communityManagerAdd);
