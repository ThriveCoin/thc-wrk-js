'use strict'

/* eslint-env mocha */

const assert = require('assert')
const createGrapes = require('bfx-svc-test-helper/grapes')
const path = require('path')
const sinon = require('sinon')
const { GrcHttpClient } = require('@thrivecoin/grc-client')
const { resolveConfig } = require('@thrivecoin/wrk-loader')

const WrkSample = require('../src/workers/wrk.sample')

describe('wrk.sample.js tests', () => {
  const grape = 'http://127.0.0.1:30001'
  const svcName = 'http:wrk:sample'
  const client = new GrcHttpClient({ grape })
  const grapes = createGrapes({})

  const wrk = new WrkSample({
    name: svcName,
    port: 7070,
    grape: grape,
    env: 'test',
    conf: require(resolveConfig(path.join(__dirname, '..', 'config'), 'wrk.sample.json', 'test'))
  })

  before(async function () {
    this.timeout(5000)

    await grapes.start()
    await wrk.start()
    client.start()
  })

  after(async function () {
    this.timeout(5000)

    await grapes.stop()
    wrk.stop()
    client.stop()
  })

  describe('helloWorld tests', () => {
    it('should fail with invalid arguments', async () => {
      assert.rejects(async () => {
        await client.request(svcName, 'helloWorld', {})
      }, (err) => {
        assert.strictEqual(err.message, 'ERR_GRC_ARGS_INVALID')
        return true
      })
    })

    it('should work with valid params', async () => {
      const res = await client.request(svcName, 'helloWorld', [])
      assert.strictEqual(res, `hello world from ${wrk._conf.greeter}`)
    })
  })

  describe('ping tests', () => {
    it('should return same message back', async () => {
      const res = await client.request(svcName, 'ping', ['john', 'hello'])
      assert.deepStrictEqual(res, { to: 'john', message: 'hello' })
    })
  })

  describe('getTime tests', () => {
    const dateStub = sinon.stub(Date, 'now')
    before(() => {
      dateStub.callsFake(() => 1636239955823)
    })

    after(() => {
      dateStub.restore()
    })

    it('should return current time', async () => {
      const res = await client.request(svcName, 'getTime', [])
      assert.strictEqual(res, 1636239955823)
    })
  })
})
