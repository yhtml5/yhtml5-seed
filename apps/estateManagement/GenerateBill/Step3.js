import React from 'react'
import {connect} from 'react-redux'
import {Table, Card, Pagination, Button} from 'antd'
import {backStep2, changePage, publishBill, cancelGenerateBill}  from './task';
import {validator} from '../../app/validator'
function Step3(props) {
  console.log('step3: ', props)

  const columns = [{
    title: '苑',
    dataIndex: 'group',
    render: renderColumns
  }, {
    title: '幢',
    dataIndex: 'building',
    render: renderColumns
  }, {
    title: '单元',
    dataIndex: 'unit',
    render: renderColumns
  }, {
    title: '室',
    dataIndex: 'room',
    render: renderColumns
  }, {
    title: '物业类型',
    dataIndex: 'property_type',
    render: renderColumns
  }, {
    title: '收费面积',
    dataIndex: 'charge_area',
    render: renderColumns
  }, {
    title: '账期开始时间',
    dataIndex: 'acct_period_start',
    render: renderColumns
  }, {
    title: '账结束时间',
    dataIndex: 'acct_period_end',
    render: renderColumns
  }, {
    title: '缴费项目',
    dataIndex: 'cost_name',
    render: renderColumns
  }, {
    title: '应缴金额',
    dataIndex: 'bill_entry_amount',
    render: renderColumns
  }]

  const PaginationProps = {
    className: 'y-card-pagination',
    showQuickJumper: true,
    showTotal(total, range){
      const tableAmount = validator.isStringEmpty(props.generateBill.tableAmount) ? '0' : props.generateBill.tableAmount
      return '共搜索到 ' + props.generateBill.tableTotals + ' 条数据，共计应缴金额 ' + tableAmount + ' 元'
    },
    defaultCurrent: 1,
    defaultPageSize: 10,
    current: props.generateBill.tableCurrent,
    total: props.generateBill.tableTotals,
    onChange(current){
      props.dispatch(changePage(current))

    }
  }

  function renderColumns(text, record) {
    return (validator.isStringEmpty(text)) ? '--' : text
  }

  function onPublish() {
    props.dispatch(publishBill())
  }

  function onCancel() {
    props.dispatch(cancelGenerateBill())
  }

  return (
    <Card className="y-m-b-40">
      <Table
        rowKey={record => record.id}
        columns={columns}
        loading={props.generateBill.tableLoading}
        dataSource={props.generateBill.tableData}
        pagination={false}
      />

      <Pagination {...PaginationProps}/>

      <div className="text-center y-m-t-100">
        <Button
          type="primary"
          className="y-m-l-10"
          loading={props.generateBill.step3ButtonConfirmLoading}
          onClick={onPublish}
        >确定并发布账单</Button>
        <Button
          className="y-m-l-10"
          loading={props.generateBill.step3ButtonCancelLoading}
          onClick={onCancel}
        >取消</Button>
      </div>
    </Card>
  )
}

export default connect(state => {
  return {
    generateBill: state.generateBill,
  }
})(Step3);
