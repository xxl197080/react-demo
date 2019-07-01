import * as Types from './actionTypes'
import http from '@/utils/http'

export const onSignIn = (value) => ({
  type: Types.SIGN_IN,
  value
})

// 执行异步操作，发送 ajax 请求判断是否登录成功
export const asyncSignIn = (value, props) => {
  return (dispatch) => {
    http.post('/sign-in',
    JSON.stringify(value),
    {headers: {
      'Content-Type': 'application/json'
    }})
      .then(res => {
        dispatch(onSignIn(res.data))
        window.localStorage.setItem('user',JSON.stringify(res.data))
        // 跳转页面
        let redirect = props.location.state ? props.location.state.redirect : '/'
        props.history.replace(redirect)
      })
  }
}
