const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const WebpackBar = require('webpackbar')

const root = path.resolve(__dirname, '../')

module.exports = {
  entry: {
    page: path.resolve(root, './src/main.js') ,
    background: path.resolve(root, './service/main.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(root, './chrome/js')
  },
  devtool: 'none',
  resolve: {
    extensions: ['.js', '.vue', '.json', '.md']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '../assets/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.snippets/,
        loader: 'raw-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new WebpackBar({
      name: 'chrome extension',
      color: '#0f9d58',
    })
  ],
  performance: {
    hints: 'warning',
    maxEntrypointSize: 50000000,
    maxAssetSize: 30000000
  }
}
