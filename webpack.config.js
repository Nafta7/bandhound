const HTMLWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const sourceMapType = 'source-map'

module.exports = (env = {}, options = {}) => {
  const isProduction = options.mode === 'production'
  const isDev = options.mode === 'development'
  const isAnalysis = env.platform == 'analysis'
  let plugins = []

  const pluginHTMLWebpack = new HTMLWebpackPlugin({
    template: `${__dirname}/app/index.html`,
    filename: 'index.html',
    inject: 'body'
  })

  const pluginMiniCssExtract = new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: isProduction ? '[name].[hash].css' : '[name].css',
    chunkFilename: isProduction ? '[id].[hash].css' : '[id].css'
  })

  let pluginBrowserSync = new BrowserSyncPlugin(
    {
      host: 'localhost',
      port: 3000,
      open: false,
      proxy: 'http://localhost:8080/'
    },
    {
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
  } else plugins.push(pluginBrowserSync)

  if (isAnalysis) plugins.push(new BundleAnalyzerPlugin())

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
      filename: isProduction ? '[name].[hash].js' : '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  'babel-preset-env',
                  {
                    targets: {
                      browsers: ['> 2%']
                    }
                  }
                ],
                'react'
              ]
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
