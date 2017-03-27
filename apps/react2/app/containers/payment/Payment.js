'use strict';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import moment from 'moment';
import {Form, Breadcrumb, DatePicker, Table, Input, Button, Card, Select, Row, Col, Modal, Spin, Pagination, Upload, Icon, Radio, Popconfirm} from 'antd';

import {isEmptyObject, hasCookie} from '../../util/validator'
import * as action from '../../actions/payment/payment';
import PaymentBreadcrumb from  './PaymentBreadcrumb'
import {getToken} from  '../../util/index'

// import PaymentTable from  './PaymentTable'
// {this.props.payment.dataSelectService.map((value, index) => {
//   return <Select.OptGroup label={value.label} key={index}>
//     {value.children.map((values, index) => {
//       return <Select.Option value={values.value} key={index}>{values.label}</Select.Option>
//     })}
//   </Select.OptGroup>
// })}
import './Payment.less'

const {RangePicker} = DatePicker;

const formItemLayout ={
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

function Text(prop) {
  return (
    <p>{(isEmptyObject(prop.text))
      ? <span className='y-blue'>暂无数据</span>
      : prop.text}
    </p>
  )
}
function SelectServiceName(prop) {
  return (
    <SelectServiceName>
      <Select.OptGroup label="Manager">
        <Select.Option value="jack">Jack</Select.Option>
        <Select.Option value="lucy">Lucy</Select.Option>
      </Select.OptGroup>
    </SelectServiceName>
  )
}
let searchValue = {}
function getSearchValue(err, fieldsValue) {
  if (err) {
    return
  }
  const rangeValue = fieldsValue['range_picker'];
  console.log('searchValue.before: ', rangeValue);
  if (typeof(rangeValue) === "undefined") {
    delete fieldsValue.range_picker
    console.warn('searchValue.false: ', fieldsValue);
    return searchValue = fieldsValue
  } else if (rangeValue.length === 0) {
    delete fieldsValue.range_picker
    console.warn('searchValue.false: ', fieldsValue);
    return searchValue = fieldsValue
  } else {
    searchValue = {
      'paid_at_start': rangeValue[0].format('YYYY-MM-DD HH:mm:ss'),
      'paid_at_end': rangeValue[1].format('YYYY-MM-DD HH:mm:ss')
    }
  }
  delete searchValue.range_picker
  console.log('searchValue.true: ', searchValue);
  return searchValue
}
class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isUpload: true,
      loadingButtonExportReport: false,
      current: 1,
      pageSize: 10
    }
    this.props.dispatch(action.getList());
    this.props.dispatch(action.getServiceBillList());
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleViewDetail = this.handleViewDetail.bind(this);
    this.handleExportReport = this.handleExportReport.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(getSearchValue)
    searchValue.rows = this.state.pageSize
    console.warn('searchValue: ', searchValue)
    this.props.dispatch(action.getList(searchValue))
  }

  handleReset(e) {
    e.preventDefault();
    this.setState({
      current: 1,
      pageSize: 10
    })
    this.props.form.resetFields();
    this.props.dispatch(action.getList());
  }

  handleCancel() {
    this.setState({
      visible: false
    })
  }

  handleExportReport() {
    this.props.form.validateFields(getSearchValue)
    console.warn("handleExportReport.searchValue: ", searchValue)
    this.props.dispatch(action.exportReport(searchValue))
  }

  handleViewDetail(id) {
    console.log(id)
    console.log('handleViewDetail.id: ', id, Number(id))
    this.props.dispatch(action.getListDetails({bill_id: id}))
    this.setState({
      visible: true
    })
  }

  handleOk() {
    console.log(this.props.form.validateFields);
    this.props.form.validateFields(['name', 'parent_id', 'order_sort', 'status'], (errors, values) => {
      if (!!errors) {
        return;
      }
      console.log(values);
    })
  }

  handlePaginationChange(page) {
    console.log('handlePaginationChange.page', page)
    this.setState({
      current: page
    })
    searchValue.page = page
    searchValue.rows = this.state.pageSize
    console.warn('searchValue', searchValue)
    this.props.dispatch(action.getList(searchValue))
  }

  handleShowSizeChange(current, size) {
    console.log('handleShowSizeChange: ', current, size)
    this.setState({
      current: 1,
      pageSize: size
    })
    searchValue.page = 1
    searchValue.rows = size
    console.warn('searchValue', searchValue)
    this.props.dispatch(action.getList(searchValue))
  }

  render() {
    const {
      getFieldDecorator,
      getFieldError,
      isFieldValidating
    } = this.props.form;

    const columns = [{
      title: '交易编号',
      dataIndex: 'bill_id',
      key: 'bill_id',
      render: (text) => <span className='y-blue'>{text}</span>,
    }, {
      title: '交易流水号',
      dataIndex: 'trade_no',
      key: 'trade_no',
    }, {
      title: '省/市',
      dataIndex: 'city_name',
      key: 'city_name',
    }, {
      title: '小区名称',
      dataIndex: 'community_name',
      key: 'community_name',
    }, {
      title: '物业公司',
      dataIndex: 'property_company',
      key: 'property_company',
    }, {
      title: '物业公司帐号',
      dataIndex: 'property_account',
      key: 'property_account',
    }, {
      title: '支付帐号',
      dataIndex: 'buyer_logon_id',
      key: 'buyer_logon_id',
    }, {
      title: '缴费项',
      dataIndex: 'service_name',
      key: 'service_name',
    }, {
      title: '缴费金额(元)',
      dataIndex: 'paid_entry_amout',
      key: 'paid_entry_amout',
    }, {
      title: '缴费时间',
      dataIndex: 'paid_at',
      key: 'paid_at',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span>
            <a onClick={() => this.handleViewDetail(record.bill_id)}>详情</a>
        </span>
      ),
    }];
    console.log('Payment.this.props: ', this.props)

    return (
      <div className="page-content">
        <PaymentBreadcrumb/>
        <Form
          horizontal
          className="ant-advanced-search-form"
        >
          <Card className="mb1">
            <Row>
              <Col span={8}>
                <Form.Item
                  label="交易流水号"
                  className="y-label-left"
                  {...formItemLayout}>
                  {getFieldDecorator('trade_no', {})(
                    <Input placeholder="请输入流水号"/>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="小区名称"
                  {...formItemLayout}>
                  {getFieldDecorator('community_name', {})(
                    <Input placeholder="请输入小区名称"/>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="物业公司"
                  {...formItemLayout}>
                  {getFieldDecorator('property_company', {})(
                    <Input placeholder="请输入物业公司"/>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Form.Item
                  label="物业公司帐号"
                  className="y-label-left"
                  {...formItemLayout}>
                  {getFieldDecorator('property_account', {})(
                    <Input placeholder="请输入公司帐号"/>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="缴费项"
                  {...formItemLayout}>
                  {getFieldDecorator('service_id', {})(
                    <Select placeholder="请选择缴费项"
                            notFoundContent="没有缴费项"
                            optionFilterProp="children">
                      {this.props.payment.dataSelectService.map((value, index) => {
                        return <Select.Option value={value.id} key={index}>{value.name}
                        </Select.Option>
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="支付帐号"
                  {...formItemLayout}>
                  {getFieldDecorator('buyer_logon_id', {})(
                    <Input placeholder="请输入支付帐号"/>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={14}>
                <Form.Item
                  label="缴费时间"
                  className="y-RangePicker"
                  {...formItemLayout}>
                  {getFieldDecorator('range_picker', {})(
                    <RangePicker
                      ranges={{
                        '今天': [moment().startOf('day'), moment().endOf('day')],
                        '本月': [moment().startOf('month'), moment().endOf('month')],
                        '今年': [moment().startOf('year'), moment().endOf('year')],
                      }}
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder={['开始时间', '结束时间']}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item>
                  <Button type="primary"
                          loading={this.props.payment.loadingButtonSearch}
                          onClick={this.handleSubmit}>搜索</Button>
                  <Button style={{marginLeft: 8}} onClick={this.handleReset}>重置</Button>
                  <Button style={{marginLeft: 8}}
                          onClick={this.handleExportReport}>导出报表</Button>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card className="y-card-table">
            <Spin tip="数据加载中..."
                  size="large"
                  spinning={this.props.payment.loadingTable}>
              <p className="y-m-t-n-10">
                <span className="y-blue">总计缴费金额: </span>{this.props.payment.sumAmount}
              </p>
              <Table
                columns={columns}
                dataSource={this.props.payment.data}
                pagination={false}
                className="mt1"
              />
              <Pagination
                className="y-pagination"
                showQuickJumper={true}
                showSizeChanger={true}
                defaultCurrent={1}
                defaultPageSize={10}
                pageSizeOptions={['10', '20', '30', '40']}
                total={this.props.payment.paginationTotal}
                current={this.state.current}
                pageSize={this.state.pageSize}
                onShowSizeChange={this.handleShowSizeChange.bind(this)}
                onChange={this.handlePaginationChange.bind(this)}
              />
            </Spin>

          </Card>
          <Modal title='交易详情'
                 visible={this.state.visible}
                 onOk={this.handleCancel}
                 onCancel={this.handleCancel}>
            <Row>
              <Col span={6}>
                <p>交易流水号：</p>
                <p>小区名称：</p>
                <p>物业公司：</p>
                <p>物业公司帐号：</p>
                <p>支付帐号：</p>
                <p>支付人：</p>
                <p>支付金额：</p>
                <p>缴费项目：</p>
                <p>账单周期：</p>
                <p>支付时间：</p>
                <p>其它：</p>
              </Col>
              <Col span={18}>
                <Text text={this.props.payment.dataDetails.trade_no}/>
                <Text text={this.props.payment.dataDetails.community_name}/>
                <Text text={this.props.payment.dataDetails.property_company}/>
                <Text text={this.props.payment.dataDetails.property_account}/>
                <Text text={this.props.payment.dataDetails.buyer_logon_id}/>
                <Text text={this.props.payment.dataDetails.buyer_user_id}/>
                <Text text={this.props.payment.dataDetails.paid_entry_amout}/>
                <Text text={this.props.payment.dataDetails.cost_name}/>
                <Text text={this.props.payment.dataDetails.acct_period}/>
                <Text text={this.props.payment.dataDetails.paid_at}/>
                <Text text={this.props.payment.dataDetails.nodata}/>
              </Col>
            </Row>
          </Modal>
        </Form>
      </div>
    )
  }
}

Payment = Form.create({})(Payment);

export default connect(state => {
  return {
    payment: state.payment
  }
})(Payment);
