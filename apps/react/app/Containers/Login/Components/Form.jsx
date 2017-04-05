import React from 'react'
import Form from 'antd/lib/form'
import Icon from 'antd/lib/icon'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Checkbox from 'antd/lib/checkbox'
import 'antd/lib/form/style/css'
import 'antd/lib/icon/style/css'
import 'antd/lib/input/style/css'
import 'antd/lib/button/style/css'
import 'antd/lib/checkbox/style/css'

import styles from './form.pcss'

// import {Form, Icon, Input, Button, Checkbox} from 'antd'

function LoginForm({onSubmit, form}) {

  function handleSubmit() {
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit} className={styles.form}>
      <Form.Item>
        {form.getFieldDecorator('userName', {
          rules: [{required: true, message: 'Please input your username!'}],
        })(
          <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Username"/>
        )}
      </Form.Item>
      <Form.Item>
        {form.getFieldDecorator('password', {
          rules: [{required: true, message: 'Please input your Password!'}],
        })(
          <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="Password"/>
        )}
      </Form.Item>
      <Form.Item>
        {form.getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(
          <Checkbox>Remember me</Checkbox>
        )}
        <a className={styles.loginForgot}>Forgot password</a>
        <Button type="primary" htmlType="submit" className={styles.loginButton}>
          Log in
        </Button>
        Or <a>register now!</a>
      </Form.Item>
    </Form>
  )
}

LoginForm = Form.create()(LoginForm)

export default LoginForm
