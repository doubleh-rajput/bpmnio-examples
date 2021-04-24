const { merge } = require("webpack-merge");
const webpack = require("webpack");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const common = require("./common");

module.exports = merge(common, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        extractComments: false,
      }),
      new CssMinimizerPlugin()
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.BannerPlugin({
      banner: `
/* 
 * Written by Webpack <doublehrajput@gmail.com>, ${new Date(Date.now()).toLocaleString()}
 */
      `,
    }),

  ],
});
