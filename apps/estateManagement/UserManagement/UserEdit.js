import React from 'react'
import {Link} from 'react-router';
import {Row, Col, Card, Icon, Popconfirm, Modal, Pagination, Button, Form} from 'antd'
import {connect} from 'react-redux'
import Breadcrumb from '../../app/components/Breadcrumb.js'
import UserEditForm from './UserEditForm'
import UserEditCard from './UserEditCard'
import Search from './Search.js'
import Table from './Table.js'
import {editUserCancel, editUserSave, checkEditMenus, checkEditCommunities}  from './task';
import {validator} from  '../../app/validator'
import './index.less'

function UserEdit(props) {
  console.log('UserEditProps: ', props)

  if (props.userManagement.userIdCurrent == '') {
    props.router.push('/userManagement')
  }

  const breadcrumbProps = {
    list: [{
      name: '系统设置',
    }, {
      name: '用户管理',
      href: '/userManagement'
    }, {
      name: '编辑用户',
    }]
  }

  const userEditFormProps = {
    name: props.userManagement.editFormName,
    sex: props.userManagement.editFormSex,
    phone: props.userManagement.editFormPhone,
    loading: props.userManagement.editButtonSaveLoading,
    formLoading: props.userManagement.editFormLoading,
    userId: props.userManagement.userIdCurrent,
    onSave(value){
      props.dispatch(editUserSave(value))
    },
    onCancel(){
      props.dispatch(editUserCancel())
      props.router.push('/userManagement')
    },
    onRoute(route){
      props.router.push(route)
    }
  }

  const userEditCardLeftProps = {
    title: '菜单权限',
    data: props.userManagement.userMenus,
    loading: props.userManagement.userMenusLoading,
    keys: props.userManagement.editMenusCurrent,
    onCheck(checkedKeys, info){
      props.dispatch(checkEditMenus(checkedKeys))
    }
  }

  const userEditCardRightProps = {
    offset: 2,
    title: '小区权限',
    data: props.userManagement.userCommunities,
    loading: props.userManagement.userCommunitiesLoading,
    keys: props.userManagement.editCommunitiesCurrent,
    onCheck(checkedKeys, info){
      props.dispatch(checkEditCommunities(checkedKeys))
    }
  }

  return (
    <div className="userManagement">
      <Breadcrumb {...breadcrumbProps}/>
      <UserEditForm  {...userEditFormProps}>
        <Row style={{marginBottom: '40px'}}>
          <UserEditCard {...userEditCardLeftProps}/>
          <UserEditCard {...userEditCardRightProps}/>
        </Row>
      </UserEditForm>
    </div>
  )
}

export default connect(state => {
  return {
    userManagement: state.userManagement,
  }
})(UserEdit);
