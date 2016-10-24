const webpack = require('webpack')
const isDev = process.argv.indexOf('-p') === -1
const path = require('path')

const HtmlWpp = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('site.css', {disable: isDev})
const sassLoader = [
  'css'+(isDev? '?sourceMap=true': ''),
  'sass'+(isDev? `?outputStyle=expanded&sourceMap=true&sourceMapContents=true`: '')
]

if(isDev)
  sassLoader.unshift('style')

const htmlConfig = new HtmlWpp({
  template: `${__dirname}/app/index.html`,
  filename: 'index.html',
  favicon: `${__dirname}/app/favicon.ico`,
  inject: 'body'
})

module.exports = {
  devtool: 'source-map',
  entry: [
    './app/index.js'
  ],
  output: {
    path: `${__dirname}/dist`,
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {
        test:  /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: [/\.scss$/, /\.sass$/],
        loader: extractCSS.extract(sassLoader)
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },
  plugins: [new webpack.DefinePlugin({
    'process.env': {
      // This has effect on the react lib size
      'NODE_ENV': JSON.stringify('production'),
    }
  }), new webpack.optimize.OccurenceOrderPlugin(), htmlConfig, extractCSS, isDev? [] : new webpack.optimize.UglifyJsPlugin({
    minimize: true
    })]
}
