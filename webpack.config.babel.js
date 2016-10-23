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
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [htmlConfig, extractCSS]
}
