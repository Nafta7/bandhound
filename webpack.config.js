const HTMLWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const sourceMapType = 'source-map'

module.exports = (env = {}) => {
  // Variables set by npm scripts in package.json
  const isProduction = env.production === true
  const isAnalyzing = env.analyze === true
  const platform = env.platform // 'default' by default

  let plugins = []

  const pluginHTMLWebpack = new HTMLWebpackPlugin({
    template: `${__dirname}/app/index.html`,
    filename: 'index.html',
    favicon: `${__dirname}/app/favicon.ico`,
    inject: 'body'
  })

  const pluginExtractText = new ExtractTextPlugin('site.css', {
    disable: !isProduction
  })

  let pluginBrowserSync = new BrowserSyncPlugin(
    // BrowserSync options
    {
      // browse to http://localhost:3000/ during development
      host: 'localhost',
      port: 3000,
      open: false,
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
  plugins.push(pluginExtractText)

  if (isProduction) {
    plugins.push(
      new UglifyJSPlugin({
        uglifyOptions: {
          ie8: false,

          output: {
            comments: false,
            beautify: false
          },
          warnings: false
        }
      })
    )
  } else {
    plugins.push(pluginBrowserSync)
  }

  if (platform === 'analyze') {
    plugins.push(new BundleAnalyzerPlugin())
  }

  return {
    node: {
      fs: 'empty'
    },
    devtool: !isProduction ? sourceMapType : false,
    entry: {
      bundle: './app/index.js'
    },
    output: {
      path: `${__dirname}/dist`,
      // publicPath: '/dist/',
      filename: 'index_bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['es2015'], 'react']
            }
          }
        },
        {
          test: /\.*(sass|scss)$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: { minimize: isProduction, sourceMap: !isProduction }
              },
              { loader: 'sass-loader', options: { sourceMap: !isProduction } }
            ]
          })
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        }
      ]
    },

    plugins: plugins,
    devServer: {
      port: 8080,
      historyApiFallback: true,
      contentBase: './'
    }
  }
}
