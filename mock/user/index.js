export const queryUser = {
  pattern: 'user.list',
  methods: {
    get: {
      "success":    //"success"为true表示业务处理成功
        true,
      "code":
        "200",     //结果码，200：成功/正常;500：失败；
      "data": {

      },
      "message":
        "成功"
    }
  }
}