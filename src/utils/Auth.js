// 写一个高阶函数是想路由的拦截的重定向

import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

class AuthRoute extends React.Component {
  render () {
  let { component: Component, user, ...rest } = this.props
    return (
      <Route
        {...rest}
        render = {
          (routeProps) => {
            // 判断仓库中的user存不存在
            if (user.email) {
              return <Component {...routeProps} />
            } else {
              // user 不存在，使用 Redirect 组件拦截到登录页面
              // Redirect 组件的to属性使用对象的方式传递过去，并且设置state，知道是从哪来的
              return (
                <Redirect
                 to={{
                  pathname: "/login",
                  state: { redirect: routeProps.match.url }
                 }}
                />
              )
            }
          }
        }
      />
    )
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(AuthRoute)
