const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => ({
  entry: {
    index: './index.js',
    instant: './instant.js',
  },
  mode: env.mode || 'development',
  watch: env.watch || false,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
        {
            test: /\.(sa|sc|c)ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader"
            ],
        },
    ]
  }
});