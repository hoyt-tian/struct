import { server } from './server'
import { rpcSuccess, rpcFail } from '../rpc'

export const rpc = ({
  url,
  method='GET',
  data={}
}) => {
  return server.req(url, { data, method }).then((res) => {
    return rpcSuccess(res).then(res => res, rpcFail)
  })
}