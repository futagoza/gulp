An extreamlly stripped down and opinionated variant of the [Gulp CLI](https://www.npmjs.com/package/gulp-cli) that features:

### Major Changes

* Only looks for _gulpfile.js_ (case-insensitive)
* Gulp API used can be either [gulp](https://www.npmjs.com/package/gulp) or [@gulpx/api](https://www.npmjs.com/package/@gulpx/api)
* No need to use [pump](https://www.npmjs.com/package/pump) or [@futagoza/pump](https://www.npmjs.com/package/@futagoza/pump), everything is passed to them directly.
* Tasks can return either a stream, a promise or an array containing both as well as normal functions.

### API

* _@gulpx/cli_ exports app via: `const { main, lookup } = require( "@gulpx/cli" );`
* The app is Promise based, no need to `try..catch` it
* You can pass paths to the Gulp API file to use, as well as a custom named `gulpfile.js` (e.g. `.tasks.js`)

### CLI

> __NOTE:__ The _@gulpx/cli_ has no option or flag of its own, and no task listing functionality.

* Use's the `gulp` command, so no need to change your workflow
* __ALL OPTIONS AND FLAGS__ are passed to each task as a second argument (e.g. `task( done, options ){ ... }`)
* If an argument that equals `--` is found, everything after it is an array under the option `--`
* Any option or flag may contain a value using `=` (usually options consume the next argument, and flags are set to _true_)

-----

[![History](https://img.shields.io/badge/github.com/futagoza/gulp-changelog-yellow.svg)](https://github.com/futagoza/gulp/blob/master/CHANGELOG.md)
[![license](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

_@gulpx/cli_ is Copyright (c) 2018+ Futago-za Ryuu
