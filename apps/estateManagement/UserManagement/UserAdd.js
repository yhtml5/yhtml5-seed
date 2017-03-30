import React from 'react'
import {Link} from 'react-router';
import {Row, Col, Card, Icon, Popconfirm, Modal, Pagination, Button, Form} from 'antd'
import {connect} from 'react-redux'
import Breadcrumb from '../../app/components/Breadcrumb.js'
import UserAddForm from './UserAddForm'
import UserAddCard from './UserAddCard'
import Search from './Search.js'
import Table from './Table.js'
import {addUserCancel, addUserSave, checkAddMenus, checkAddCommunities, editUserSave}  from './task';
import {validator} from  '../../app/validator'
import './index.less'

let buttonStatus = true

function UserAdd(props) {
  console.log('UserAddProps: ', props)

  const breadcrumbProps = {
    list: [{
      name: '系统设置',
    }, {
      name: '用户管理',
      href: '/userManagement'
    }, {
      name: '新增用户'
    }]
  }

  const userAddFormProps = {
    name: props.userManagement.addFormName,
    sex: props.userManagement.addFormSex,
    phone: props.userManagement.addFormPhone,
    loading: props.userManagement.addButtonSaveLoading,
    onSave(value){
      if (buttonStatus) {
        props.dispatch(addUserSave(value))
        buttonStatus = false
        setTimeout(() => buttonStatus = true, 2000)
      }
    },
    onCancel(){
      props.dispatch(addUserCancel())
      props.router.push('/userManagement')
    }
  }

  const userAddCardLeftProps = {
    title: '菜单权限',
    data: props.userManagement.userMenus,
    loading: props.userManagement.userMenusLoading,
    defaultCheckedKeys: props.userManagement.addMenusCurrent,
    onCheck(checkedKeys, info){
      props.dispatch(checkAddMenus(checkedKeys))
    }
  }

  const userAddCardRightProps = {
    offset: 2,
    title: '小区权限',
    data: props.userManagement.userCommunities,
    loading: props.userManagement.userCommunitiesLoading,
    defaultCheckedKeys: props.userManagement.addCommunitiesCurrent,
    onCheck(checkedKeys, info){
      props.dispatch(checkAddCommunities(checkedKeys))
    }
  }

  return (
    <div className="userManagement">
      <Breadcrumb {...breadcrumbProps}/>
      <UserAddForm  {...userAddFormProps}>
        <Row style={{marginBottom: '40px'}}>
          <UserAddCard {...userAddCardLeftProps}/>
          <UserAddCard {...userAddCardRightProps}/>
        </Row>
      </UserAddForm>
    </div>
  )
}

export default connect(state => {
  return {
    userManagement: state.userManagement,
  }
})(UserAdd);
