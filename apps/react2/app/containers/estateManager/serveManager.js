'use strict';
import React from 'react';
import {
  connect
} from 'react-redux';
import * as actions from '../../actions/estateManager/serveManager';
import {
  Form,
  Breadcrumb,
  Table,
  Input,
  Button,
  Card,
  Select,
  Row,
  Col,
  Icon,
  Popconfirm,
  message
} from 'antd';
import {
  Link
} from 'react-router';
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;

var serverParams = {
    page: 1,
    rows: 10,
    service_no: '',
    service_name: '',
    service_parent_id:'',
    service_status: '',
}
class serveManager extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          localsize:10,
      }
      this.props.dispatch(actions.getList());
      this.props.dispatch(actions.parentName());
  }

  //切换服务
  checkServer(status, service_no) {
    var state = '';
    status==1? state=2:state=1;
    this.props.dispatch(actions.serverCheck({
      service_id: service_no,
      status: state
    }, () => {
      this.props.dispatch(actions.getList(serverParams))
    }));
  }

  queryServer(e) {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!!err) {
          return;
        }
        serverParams.service_no = values.service_no;
        serverParams.service_name = values.service_name;
        serverParams.service_parent_id = values.service_parent_id;
        serverParams.service_status = values.service_status;
        serverParams.page = 1;
        this.props.dispatch(actions.getList(serverParams));
      });
  }

  handlePaginationChange(page) {
    serverParams.page = page;
    this.props.dispatch(actions.getList(serverParams));
  }

  handleShowSizeChange(current,size) {
    serverParams.rows = size;
    this.setState({
      localsize: size
    })
    serverParams.page = 1;
    this.props.dispatch(actions.getList(serverParams));
  }

  handleReset(e) {
      e.preventDefault();
      this.props.form.resetFields();
      serverParams = {
        page: 1,
        rows: 10,
        service_no: '',
        service_name: '',
        service_parent_id: '',
        service_status: '',
      }
      this.setState({
        localsize: 10
      })
      this.props.dispatch(actions.getList(serverParams));
  }

  render() {
    const columns = [{
      title: '服务编号',
      dataIndex: 'service_no',
      key: 'service_no',
    }, {
      title: '服务名称',
      dataIndex: 'name',
      key: 'name',
      render:(text,record)=>{
          return (<span title={text}>{text.length>10?text.substring(0,10)+'...':text}</span>)
      }
    }, {
      title: '父级名称',
      dataIndex: 'parent_name',
      key: 'parent_name',
    }, {
      title: '服务图标',
      dataIndex: 'img_url',
      key: 'img_url',
      render: (text) => {
        return <img src={`${text}`}/>
      }
    }, {
      title: '服务说明',
      dataIndex: 'intro',
      key: 'intro',
      render:(text,record)=>{
        if(text != null){
            return (<span title={text}>{text.length>10?text.substring(0,10)+'...':text}</span>)
        }
      }
    }, {
      title: '状态',
      dataIndex: 'status',
      render: (text, record) => {
          return <span>{text==1?'启用':'禁用'}</span>
      }
    }, {
      title: '排序',
      dataIndex: 'order_sort',
      key: 'order_sort',
    }, {
      title: '操作',
      dataIndex: 'desc',
      render: (a, b) => {
        var link =  `/serveManagerUpdate?id=${b.service_no}`;
        var links =  `/serveManagerSub?id=${b.service_no}&name=${b.name}`;

        return <div>
      <Popconfirm placement="topLeft" title={b.status==1?'确定要禁用该服务吗？':'确定要启用该服务吗？'} onConfirm={this.checkServer.bind(this,b.status,b.service_no)}>
        <Button>{b.status==1?'禁用':'启用'}</Button>
      </Popconfirm>
      <Link to={link}><Button className="mlr1">编辑</Button></Link>
      <Link to={links}><Button>新增子服务</Button></Link>
    </div>
      }
    }];
    const {
      getFieldDecorator,
      getFieldError,
      isFieldValidating
    } = this.props.form;
    const {
      data,
      parentList,
      paginationTotal
    } = this.props.serveManager;
    const formItemLayout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 16
      },
    }
    const pagination = {
      showSizeChanger: true,
      showQuickJumper: true,
      current:serverParams.page,
      pageSize:this.state.localsize,
      onShowSizeChange:this.handleShowSizeChange.bind(this),
      onChange:this.handlePaginationChange.bind(this),
      total:parseInt(paginationTotal),
      pageSizeOptions:['10', '20', '30', '40'],
      defaultPageSize:10,
    };
    return (
      <div className="page-content">
        <Breadcrumb separator="/">
          <Breadcrumb.Item><a href="#/serveManager">物业管理</a></Breadcrumb.Item>
          <Breadcrumb.Item>服务管理</Breadcrumb.Item>
        </Breadcrumb>
        <Card className="mb1">
          <Form horizontal>
            <Row>
              <Col span={6}>
                <FormItem label="服务编号" {...formItemLayout}>
                {getFieldDecorator('service_no')(<Input type="text" placeholder="请输入服务编号"/>)}
                </FormItem>
              </Col>
              <Col span={6}>
                <FormItem label="服务名称" {...formItemLayout}>
                  {getFieldDecorator('service_name')(<Input type="text" placeholder="请输入服务名称"/>)}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={6}>
                <FormItem label="父级名称" {...formItemLayout}>
                    {getFieldDecorator('service_parent_id')(
                      <Select placeholder="请选择父级名称">
                      <Option key={-1} value="-1">无</Option>
                        {parentList.map((value,index)=>{
                          return <Option key={index} value={value.service_id}>{value.name}</Option>
                        })}
                      </Select>
                    )}
                  </FormItem>
              </Col>
              <Col span={6}>
                  <FormItem label="服务状态" {...formItemLayout}>
                    {getFieldDecorator('service_status')(
                      <Select placeholder="请选择服务状态">
                        <Option value="1">启用</Option>
                        <Option value="2">禁用</Option>
                      </Select>
                    )}
                  </FormItem>
              </Col>
              <Col span={5} offset={1}>
                <Button type="primary" onClick={this.queryServer.bind(this)} className="mr1">查询</Button>
                <Button type="ghost" onClick={this.handleReset.bind(this)}>重置</Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card className="mt1">
            <Link to="/serveManagerAdd">
              <Button type="primary"><Icon type="plus" />新增服务</Button>
            </Link>
            <Table columns={columns} dataSource={data} className="mt1" pagination={pagination}/>
        </Card>
      </div>
    )
  }
}
serveManager = Form.create({})(serveManager);
export default connect(state => {
  return {
    serveManager: state.serveManager
  }
})(serveManager);
