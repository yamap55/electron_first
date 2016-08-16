const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const electron = require('electron-connect').server.create();

const srcDir = "src";
const libDir = "build";

// jsファイルのコンパイル。
gulp.task('compile', function(){
  return gulp.src(srcDir + '/**/*.{js,jsx}')
    .pipe($.babel({
      "presets": ["es2015","stage-0","react"]
    }))
    .pipe(gulp.dest(libDir));
});

// コンパイルしてElectron起動
gulp.task('start', ['compile'], function(){
  // electron開始
  electron.start();
  // ファイルが変更されたら再コンパイル
  gulp.watch(srcDir + '/**/*.{js,jsx}', ['compile']);
  // BrowserProcessが読み込むファイルが変更されたらRestart。
  gulp.watch(['main.js'], electron.restart);
  // RendererProcessが読み込むファイルが変更されたらReload。
  gulp.watch(['index.html', libDir + '/**/*.{html,js,css}'], electron.reload);
});
