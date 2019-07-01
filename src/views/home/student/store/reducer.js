import * as Types from "./actionTypes"

const initStudentState = {
  studentList: [], // 学生的列表数据
  pageTotal: 1 , //  总页码数
  visible: false, // 显示修改信息的弹窗
  studentId: '', // 当前操作学生的 id
}

export default (state = initStudentState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  if (action.type === Types.GET_STUDENT_LIST) {
    newState.studentList = action.data.list
    newState.pageTotal = action.data.pageTotal
  }
  if (action.type === Types.DEL_STUDENT) {
    let index = newState.studentList.findIndex(item => item._id === action.id)
    newState.studentList.splice(index, 1)
  }
  if (action.type === Types.CHG_VISIBLE) {
    newState.visible= !newState.visible
  }
  if (action.type === Types.CHG_STUDENT) {
    newState.studentId = action.id
  }
  if (action.type === Types.UPDATE_STUDENT) {
    let index = newState.studentList.findIndex(item => item._id === action.id)
    newState.studentList[index] = {...newState.studentList[index], ...action.values}
  }
  return newState
}
