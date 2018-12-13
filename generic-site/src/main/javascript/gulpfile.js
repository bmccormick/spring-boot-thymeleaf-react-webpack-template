const gulp = require('gulp');
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const rimraf = require('rimraf');
const eslint = require('gulp-eslint');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('./webpack.config.js');

gulp.task('sass', function () {
  return gulp.src(['./sass/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/common'));
});

gulp.task('cleanGen', (cb) => {
  rimraf('css/*.css', cb);
});

gulp.task('cleanDist', (cb) => {
  rimraf('../resources/static/dist', cb);
});

gulp.task('clean', gulp.series('cleanDist', 'cleanGen'));

gulp.task('lint', function () {
  return gulp.src('app/**/*.js')
    .pipe(eslint({ rulePaths: ['eslint-rules'] }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});


gulp.task('user-css', function () {
  return gulp.src(['css/common/custom.css',
    'node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css',
    'node_modules/datatables.net-buttons-bs4/css/buttons.bootstrap4.css',
    'css/user/user.css'])
    .pipe(concat('user.css'))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS({ level: 2 }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('../resources/static/dist/css'));
});

gulp.task('home-css', function () {
  return gulp.src(['css/common/custom.css',
    'node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css',
    'node_modules/datatables.net-buttons-bs4/css/buttons.bootstrap4.css',
    'css/home/home.css'])
    .pipe(concat('home.css'))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS({ level: 2 }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('../resources/static/dist/css'));
});

gulp.task('css', gulp.series('clean', 'sass', 'user-css', 'home-css'));

gulp.task('pre', gulp.series('css', 'lint'));

gulp.task('webpack:build', gulp.series('pre', function (callback) {
  webpackConfig.mode = 'production';
  webpackConfig.performance = { hints: false };
  webpack(webpackConfig, function (err, stats) {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));
    callback();
  });
}));

// Production build
gulp.task('build', gulp.series('webpack:build'));

gulp.task('webpack-dev-server', gulp.series('pre', function () {
  
  webpackConfig.mode = 'development';
  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: '/dist/',
    stats: {
      colors: true
    }
  }).listen(9090, "localhost", function (err) {
    if (err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:9090/webpack-dev-server/index.html");
  });
  
}));

gulp.task('default', gulp.series('webpack-dev-server'));