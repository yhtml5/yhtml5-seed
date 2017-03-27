import React from 'react'
import {Modal, Row, Col} from 'antd'
import {isEmptyObject} from '../../util/validator'

function Text(prop) {
  return (
    <p>{(isEmptyObject(prop.text))
      ? <span className='y-blue'>暂无数据</span>
      : prop.text}
    </p>
  )
}

function PaymentModal({
  visible, title, dataDetails,
  onOk, onCancel,
}) {
  return (
    <Modal title={title}
           visible={visible}
           onOk={onOk}
           onCancel={onCancel}>
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
          <Text text={dataDetails.trade_no}/>
          <Text text={dataDetails.community_name}/>
          <Text text={dataDetails.property_company}/>
          <Text text={dataDetails.property_account}/>
          <Text text={dataDetails.buyer_logon_id}/>
          <Text text={dataDetails.buyer_user_id}/>
          <Text text={dataDetails.paid_entry_amout}/>
          <Text text={dataDetails.cost_name}/>
          <Text text={dataDetails.acct_period}/>
          <Text text={dataDetails.paid_at}/>
          <Text text={dataDetails.nodata}/>
        </Col>
      </Row>
    </Modal>
  )
}
export default PaymentModal
