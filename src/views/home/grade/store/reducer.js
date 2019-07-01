import * as Types from './actionTypes'

const initState = {
  gradeList: [] // 班级数据
}

export default (state = initState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  if (action.type === Types.SET_GRADE_LIST) {
    newState.gradeList = action.list
  }
  return newState
}
