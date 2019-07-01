import * as Types from './actionTypes'
import http from '@/utils/http'

export const asyncGetGradeList = () => {
  return (dispatch) => {
    http.get('/api/grade').then(res => {
      // 派发动作，修改仓库中
      // console.log(res)
      dispatch({
        type: Types.SET_GRADE_LIST,
        list: res.data.list
      })
    })
  }
}
