import handlers from '../../../mock'

class Servlet {
  constructor (pattern, methods) {
    this.pattern = new RegExp(`^${pattern}$`)
    this.methods = {}
    for (let k in methods) {
      this.methods[k.toUpperCase()] = methods[k]
    }
  }

  parseParams (url, config) {
    const reg = /.+\?(.+)/
    const matches = decodeURIComponent(url).match(reg)
    const params = (config && config.headers) || {}
    if (matches && matches.length === 2) {
      const pairs = matches[1].split('&')
      pairs.forEach((kv) => {
        const p = kv.split('=')
        if (p.length === 2) {
          params[p[0]] = p[1]
        }
      })
    }
    return params
  }

  execute (url, config) {
    const method = (config && config.method && config.method.toUpperCase()) || 'GET'

    if (typeof (this.methods[method]) === typeof ({})) {
      return this.methods[method]
    }
    const params = Object.assign(this.parseParams(url, config), config.data || {})
    return this.methods[method](params, url, config)
  }
}

class MockServer {
  constructor () {
    this.servlets = []
  }

  addServlet (servlet) {
    this.servlets.push(servlet)
  }

  req (url, config) {
    const that = this
    return new Promise((resolve, reject) => {
      const matches = that.servlets.filter((servlet) => servlet.pattern.test(url))
      if (matches.length === 1) {
        try {
          if (this.mockDelay) {
            setTimeout(() => {
              resolve(matches[0].execute(url, config))
            }, Math.random() * 500 + 500)
          } else {
            resolve(matches[0].execute(url, config))
          }
        } catch (e) {
          reject(e)
        }
      } else {
        reject(new Error(`${url}匹配到${matches.length}个Mock结果`))
      }
    })
  }
}

const server = new MockServer()

for (let h in handlers) {
  server.addServlet(new Servlet(handlers[h].pattern, handlers[h].methods))
}

export { server }
