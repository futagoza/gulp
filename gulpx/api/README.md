A custom variant of the [Gulp API](https://www.npmjs.com/package/gulp) to use from within a _gulpfile.js_ that is loaded by [@gulpx/cli](https://www.npmjs.com/package/@gulpx/cli), which is itself a custom variant of the [Gulp CLI](https://www.npmjs.com/package/gulp-cli).

```js
const gulp = require( "@gulpx/api" );

// Buisness as usual...
gulp.dest
gulp.lastRun
gulp.Gulp
gulp.series
gulp.parallel
gulp.registry
gulp.src
gulp.symlink
gulp.task
gulp.tree

// Added
gulp.path

// Removed
gulp.watch
```

-----

[![History](https://img.shields.io/badge/github.com/futagoza/gulp-changelog-yellow.svg)](https://github.com/futagoza/gulp/blob/master/CHANGELOG.md)
[![license](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

_@gulpx/api_ is Copyright (c) 2018+ Futago-za Ryuu
