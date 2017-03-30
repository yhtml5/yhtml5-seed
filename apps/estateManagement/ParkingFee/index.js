import React from 'react'
import {Row, Col, Card, Icon, Popconfirm, Modal, Pagination, Button, Form} from 'antd'
import {connect} from 'react-redux'
import Breadcrumb from '../../app/components/Breadcrumb.js'
import Search from './Search.js'
import Table from './Table.js'
import TableHeader from './TableHeader'
import {searchParkingFee, changePage, exportBill}  from './task';
import {validator} from  '../../app/validator'
import {notRepeating} from  '../../app/util'
import './index.less'

function ParkingFee(props) {
  console.log('ParkingFeeProps: ', props)

  const breadcrumbProps = {
    list: [{
      name: '缴费管理',
    }, {
      name: '临时停车费',
    }]
  }
  const searchProps = {
    onOk(){
      console.log('onOk')
    },
    onSearch(number, timeStart, timeEnd){
      props.dispatch(searchParkingFee(number, timeStart, timeEnd))
    },
  }

  const tableHeaderProps = {
    loading: props.parkingFee.tableExportLoading,
    onExport(){
      notRepeating(() => props.dispatch(exportBill()))
    }
  }

  const tableProps = {
    dataSource: props.parkingFee.list,
    loading: props.parkingFee.tableLoading

  }

  const PaginationProps = {
    className: 'y-card-pagination',
    showQuickJumper: true,
    showTotal(total, range){
      const amount = validator.isStringEmpty(props.parkingFee.amount) ? '0' : props.parkingFee.amount
      return '共搜索到 ' + props.parkingFee.totals + ' 条数据，共计已缴金额 ' + amount + ' 元'
    },
    defaultCurrent: 1,
    current: props.parkingFee.current,
    defaultPageSize: 10,
    total: props.parkingFee.totals,
    onChange(page){
      props.dispatch(changePage(page))
    }
  }

  return (
    <div className="ParkingFee">
      <Breadcrumb {...breadcrumbProps}/>
      <Search {...searchProps}/>
      <Card className="y-m-b-40">
        <TableHeader {...tableHeaderProps}/>
        <Table {...tableProps}/>
        <Pagination {...PaginationProps}/>
      </Card>
    </div>
  )
}

export default connect(state => {
  return {
    parkingFee: state.parkingFee,
  }
})(ParkingFee);
