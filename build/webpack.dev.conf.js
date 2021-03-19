
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const serverConfig = require('./config')

const HMRSSEPath = encodeURIComponent(`http://${serverConfig.host}:${serverConfig.port}/__webpack_HMR__`)
const HMRClientScript = `webpack-hot-middleware/client?path=${HMRSSEPath}&reload=true`

const devWebpackConfig = merge(baseWebpackConfig, {
  entry: {
    background: [HMRClientScript, baseWebpackConfig.entry.background],
    page: [HMRClientScript, baseWebpackConfig.entry.page]
  },
  mode: 'development',
  watch: true,
  devServer: {
    quiet: true
  },
  output: {
    hotUpdateChunkFilename: '../hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: '../hot/[hash].hot-update.json'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin()
  ]
})

module.exports = devWebpackConfig