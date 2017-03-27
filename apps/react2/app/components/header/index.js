'use strict';
import React from 'react';
import {Menu, Form, Input, Dropdown, Icon, Modal, Button, message} from 'antd';
import {connect} from 'react-redux';
import './index.less';
import * as actions from '../../actions/public';
const createForm = Form.create;
const FormItem = Form.Item;
var name = '',
  token = '';
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      let param = this.props.form.getFieldsValue(['password', 'old_password']);
      this.props.dispatch(actions.resetPassword(param));
    });
  }


  checkPass(rule, value, callback) {
    const {
      validateFields
    } = this.props.form;
    if (value) {
      validateFields(['rePasswd'], {
        force: true
      });
    }
    callback();
  }

  checkPass2(rule, value, callback) {
    const {
      getFieldValue
    } = this.props.form;
    if (value && value !== getFieldValue('password')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  }

  showModal() {
    this.setState({
      visible: true
    });
  }

  hideModal() {
    this.setState({
      visible: false
    });
    this.props.form.resetFields();
  }

  confirm() {
    var th = this;
    Modal.confirm({
      title: '确认退出该账号？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        var {
          dispatch
        } = th.props;
        dispatch(actions.logout());
      }
    });
  }

  render() {
    document.cookie.split(';').map((value, index) => {
      if (value.substring(0, value.indexOf('=')).trim() == 'zusername') {
        name = unescape(value.substring(value.indexOf('=') + 1));
      } else if (value.substring(0, value.indexOf('=')).trim() == 'ztoken') {
        token = value.substring(value.indexOf('=') + 1);
      }
    })

    if (!token) {
      //location.href = '/userSys/';
    }
    const {
      getFieldDecorator,
      getFieldValue,
      getFieldError,
      isFieldValidating
    } = this.props.form;
    const old_password = getFieldDecorator('old_password', {
        rules: [{
          required: true,
          message: '请填写原密码'
        }]
      }),
      password = getFieldDecorator('password', {
        rules: [{
          required: true,
          whitespace: true,
          min: 6,
          max: 20,
          message: '请输入6-20位新密码'
        }, {
          validator: this.checkPass.bind(this)
        }]
      }),
      rePasswd = getFieldDecorator('rePasswd', {
        rules: [{
          required: true,
          message: '再次输入新密码'
        }, {
          validator: this.checkPass2.bind(this),
        }]
      });
    const menu = (
      <Menu>
        <Menu.Item>
          <a onClick={this.showModal.bind(this)}>修改密码</a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={this.confirm.bind(this)}>退出登录</a>
        </Menu.Item>
      </Menu>
    )
    return (
      <div className="header-component">
        <div className="sitenav">
          <h3>智慧社区运营管理后台</h3>
          <Dropdown overlay={menu}>
            <div className="fr userInfo pointer">
              欢迎你，{name ? name : '默认用户'}
              <Icon type="down" className="ml1 fz12"/>
            </div>
          </Dropdown>
        </div>
        <Modal title="修改密码" visible={this.state.visible} onCancel={this.hideModal.bind(this)} footer={false}>
          <Form horizontal
                className="y-form-md">
            <FormItem hasFeedback>
              {getFieldDecorator('old_password', {rules: [{required: true, message: '请填写原密码'}]})(
                <Input type="password" placeholder="请填写原密码"/>)}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [{required: true, whitespace: true, min: 6, max: 20, message: '请输入6-20位新密码'},
                  {validator: this.checkPass.bind(this)}]
              })(
                <Input type="password" placeholder="请输入6-20位新密码"/>)}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('rePasswd', {
                rules: [{required: true, message: '再次输入新密码'},
                  {validator: this.checkPass2.bind(this),}]
              })(
                <Input type="password" placeholder="请再次输入新密码"/>)}
            </FormItem>
            <Button type="primary"
                    size="large"
                    className="w100"
                    onClick={this.handleSubmit.bind(this)}>提交
            </Button>
          </Form>
        </Modal>
      </div>
    );
  }
}
Header = Form.create()(Header)
export default connect(state => {
  return {
    header: state.header
  }
})(Header);
