
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  watch: true,
  devServer: {
    host: 'localhost',
    port: '8092',
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