'use strict';
import React from 'react';
import {
  connect
} from 'react-redux';
import * as actions from '../../actions/estateManager/communityManager';
import {
  Form,
  Breadcrumb,
  Table,
  Input,
  Button,
  Card, Cascader, Row, Col, Select, Modal, Popconfirm, TreeSelect, Upload, Icon, message, Radio
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
var js = "(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}"
const Layout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 19
  },
}
const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  },
}

var communityParams = {
  community_no: '',
  city_id: '',
  name: '',
  company_name: '',
  status: '',
  phone: '',
  page: 1,
  rows: 10,
}
class communityManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isUpload: true,
      isUpload2: true,
      localsize: 10,
    }
    this.props.dispatch(actions.getList());
    this.props.dispatch(actions.getArea());
  }

  //小区上线下线
  statusChange(record) {
    var status = ""
    record.status == 1 ? status = 2 : status = 1;
    let {dispatch} = this.props;
    dispatch(actions.statusChange({"community_id": record.id, "status": status}, () => {
      this.props.dispatch(actions.getList(communityParams));
    }));
  }

  //重置列表
  handleReset(e) {
    e.preventDefault();
    let {dispatch} = this.props;
    communityParams = {
      community_no: '',
      city_id: '',
      name: '',
      company_name: '',
      status: '',
      phone: '',
      page: 1,
      rows: 10,
    }

    this.setState({
      localsize: 10
    })
    this.props.form.resetFields();
    dispatch(actions.getList(communityParams));
  }

  //搜索列表
  handSearch(val) {
    let {dispatch} = this.props;
    this.props.form.validateFields((err, values) => {
      communityParams.community_no = values.community_no;
      // communityParams.city_id = values.city_id;
      communityParams.name = values.name;
      communityParams.company_name = values.company_name;
      communityParams.status = values.status;
      communityParams.phone = values.phone;
      communityParams.page = 1;
      if (values.city_id != undefined) {
        // communityParams.city_id = [];
        communityParams.city_id = values.city_id[1];
      } else {
        communityParams.city_id = "";
      }
      dispatch(actions.getList(communityParams));
    });
  }

  handlePaginationChange(page) {
    communityParams.page = page;
    this.props.dispatch(actions.getList(communityParams));
  }

  handleShowSizeChange(current, size) {
    communityParams.rows = size;
    this.setState({
      localsize: size
    })
    communityParams.page = 1;
    this.props.dispatch(actions.getList(communityParams));
  }

  render() {
    const {
      data,
      options,
      paginationTotal
    } = this.props.communityManager;
    const columns = [{
      title: '小区编号',
      dataIndex: 'community_no',
      key: 'community_no',
    }, {
      title: '所属省',
      dataIndex: 'province_name',
      key: 'province_name',
    }, {
      title: '所属市',
      dataIndex: 'city_name',
      key: 'city_name',
    }, {
      title: '小区名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return (<span title={text}>{text.length > 10 ? text.substring(0, 10) + '...' : text}</span>)
      }
    }, {
      title: '小区地址',
      dataIndex: 'address',
      key: 'address',
      render: (text, record) => {
        return (<span title={text}>{text.length > 10 ? text.substring(0, 10) + '...' : text}</span>)
      }
    }, {
      title: '关联物业公司',
      dataIndex: 'company_name',
      key: 'company_name',
    }, {
      title: '物业电话',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '开通服务',
      dataIndex: 'service_list',
      key: 'service_list',
      render: (text, record) => {
        return (<span title={text}>{text.length > 10 ? text.substring(0, 10) + '...' : text}</span>)
      }
    }, {
      title: '小区状态',
      key: 'status',
      dataIndex: 'status',
      render: (text, record) => {
        if (text == 1) {
          return <span>上线</span>
        } else if (text == 2) {
          return <span>下线</span>
        }
      }
    }, {
      title: '新增时间',
      dataIndex: 'create_at',
      key: 'create_at',
    }, {
      title: '操作',
      dataIndex: 'desc',
      render: (text, record) => {
        var link = `/communityManagerEdit?id=${record.id}`;
        return <div>
          <Popconfirm title={record.status == 1 ? '确定要下线这个小区么？' : '确定要上线这个小区么？'} onConfirm={this.statusChange.bind(this, record)}>
            <Button>{record.status == 1 ? '下线' : '上线'}</Button>
          </Popconfirm>
          {'  '}
          <Link to={link}><Button className="mlr1">编辑</Button></Link>
        </div>
      }
    }];
    const {
      getFieldDecorator
    } = this.props.form;
    const pagination = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: communityParams.page,
      pageSize: this.state.localsize,
      onShowSizeChange: this.handleShowSizeChange.bind(this),
      onChange: this.handlePaginationChange.bind(this),
      total: parseInt(paginationTotal),
      pageSizeOptions: ['10', '20', '30', '40'],
      defaultPageSize: 10,
    }
    return (
      <div className="page-content">
        <Breadcrumb separator="/">
          <Breadcrumb.Item><a href="#/serveManager">物业管理</a></Breadcrumb.Item>
          <Breadcrumb.Item>小区管理</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Form horizontal>
            <Row>
              <Col span={6}>
                <FormItem label="小区编号" {...formItemLayout}>
                  {getFieldDecorator('community_no')(<Input placeholder="请输入小区编号"/>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="省、市" {...formItemLayout}>
                  {getFieldDecorator('city_id', {})(<Cascader options={options} placeholder="请选择"/>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="小区名称" {...formItemLayout}>
                  {getFieldDecorator('name')(<Input type="text" placeholder="请输入小区名称"/>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row >
              <Col span={6}>
                <FormItem label="物业公司" {...formItemLayout}>
                  {getFieldDecorator('company_name')(<Input placeholder="请输入物业公司"/>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="小区状态" {...formItemLayout}>
                  {getFieldDecorator('status')(
                    <Select placeholder="请选择">
                      <Select.Option value="1">上线</Select.Option>
                      <Select.Option value="2">下线</Select.Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="物业电话" {...formItemLayout}>
                  {getFieldDecorator('phone')(<Input type="text" placeholder="请输入物业电话"/>
                  )}
                </FormItem>
              </Col>
              <Col span={5} offset={1}>
                <Button type="primary" onClick={this.handSearch.bind(this)} className="mr1">查询</Button>
                <Button type="ghost" onClick={this.handleReset.bind(this)}>重置</Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card className="mt1">
          <Link to="/communityManagerAdd">
            <span><Button type="primary"><Icon type="plus"/>新增小区</Button></span>
          </Link>
          <Table columns={columns} dataSource={data} className="mt1" pagination={pagination}/>
        </Card>

      </div>
    )
  }
}
communityManager = createForm()(communityManager);
export default connect(state => {
  return {
    communityManager: state.communityManager
  }
})(communityManager);
