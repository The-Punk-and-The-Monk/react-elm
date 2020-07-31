/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-24 18:36:52
 * @LastEditTime: 2020-07-31 14:33:29
 * @FilePath: /react-elm/build/webpack.dev.js
 * @Description:
 */

const webpack = require("webpack");
const webpackCommonConf = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const { srcPath, distPath } = require("./paths.jsx");

// 热更新
// const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');

module.exports = merge(webpackCommonConf, {
  mode: "development",
  output: {
    // filename: "[name].[contentHash:8].js", // name 即多入口是entry的key, 加上8字符哈希戳
    // path: distPath,
    publicPath: "/build/dist/", // 修改所有静态文件 url 的前缀
  },
  // 热更新
  // entry: {
  //   // index: path.join(srcPath, 'index.js'),
  //   index: [
  //     'webpack-dev-server/client?http://localhost:8080/',
  //     'webpack/hot/dev-server',
  //     path.join(srcPath, 'index.js')
  //   ],
  //   other: path.join(srcPath, 'other.js')
  // },

  module: {
    rules: [
      // js,jsx文件处理
      {
        test: /\.(js|jsx)$/,
        loader: ["babel-loader?cacheDirectory"],
        include: srcPath,
      },
      // 直接引入图片url
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: "file-loader",
      },
      // css
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"],
      },
      // scss
      {
        test: /\.scss$/,
        loader: [
          "style-loader",
          "css-loader",
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              resources: "src/vars.scss",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      // window.ENV = 'development'
      ENV: JSON.stringify("development"),
    }),

    // 热更新
    // new HotModuleReplacementPlugin()
  ],
  devtool: "source-map",
  devServer: {
    port: 8787,
    progress: true,
    contentBase: distPath,
    open: false,
    compress: true,
    // hot: true, 热更新
    // 设置代理
    proxy: {
      "/api": {
        target: "http://localhost:8786",
        pathRewrite: {
          "^/api": "",
        },
      },
      "/imgapi": {
        target: "https://fuss10.elemecdn.com",
        pathRewrite: {
          "^/imgapi": "",
        },
        secure: false,
        changeOrigin: true,
      },
      "/img": {
        target: "http://elm.cangdu.org",
        secure: false,
        changeOrigin: true,
      },
      "/proxyapi": {
        target: "https://elm.cangdu.org",
        pathRewrite: {
          "^/proxyapi": "",
        },
        secure: false,
        changeOrigin: true,
      },
    },
    historyApiFallback: {
      index: "/build/dist/index.html",
    },
  },
});
