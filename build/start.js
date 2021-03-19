const webpack = require('webpack')
const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const cors = require('cors')
const devWebpackConfig = require('./webpack.dev.conf')
const serverConfig = require('./config')

async function start () {
  const compiler = webpack(devWebpackConfig)
  const devServer = express()

  devServer.use(cors())
  devServer.use(webpackDevMiddleware(compiler, { writeToDisk: true }))
  devServer.use(webpackHotMiddleware(compiler, { path: '/__webpack_HMR__' }))
  // devServer.use(serverConfig.hotReloadPath, createSSEStream(compiler))

  // eslint-disable-next-line no-unused-vars
  const httpServer = devServer.listen(serverConfig.port, serverConfig.host, () => {
    console.log('dev Server')
  })
}

start()
