import React, { Component } from 'react'
import { Form, Icon, Input } from 'antd';
import { LoginWrap, MyButton, TitleWrap } from './style'
import { connect } from 'react-redux'
import { asyncSignIn } from './store/actionCreates'

 class Login extends Component {
  handleSubmit = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 表单校验成功，可以发送请求验证账号密码
        console.log('Received values of form: ', values);
        this.props.handleSignIn(values)
      }
    });
   }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <LoginWrap>
        <TitleWrap>用户登录</TitleWrap>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: '邮箱不能为空' },
                { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱' }
            ],
            })(
              <Input
                prefix={<Icon type="username" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入邮箱"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: '密码不能为空' },
                { min: 3, message: '密码最少为3位' }
            ],
            })(
              <Input
                prefix={<Icon type="password" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入密码"
              />,
            )}
          </Form.Item>
          <MyButton htmlType="submit">登陆</MyButton>
        </Form>
      </LoginWrap>
    )
  }
}
const mapDispatchToProps = (dispatch, props) => ({
  handleSignIn(value){
    console.log(props)
    dispatch(asyncSignIn(value, props))
  }
})

const LoginUI = Form.create({})(Login)

export default connect(null, mapDispatchToProps)(LoginUI)
