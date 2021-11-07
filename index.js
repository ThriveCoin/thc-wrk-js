'use strict'

const { wrkLoader } = require('@thrivecoin/wrk-loader')

const main = async () => {
  try {
    const wrk = await wrkLoader(__dirname)
    await wrk.start()
    console.log(`worker started listening on port ${wrk._port}, announced as ${wrk._name}`)

    process.once('SIGINT', async () => {
      await wrk.stop()
      console.log(`${wrk._name} stopped`)
      process.exit()
    })
  } catch (err) {
    console.error(err)
    process.exit(-1)
  }
}

main()
