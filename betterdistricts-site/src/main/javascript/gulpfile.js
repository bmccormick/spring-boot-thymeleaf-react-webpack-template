var gulp = require("gulp");
var gutil = require("gulp-util");
var rimraf = require('rimraf');
var eslint = require('gulp-eslint');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");


var webpackConfig = require("./webpack.config.js");

// The development server (the recommended option for development)
gulp.task("default", ["webpack-dev-server"]);

gulp.task('clean', function (cb) {
  rimraf('../resources/static/dist', cb);
});

gulp.task('lint', function () {
  return gulp.src('app/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('pre', ['clean']);

gulp.task('css', ['pre'], function () {
  return gulp.src('../css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('../resources/static/dist/css'));
});

// Production build
gulp.task("build", ["webpack:build"]);

gulp.task("webpack:build", ["pre"], function (callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );

  // run webpack
  webpack(myConfig, function (err, stats) {
    if (err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
});

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function (callback) {
  // run webpack
  devCompiler.run(function (err, stats) {
    if (err) throw new gutil.PluginError("webpack:build-dev", err);
    gutil.log("[webpack:build-dev]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task("webpack-dev-server", ["pre"], function (callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.devtool = "inline-source-map";
  myConfig.debug = true;
  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    publicPath: "/dist/",
    stats: {
      colors: true
    }
  }).listen(9090, "localhost", function (err) {
    if (err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:9090/webpack-dev-server/index.html");
  });
});
