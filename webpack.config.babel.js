const webpack = require('webpack')
const isDev = process.argv.indexOf('-p') === -1
const isDebug = false
// const isDev = process.env.NODE_ENV !== 'production'
const path = require('path')

const HTMLWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const pluginExtractCSS = new ExtractTextPlugin('site.css', {disable: isDev})
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const sassLoader = [
  'css'+(isDev? '?sourceMap=true': ''),
  'sass'+(isDev? `?outputStyle=expanded&sourceMap=true&sourceMapContents=true`: '')
]

if(isDev)
  sassLoader.unshift('style')

let plugins = []

const pluginHTMLWebpack = new HTMLWebpackPlugin({
  template: `${__dirname}/app/index.html`,
  filename: 'index.html',
  favicon: `${__dirname}/app/favicon.ico`,
  inject: 'body'
})

let pluginProduction = new webpack.DefinePlugin({
  'process.env': {
    // This has effect on the react lib size
    'NODE_ENV': JSON.stringify('production'),
  }
})

let pluginOccurenceOrder = new webpack.optimize.OccurenceOrderPlugin()

let pluginUglify = new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
})

let pluginBrowserSync = new BrowserSyncPlugin(
      // BrowserSync options
      {
        // browse to http://localhost:3000/ during development
        host: 'localhost',
        port: 3000,
        // proxy the Webpack Dev Server endpoint
        // (which should be serving on http://localhost:3100/)
        // through BrowserSync
        proxy: 'http://localhost:8080/'
      },
      // plugin options
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
      }
    )
plugins.push(pluginHTMLWebpack)
plugins.push(pluginExtractCSS)
plugins.push(pluginBrowserSync)

if (!isDev) {
  plugins.push(pluginProduction)
  plugins.push(pluginOccurenceOrder)
  plugins.push(pluginUglify)
}

if (isDebug) {
 plugins.push(new BundleAnalyzerPlugin())
}

module.exports = {
  devtool: isDev? 'source-map' : '',
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
        loader: pluginExtractCSS.extract(sassLoader)
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: plugins
}
