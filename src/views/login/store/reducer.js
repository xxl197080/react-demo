import * as Types from './actionTypes'

let user = window.localStorage.getItem('user')
const initState = user ? JSON.parse(user) : { email: '' }

export default  (state = initState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  if (action.type === Types.SIGN_IN) {
    newState.email = action.value.email
  }
  return newState
}
