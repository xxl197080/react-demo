// 引入外部文件拆分出去的 reducer
import userReducer from '../views/login/store/reducer'
import studentReducer from '../views/home/student/store/reducer'
import gradeReducer from '../views/home/grade/store/reducer'

export const user = userReducer;
export const student = studentReducer;
export const grade = gradeReducer;


