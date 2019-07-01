import styled from 'styled-components'
import { Button } from 'antd';

export const LoginWrap = styled.div`
  width: 370px;
  height: 300px;
  padding: 0 50px;
  display: flex;
  flex-direction: column;
  text-align:center;
  position: absolute;
  top: 50%;
  left: 50%;
  background: rgba(15, 227, 209, 0.81);
  transform: translate(-50%, -50%);
`
export const TitleWrap = styled.div`
  width: 100%;
  height: 20px;
  line-height: 20px;
  margin: 30px 0;
  text-align: center;
  font-weight: 900;
  font-size: 20px;
`
export const MyButton = styled(Button)`
  width: 100%;
  background: #e31436 !important;
  height: 38px !important;
  color: #fff !important;
  font-weight: 900 !important;
  font-size: 16px !important;
`
