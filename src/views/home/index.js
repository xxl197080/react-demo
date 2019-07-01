import React, { Component } from 'react'
import { Layout, Menu, Icon, Button } from 'antd'
import { HomeWrap, HeaderWrap, SiderWrap, ContentWrap, Logo } from './style'
import { Route, Switch, NavLink, Redirect } from 'react-router-dom'
import Student from './student'
export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }
  toggle = () => {
    this.setState((state) =>({
      collapsed: !state.collapsed
    }))
  }
  onSignOut = () => {
    window.localStorage.removeItem('user')
    window.location.reload();
  }
  render() {
    return (
      <HomeWrap>
        <Layout>
          <SiderWrap collapsible collapsed={this.state.collapsed}>
            <Logo />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <NavLink to="/student">
                  <Icon type="user" />
                  学生管理
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink to="teacher">
                  <Icon type="video-camera" />
                  班级管理
                </NavLink>
              </Menu.Item>
            </Menu>
          </SiderWrap>
          <Layout>
            <HeaderWrap>
              <Icon
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <Button onClick={ this.onSignOut }>退出登录</Button>
            </HeaderWrap>
            <ContentWrap>
              <Switch>
                <Route path="/student" render={() => <Student />} />
                <Route path="/teacher" render={() => <h1>教师系统</h1>} />
                <Redirect to="/student" />
              </Switch>
            </ContentWrap>
          </Layout>
        </Layout>
      </HomeWrap>
    )
  }
}
