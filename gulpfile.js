var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('compile', function(){
  return gulp.src('src/**/*.{js,jsx}')
    .pipe($.babel({
      "presets": ["es2015","stage-0","react"]
    }))
    .pipe(gulp.dest('build'));
});
