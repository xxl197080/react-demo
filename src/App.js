import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
// import Login from './views/login'
// import Regiter from './views/regiter'
// import Home from './views/home'
import Loadable from 'react-loadable'
import { SpinWrap } from './style'
// 引入自己写的高阶函数组件，实现路由拦截
import AuthRoute from './utils/Auth'

const Home = Loadable({
  // 需要懒加载的组件
  loader: () => import('./views/home'),
  // 加载中的提示组件
  loading: () => <SpinWrap />
})
const Regiter = Loadable({
  loader: () => import('./views/regiter'),
  loading: () => <SpinWrap />
})
const Login = Loadable({
  loader: () => import('./views/login'),
  loading: () => <SpinWrap />
})

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="regiter" component={Regiter} />
          <AuthRoute path="/" component={Home} />
          {/* <Redirect to="/home" /> */}
        </Switch>
      </Router>
    )
  }
}
