const path = require("path");
const webpack = require("webpack");

module.exports = {
  resolve: {
    modules: [
      path.resolve(__dirname),
      "node_modules"
    ]
  },
  cache: true,
  entry: {
    app: "./app/index.js",
    user_app: "./app/user_index.js"
  },
  output: {
    path: path.resolve(__dirname + "/../resources/static/dist/"),
    filename: "[name].js"
  },
  module: {
    rules: [
      
      // required to write "require('./style.css')"
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      
      // required for bootstrap icons
      { test: /\.woff$/, use: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
      { test: /\.ttf$/, use: "file-loader?prefix=font/" },
      { test: /\.eot$/, use: "file-loader?prefix=font/" },
      { test: /\.svg$/, use: "file-loader?prefix=font/" },
      
      {
        test: [/\.js$/],
        exclude: path.resolve(__dirname + "/node_modules/"),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env', 'react']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      boostrap: 'bootstrap'
    })
  ]
};
