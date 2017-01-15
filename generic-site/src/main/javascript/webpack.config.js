var path = require("path");
var webpack = require("webpack");

module.exports = {
  cache: true,
  entry: {
    app: "./app/index.js",
    vendor: ["jquery", "jquery-ui", "react", "bootstrap"]
  },
  output: {
    path: path.resolve(__dirname + "/../resources/static/dist/"),
    filename: "[name].js"
  },
  module: {
    loaders: [

      // required to write "require('./style.css')"
      {test: /\.css$/, loader: "style-loader!css-loader"},

      // required for bootstrap icons
      {test: /\.woff$/, loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff"},
      {test: /\.ttf$/, loader: "file-loader?prefix=font/"},
      {test: /\.eot$/, loader: "file-loader?prefix=font/"},
      {test: /\.svg$/, loader: "file-loader?prefix=font/"},

      {
        test: [/\.js$/, /\.es6$/],
        exclude: 'node_modules',
        loader: 'babel-loader',
        query: {presets: ['react', 'es2015-script'], compact: false}
      },
      {test: /\.png$/, loader: "url-loader", query: {mimetype: "image/png"}}
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js")
  ]
};
