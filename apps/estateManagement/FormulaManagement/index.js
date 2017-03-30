import React from 'react'
import {Row, Col, Card, Icon, Popconfirm, Modal, Pagination, Button, Form} from 'antd'
import {connect} from 'react-redux'
import Breadcrumb from './Breadcrumb.js'
import FormulaAddModal from './FormulaAddModal.js'
import FormulaDisplays from './FormulaDisplays'
import {toggleFormulaAddModal, submitFormula, getFormulaList, deleteFormula}  from './task';
import {routeChange} from '../../app/route'
import './index.less'

function FormulaManagement(props) {
  console.log('FormulaManagement: ', props)

  const PaginationProps = {
    showQuickJumper: true,
    showTotal(total, range){
      return '总计 ' + props.formulaManagement.totals + ' 条数据'
    },
    defaultCurrent: 1,
    current: props.formulaManagement.current,
    defaultPageSize: 8,
    total: props.formulaManagement.totals,
    onChange(page){
      props.dispatch(getFormulaList(page))
    }
  }

  const FormulaDisplaysProps = {
    items: props.formulaManagement.list,
    onAdd(){
      props.dispatch(toggleFormulaAddModal(true))
    },
    onDelete(id, resolve, reject) {
      props.dispatch(deleteFormula(id, resolve, reject))
    }
  }

  const FormulaAddModalProps = {
    visible: props.formulaManagement.visible,
    loading: props.formulaManagement.submitButtonLoading,
    onOk(){
      console.log('onOk')
    },
    onCancel(){
      props.dispatch(toggleFormulaAddModal(false));
    },
    onSubmit(formulaName, formula, callback){
      props.dispatch(submitFormula(formulaName, formula, callback))
      setTimeout(() => {
        props.dispatch(getFormulaList())
      }, 1000)
    },
  }

  return (
    <div className="FormulaManagement">
      <Breadcrumb/>
      <FormulaDisplays {...FormulaDisplaysProps}/>
      <Pagination {...PaginationProps}/>
      <FormulaAddModal {...FormulaAddModalProps}/>
    </div>
  )
}

export default connect(state => {
  return {
    formulaManagement: state.formulaManagement,
  }
})(FormulaManagement);
