const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => ({
  entry: glob.sync('./entries/**.js').reduce(function(obj, entry){
     obj[path.parse(entry).name] = entry;
     return obj
  },{}),
  mode: env.mode || 'development',
  watch: env.watch || false,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
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