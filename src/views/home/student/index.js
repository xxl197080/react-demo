import React from 'react'
import { Table, Button, Modal, Form, Input, Radio, Select } from 'antd'
import { connect } from 'react-redux'
import * as actions from './store/actionCreates'
import * as gradeActions from '../grade/store/actionCreates'

class Student extends React.Component {
  columns = [
    {
      title: '学号',
      dataIndex: '_id'
    },
    {
      title: '姓名',
      dataIndex: 'studentName'
    },
    {
      title: '性别',
      dataIndex: 'gender',
      render(text, row, index) {
        return <div>{text ? '男' : '女'}</div>
      }
    },
    {
      title: '班级',
      dataIndex: 'gradeId.gradeName'
    },
    {
      title: '操作',
      // 需要使用箭头函数的方式，否则这里面拿不到porps，因为this指向不对
      render:(text, row, index) => {
        return (
          <div>
            <Button type="primary" onClick={this.props.handleOpenModal.bind(null, row._id)}>编辑</Button>
            <Button type="danger"  onClick={this.showDelModal.bind(null, row._id)}>删除</Button>
          </div>
        )
      }
    }
  ]

  // 点击删除显示删除提示框
  showDelModal = (id) => {
    Modal.confirm({
      title: '删除警告',
      content: '确认要删除该学生吗？',
      onOk: () => {
        this.props.handleDelStudent(id)
      }
    })
  }

  // 模态框的显示与隐藏，并且显示相应的学生信息，如果写在 render 里面， 这个组件的 defaultValue， 所以要控制它关闭之后销毁掉，显示的时候又重新创建出来这个组件就渲染新的数据。
  showModal = () => {
    let studentInfo = this.props.list.find(item => (item._id === this.props.studentId))|| {}
    // console.log(studentInfo.studentName)
    let UpdateModal = (props) => {
      let { getFieldDecorator } = props.form
      return (
        <Modal
          title="修改信息"
          destroyOnClose
          visible={this.props.visible}
          onOk={this.props.handleModalOk.bind(null, props.form)}
          onCancel={this.props.handleModalCancal}
        >
          <Form labelCol={{span: 6}} wrapperCol={{span: 8}}>
            <Form.Item label="学生姓名">
              {
                getFieldDecorator('studentName',{
                  rules: [
                    {required: true, message: '学生姓名不能为空'}
                  ],
                  initialValue: studentInfo.studentName
                })( <Input /> )
              }
            </Form.Item>
            <Form.Item label="学生班级">
              {
                getFieldDecorator('gradeId', {
                  initialValue: studentInfo.gradeId && studentInfo.gradeId._id
                })(
                  <Select>
                    {
                      this.props.gradeList.map(item => {
                        return (
                          <Select.Option key={item._id} value={item._id}>
                            {item.gradeName}
                          </Select.Option>
                        )
                      })
                    }
                  </Select>
                )
              }
            </Form.Item>
            <Form.Item label="学生性别">
                {
                  getFieldDecorator('gender', {
                    initialValue: studentInfo.gender
                  })(
                    <Radio.Group>
                      <Radio value={1}> 男 </Radio>
                      <Radio value={0}> 女 </Radio>
                    </Radio.Group>
                  )
                }
            </Form.Item>
          </Form>
        </Modal>
      )
    }
    UpdateModal = Form.create({})(UpdateModal)
    return <UpdateModal />
  }
  render () {
    return (
      <div>
        <Table
        rowKey="_id"
        dataSource={this.props.list}
        columns={this.columns}
        />
        {this.showModal()}
      </div>
    )
  }
  componentDidMount () {
    this.props.handleGetStudentList()
    this.props.handleGetGradeList()
  }
}

export default connect(
  (state) => ({
    list: state.student.studentList,
    visible: state.student.visible,
    studentId: state.student.studentId,
    gradeList: state.grade.gradeList
  }),
  (dispatch) => ({
    // 获取学生信息列表
    handleGetStudentList () {
      dispatch(actions.asyncStudentList())
    },
    // 删除学生
    handleDelStudent (id) {
      dispatch(actions.asyncDelStudent(id))
    },
    // 点击编辑弹出修改信息模态框
    handleOpenModal (id) {
      // 需要把 id 传进来获取对应的信息，相应 id 的学生信息
      // console.log(id)
      dispatch(actions.onChgStudent(id))
      // 将弹窗打开
      dispatch(actions.onChgVisible())
    },
    // 点击 确定 关闭模态框
    handleModalOk (form) {
      // 需要使用 form 组件 create 创建出来，之后可以通过验证表单，表单验证成功就会走到 validateFields 里面去，再在点击确定之后出发 onOk 把 props.form 传递过来， 这个values就是点击确定获取到所有的input框中的值
      form.validateFields((err, values) => {
        if(!err) {
          dispatch(actions.asyncUpdateStudent(values))
          dispatch(actions.onChgVisible())
        }
      })
    },
    // 点击 取消和 x 关闭模态框
    handleModalCancal () {
      dispatch(actions.onChgVisible())
    },
    // 获取班级列表数据
    handleGetGradeList () {
      dispatch(gradeActions.asyncGetGradeList())
    }
}))(Student)




