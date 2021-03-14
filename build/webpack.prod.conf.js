
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')
const root = path.resolve(__dirname, '../')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: [path.resolve(root, './chrome/hot')]
    })
  ]
})