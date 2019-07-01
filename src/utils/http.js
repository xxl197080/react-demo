import axios from 'axios';
import { message } from 'antd';

const http = axios.create();

http.defaults.baseURL = 'http://localhost:9090'

http.interceptors.response.use(response => {
  let res = response.data;
  if (res.code === 0) {
    // 成功
    return res;
  } else {
    message.error(res.msg)
    // 执行 Promise 的reject方法，说明走到 catch里面，前面使用就不会再进入 .then
    return Promise.reject();
  }
})

export default http
