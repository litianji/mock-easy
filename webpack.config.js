const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
  entry: {
    page: './src/main.js',
    background: './service/main.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './chrome/js')
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
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.css$/,
        use: process.env.NODE_ENV === 'production'
          ? ExtractTextPlugin.extract({
            use: 'css-loader?minimize&importLoaders=1!postcss-loader',
            fallback: 'vue-style-loader'
          })
          : [
            'vue-style-loader',
            { loader: 'css-loader', options: { importLoaders: 1 } },
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
    new VueLoaderPlugin()
  ]
}
