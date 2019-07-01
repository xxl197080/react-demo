import styled from 'styled-components'
import { Layout } from 'antd'
const { Header, Sider, Content } = Layout;

export const HomeWrap = styled.div`
  display: flex;
  height: 100%;
`
export const HeaderWrap = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1dbfc7 !important;
  padding-left: 15px !important;
  font-size: 26px;
`

export const SiderWrap = styled(Sider)`

`

export const ContentWrap = styled(Content)`
  margin: 20px 14px;
  padding: 24;
  background: #fff;
  min-height: 280;
`
export const Logo = styled.div`
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
`
