'use strict'

const { GrcHttpClient } = require('thc-grc-client')
const { grape } = require('./config/common.json')

const main = async () => {
  const client = new GrcHttpClient({ grape })
  client.start()
  const res = await client.request('http:wrk:sample', 'helloWorld', [])
  console.log(res)
}

main().catch(console.error).finally(() => process.exit())
