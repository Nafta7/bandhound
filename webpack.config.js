const HTMLWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const sourceMapType = 'source-map'

module.exports = (env = {}, options = {}) => {
  // Variables set by npm scripts in package.json
  const isProduction = options.mode === 'production'
  const isDev = options.mode === 'development'
  const isAnalysis = env.platform == 'analysis'

  let plugins = []

  const pluginHTMLWebpack = new HTMLWebpackPlugin({
    template: `${__dirname}/app/index.html`,
    filename: 'index.html',
    favicon: `${__dirname}/app/favicon.ico`,
    inject: 'body'
  })

  const pluginMiniCssExtract = new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: isProduction ? '[name].[hash].css' : '[name].css',
    chunkFilename: isProduction ? '[id].[hash].css' : '[id].css'
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
  plugins.push(pluginMiniCssExtract)

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

  if (isAnalysis) {
    plugins.push(new BundleAnalyzerPlugin())
  }

  return {
    node: {
      fs: 'empty'
    },
    devtool: isDev ? sourceMapType : false,
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
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: isDev }
            }
          ]
        },
        {
          test: /\.*(sass|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { minimize: isProduction, sourceMap: isDev }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: isDev }
            }
          ]
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
