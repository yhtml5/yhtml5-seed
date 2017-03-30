import React from 'react'
import {Link} from 'react-router';
import {Row, Col, Card, Icon, Popconfirm, Modal, Pagination, Button, Form} from 'antd'
import {connect} from 'react-redux'
import Breadcrumb from '../../app/components/Breadcrumb.js'
import Search from './Search.js'
import Table from './Table.js'
import {addUser, searchUserManagement, resetUserManagement, updateState, changePage, changeStatus, editUser}  from './task';
import {validator} from  '../../app/validator'
import './index.less'

function UserManagement(props) {
  console.log('userManagementProps: ', props)
  const breadcrumbProps = {
    list: [{
      name: '系统设置',
    }, {
      name: '用户管理',
    }]
  }
  const paginationProps = {
    className: 'y-card-pagination',
    showQuickJumper: true,
    showTotal(total, range){
      return '共搜索到 ' + props.userManagement.tableTotals + ' 条数据'
    },
    defaultCurrent: 1,
    current: props.userManagement.tableCurrent,
    defaultPageSize: 10,
    pageSize: props.userManagement.tablePageSize,
    total: props.userManagement.tableTotals,
    onChange(page){
      props.dispatch(changePage(page))
    }
  }

  const tableProps = {
    dataSource: props.userManagement.tableData,
    loading: props.userManagement.tableLoading,
    managerId: props.userManagement.managerId,
    onChangeStatus(value){
      if (value.id != props.userManagement.managerId) {
        Modal.confirm({
          title: (value.is_enable == '1') ? '确认禁用该用户？' : '确认启用该用户？',
          content: (value.is_enable == '1') ? '禁用用户后，该用户将无法登录系统' : '启用用户后，该用户将可以正常登录系统',
          onOk(){
            return new Promise((resolve, reject) => {
              props.dispatch(changeStatus(value, resolve, reject))
            }).catch(() => console.log('Oops errors!'));
          },
          onCancel(){

          }
        })
      }
    },
    onEdit(value){
      if (value.id != props.userManagement.managerId) {
        props.dispatch(editUser(value))
        props.router.push('/userManagement/userEdit')
      }
    }
  }

  const searchProps = {
    userName: props.userManagement.userName,
    buttonConfirmLoading: props.userManagement.searchButtonConfirmLoading,
    buttonResetLoading: props.userManagement.searchButtonResetLoading,
    onOk(){
      console.log('onOk')
    },
    onSearch(userName){
      props.dispatch(searchUserManagement(userName))
    },
    onReset(){
      props.dispatch(resetUserManagement())
    }
  }

  function createUser() {
    props.dispatch(addUser())
    props.router.push('/userManagement/userAdd')
  }

  return (
    <div className="userManagement">
      <Breadcrumb {...breadcrumbProps}/>
      <Search {...searchProps}/>
      <Card className="y-m-b-40">
        <div className="btn-group-left y-m-b-40">
          <Button type="primary"
                  onClick={createUser}
          >新增用户</Button>
        </div>
        <Table {...tableProps}/>
        <Pagination {...paginationProps}/>
      </Card>
    </div>
  )
}

export default connect(state => {
  return {
    userManagement: state.userManagement,
  }
})(UserManagement);
