import React from 'react'
import {Form, Icon, Input, Button,Checkbox} from 'antd'
import {notRepeating}from '../../../util/util'
import styles from './Form.pcss'

function LoginForm({onSubmit, form, loading, hasRegister}) {

  // function handleSubmit(e) {
  //   e.preventDefault()
  //   return notRepeating(() =>
  //     form.validateFields((err, values) => {
  //       if (!err) {
  //         console.log('Received values of form: ', values)
  //         onSubmit(values)
  //       }
  //     })
  //   )
  // }

  const handleSubmit = (e) =>
    notRepeating(() =>
      form.validateFields((err, values) => {
        e.preventDefault()
        if (!err) {
          if (process.env.NODE_ENV !== 'production') {
          console.log('Received values of form: ', values)
          }
          onSubmit(values)
        }
      }))

  return (
    <Form className={styles.form}
          onSubmit={handleSubmit}>
      <Form.Item>
        {form.getFieldDecorator('LoginName', {
          rules: [{
            required: true,
            message: '用户名不能为空'
          }],
        })(
          <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="请输入用户名"/>
        )}
      </Form.Item>
      <Form.Item>
        {form.getFieldDecorator('LoginPassword', {
          rules: [{
            required: true,
            message: '密码不能为空'
          }],
        })(
          <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="请输入密码"/>
        )}
      </Form.Item>
      <Form.Item className="no-select">
        {form.getFieldDecorator('LoginRemember', {
          valuePropName: 'checked',
          initialValue: true,
        })(
          <Checkbox>记住我</Checkbox>
        )}
        <a className={styles.loginForgot}>忘记密码</a>
        <Button type="primary"
                htmlType="submit"
                loading={loading}
                className={styles.loginButton}
                icon="login"
        >登录</Button>
        {(hasRegister) ? <span><Icon type="arrow-right"/> <a> 去注册 </a></span> : ''}
      </Form.Item>
    </Form>
  )
}

LoginForm = Form.create()(LoginForm)

export default LoginForm
