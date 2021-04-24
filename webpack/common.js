const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./index.js",
  },
  output: {
    filename: "[name]-build.js",
    path: path.resolve("./build"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [
          { loader: "babel-loader" }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './assets'
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
    }),
  ],
  resolve: {
    extensions: [".js", '.json'],
  },
};
