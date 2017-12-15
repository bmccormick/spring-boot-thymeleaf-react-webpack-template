const gulp = require('gulp');
const concat = require('gulp-concat');
const critical = require('critical');
const gutil = require('gulp-util');
const rimraf = require('rimraf');
const eslint = require('gulp-eslint');
const cleanCSS = require('gulp-clean-css');
const sequence = require('gulp-sequence');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('./webpack.config.js');

gulp.task('default', ['webpack-dev-server']);

gulp.task('clean', ['cleanDist', 'cleanGen']);

gulp.task('cleanGen', (cb) => {
  rimraf('css/*.css', cb);
});

gulp.task('cleanDist', (cb) => {
  rimraf('../resources/static/dist', cb);
});

gulp.task('cleanCritical', (cb) => {
  rimraf('critical/*.css', cb);
});

gulp.task('lint', function () {
  return gulp.src('app/**/*.js')
    .pipe(eslint({ rulePaths: ['eslint-rules'] }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('pre', sequence('css', 'lint'));

gulp.task('css', sequence('clean', ['user-css', 'home-css']));

gulp.task('user-css', function () {
  return gulp.src(['css/common/bootstrap.css',
    'css/common/bootstrap-theme.css',
    'css/common/dataTables.bootstrap.css',
    'css/common/buttons.bootstrap.css',
    'css/user/user.css'])
    .pipe(concat('user.css'))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS({ level: 2 }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('../resources/static/dist/css'));
});

gulp.task('home-css', function () {
  return gulp.src(['css/common/bootstrap.css',
    'css/common/bootstrap-theme.css',
    'css/common/dataTables.bootstrap.css',
    'css/common/buttons.bootstrap.css',
    'css/home/home.css'])
    .pipe(concat('home.css'))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS({ level: 2 }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('../resources/static/dist/css'));
});

gulp.task('critical', sequence(['css', 'cleanCritical'], ['home-critical', 'user-critical']));

gulp.task('home-critical', function () {
  critical.generate({
    inline: false,
    base: 'critical/',
    src: 'homeLayout.html',
    dest: 'homeLayout.css',
    css: ['css/home.css'],
    minify: true,
    width: 800,
    height: 600
  });
});

gulp.task('user-critical', function () {
  critical.generate({
    inline: false,
    base: 'critical/',
    src: 'userLayout.html',
    dest: 'userLayout.css',
    css: ['css/user.css'],
    minify: true,
    width: 800,
    height: 600
  });
});

// Production build
gulp.task('build', ['webpack:build']);

gulp.task('webpack:build', ['pre'], function (callback) {
  // modify some webpack config options
  const myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );
  
  // run webpack
  webpack(myConfig, function (err, stats) {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task("webpack-dev-server", ["pre"], function (callback) {
  const myConfig = Object.create(webpackConfig);
  myConfig.devtool = 'inline-source-map';
  new WebpackDevServer(webpack(myConfig), {
    publicPath: '/dist/',
    stats: {
      colors: true
    }
  }).listen(9090, 'localhost', function (err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'http://localhost:9090/webpack-dev-server/index.html');
  });
});
