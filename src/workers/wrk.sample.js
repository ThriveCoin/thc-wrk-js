'use strict'

const { GrcHttpWrk } = require('thc-grc-server')

class WrkSample extends GrcHttpWrk {
  helloWorld () {
    return 'hello world from ' + this._conf.greeter
  }

  ping (from, message) {
    return { to: from, message }
  }

  getTime () {
    return Date.now()
  }
}

module.exports = WrkSample
