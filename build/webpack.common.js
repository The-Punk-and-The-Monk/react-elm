/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-24 18:36:42
 * @LastEditTime: 2020-07-27 11:47:50
 * @FilePath: /react-elm/build/webpack.common.js
 * @Description:
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
  srcPath
} = require("./paths.jsx");

module.exports = {
  entry: {
    index: path.join(srcPath, "App.jsx"),
    // other: path.join(srcPath, 'Other.jsx')
  },
  module: {
    rules: [],
  },
  resolve: {
    extensions: [".jsx", ".js"], // 找不到时,自动添加扩展名,会自动找目录下的index.jsx
    alias: {
      src: path.resolve(__dirname, "../src"), // 配置alia
      services: path.resolve(__dirname, "../src/services"),
      utils: path.resolve(__dirname, "../src/utils"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, "index.html"),
      filename: "index.html",
      favicon: "./favicon.ico",
      chunks: ["index", "vendor", "common"],
    }),
    // new HtmlWebpackPlugin({
    //   template: path.join(srcPath, 'other.html'),
    //   filename: 'other.html',
    //   chunks: ['other',  'common']
    // })
  ],
};