import * as Types from './actionTypes'
import http from '@/utils/http'

// 将学生信息列表提交到仓库中
export const onStudentList = (data) => ({
  type: Types.GET_STUDENT_LIST,
  data
})

// 获取学生数据发送请求
export const asyncStudentList = () => {
  return (dispatch) => {
    http.get('/api/student', {
      params: {
        pageSize: 1000
      }
    })
    .then(res => {
      // console.log(res)
      // 继续派发一个动作，将数据保存到仓库中去
      dispatch(onStudentList(res.data))
    })
  }
}
// 删除学生发送请求
export const asyncDelStudent = (id) =>{
  return (dispatch) =>{
    http.delete(`/api/student/${id}`)
      .then(res => {
        alert('删除成功！')
        dispatch({
          type: Types.DEL_STUDENT,
          id
        })
      })
  }
}
// 控制模态框显示与隐藏
export const onChgVisible = () => {
  return {
    type: Types.CHG_VISIBLE
  }
}
// 编辑学生信息，弹出框显示该学生信息
export const onChgStudent = (id) => ({
  type: Types.CHG_STUDENT,
  id
})
// 发送请求修改数据库中该学生的数据
export const asyncUpdateStudent = (values) => {
  return (dispatch, getState) => {
    let { student: { studentId } } = getState()
    // values 里面有班级 id ，修改了之后后台数据的班级id也变了
    http.put(`/api/student/${studentId}`, JSON.stringify(values), {
      headers: {
        'content-Type': 'application/json'
      }
    }).then(res => {
      // 就不需要在派发动作修改仓库了， 班级信息是存在仓库中对象里的，比较麻烦，直接再获取一下数据就好了,更新一下仓库中的 studentList
      dispatch(asyncStudentList())

      // dispatch({
      //   type: Types.UPDATE_STUDENT,
      //   id: studentId,
      //   values
      // })
    })
  }
}
