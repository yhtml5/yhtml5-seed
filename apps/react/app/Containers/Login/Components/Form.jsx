import React from 'react'
import {Form, Icon, Input, Button, Checkbox} from 'antd'
import styles from './Form.pcss'

function LoginForm({onSubmit, form}) {

  function handleSubmit(e) {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    })
    onSubmit()
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
