import { rpc } from '../../../src/service/mock'

test('RPC Mock', done => {
  return rpc({
    url: 'user.list'
  }).then(res => {
    expect(res).toMatchObject({})
    done()
  }, res => {
    done.fail(res)
  })
})
