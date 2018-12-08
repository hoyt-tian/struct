import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import Toast from 'antd-mobile/lib/toast'
import 'antd-mobile/lib/toast/style/index.less'
import { rpc } from 'FETCH'

rpc({
  url: 'user.list',
  data: {
    test: 'test'
  },
  method: 'POST',
}).then(() => Toast.info('数据请求成功', 2), () => Toast.fail('请求失败', 2))
// do some page scope things
ReactDOM.render(
  <App />,
  document.getElementById('root')
)