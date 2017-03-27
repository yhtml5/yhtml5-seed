'use strict';
import React from 'react';
import {
  connect
} from 'react-redux';
import * as actions from '../../actions/estateManager/estateCompanyManager';
import {
  Link
} from 'react-router';
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Breadcrumb,
  Table,
  Select,
  message,
  Popconfirm,
  Radio,
  Card,
  Icon,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const createForm = Form.create;
const RadioGroup = Radio.Group;

var estateCompanyParams = {
  property_name: '',
  link_man: '',
  status: '',
  link_phone: '',
  login_name: '',
  alipay_account: '',
  page: 1,
  rows: 10,
}
class estateCompanyManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        localsize:10,
    }
    this.props.dispatch(actions.getList());
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!!err) {
        return;
      }
      estateCompanyParams.property_name = values.property_name;
      estateCompanyParams.link_man = values.link_man;
      estateCompanyParams.status = values.status;
      estateCompanyParams.link_phone = values.link_phone;
      estateCompanyParams.login_name = values.login_name;
      estateCompanyParams.alipay_account = values.alipay_account;
      estateCompanyParams.page = 1;

      this.props.dispatch(actions.getList(estateCompanyParams));
    });
  }

  companyOpenDown(text){
    var state = '';
    text.status==1? state=2:state=1;
    this.props.dispatch(actions.companyOpenDown({
      property_id: text.id,
      status: state,
    },()=>{
      this.props.dispatch(actions.getList(estateCompanyParams));
    }));
  }

  handlePaginationChange(page) {
    estateCompanyParams.page = page;
    this.props.dispatch(actions.getList(estateCompanyParams));
  }

  handleShowSizeChange(current,size) {
    estateCompanyParams.rows = size;
    this.setState({
      localsize: size
    })
    estateCompanyParams.page = 1;
    this.props.dispatch(actions.getList(estateCompanyParams));
  }

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
    estateCompanyParams = {
      property_name: '',
      link_man: '',
      status: '',
      link_phone: '',
      login_name: '',
      alipay_account: '',
      page: 1,
      rows: 10,
    }
    this.setState({
      localsize: 10
    })
    this.props.dispatch(actions.getList(estateCompanyParams));
  }

  render() {
    const columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '物业公司名称',
      dataIndex: 'property_name',
      key: 'property_name',
    }, {
      title: '父级公司',
      dataIndex: 'parent_name',
      key: 'parent_name',
    }, {
      title: '联系人',
      dataIndex: 'link_man',
      key: 'link_man',
    }, {
      title: '联系电话',
      dataIndex: 'link_phone',
      key: 'link_phone',
    }, {
      title: '登录账号',
      dataIndex: 'login_name',
      key: 'login_name',
    }, {
      title: '新增时间',
      dataIndex: 'create_at',
      key: 'create_at',
    }, {
      title: '状态',
      dataIndex: 'status',
      render: (text, record) => {
          return <span>{text==1?'启用':'禁用'}</span>
      }
    }, {
      title: '操作',
      render: (text, record) => {
        var link =  `/estateCompanyUpdate?id=${record.id}`;
        return <div>
          <Popconfirm title={record.status==1?'确定要禁用该物业公司帐号吗？':'确定要启用该物业公司帐号吗？'} onConfirm={this.companyOpenDown.bind(this,text)}>
            <Button>{record.status==1?'禁用':'启用'}</Button>
          </Popconfirm>
          <Link to={link}><Button className="mlr1">编辑</Button></Link>
        </div>
      }
    }]
    const formItemLayout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 16
      },
    }
    const {
      getFieldDecorator
    } = this.props.form;
    const {data,paginationTotal} = this.props.estateCompanyManager;
    const pagination = {
      showSizeChanger: true,
      showQuickJumper: true,
      current:estateCompanyParams.page,
      pageSize:this.state.localsize,
      onShowSizeChange:this.handleShowSizeChange.bind(this),
      onChange:this.handlePaginationChange.bind(this),
      total:parseInt(paginationTotal),
      pageSizeOptions:['10', '20','30','40'],
      defaultPageSize:10,
    }
    return (
      <div className="page-content">
        <Breadcrumb separator="/">
          <Breadcrumb.Item><a href="#/serveManager">物业管理</a></Breadcrumb.Item>
          <Breadcrumb.Item>物业公司管理</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Form horizontal>
            <Row>
              <Col span={6}>
                <FormItem label="物业公司" {...formItemLayout}>
                {getFieldDecorator('property_name')(<Input type="text" placeholder="请输入物业公司名称"/>)}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="联系人" {...formItemLayout}>
                  {getFieldDecorator('link_man')(<Input type="text" placeholder="请输入联系人姓名"/>)}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="状态" {...formItemLayout}>
                  {getFieldDecorator('status')(
                    <Select placeholder="请选择状态">
                      <Option value="1">启用</Option>
                      <Option value="2">禁用</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <FormItem label="联系电话" {...formItemLayout}>
                  {getFieldDecorator('link_phone')(<Input type="text" placeholder="请输入联系电话"/>)}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="登录账号" {...formItemLayout}>
                  {getFieldDecorator('login_name')(<Input type="text" placeholder="请输入登录账号"/>)}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="支付宝账号" {...formItemLayout}>
                  {getFieldDecorator('alipay_account')(<Input type="text" placeholder="请输入支付宝账号"/>)}
                </FormItem>
              </Col>
              <Col span={5} offset={1}>
                <Button type="primary" onClick={this.handleSubmit.bind(this)} className="mr1">查询</Button>
                <Button type="ghost" onClick={this.handleReset.bind(this)}>重置</Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card className="mt1">
           <Link to="/estateCompanyAdd">
            <span><Button type="primary"><Icon type="plus" />新增物业公司</Button></span>
           </Link>
           <Table dataSource={data} columns={columns}  className="mt1" pagination={pagination}/>
        </Card>
      </div>
    )
  }
}
estateCompanyManager = createForm()(estateCompanyManager);
export default connect(state => {
  return {
    estateCompanyManager: state.estateCompanyManager
  }
})(estateCompanyManager);
