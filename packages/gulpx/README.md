A custom variant of the [Gulp client](https://www.npmjs.com/package/gulp) (to use from within a _gulpfile.js_) as well as a custom variant of the [Gulp CLI](https://www.npmjs.com/package/gulp-cli).

## client

* No need to use [pump](https://www.npmjs.com/package/pump), [stream.pipeline](https://nodejs.org/dist/latest-v10.x/docs/api/stream.html#stream_stream_pipeline_streams_callback) or [@futagoza/pump](https://www.npmjs.com/package/@futagoza/pump) when using `gulp.task`, just return an array
* No need to use `gulp.src` with `{ read: false }`; with `gulp.path`, the `read` option is always `false`
* Exports both _pipeline_ and _pump_ from [@futagoza/pump](https://www.npmjs.com/package/@futagoza/pump), so no need to include in your _package.json_

```js
const gulp = require( "@futagoza/gulpx" );

// Buisness as usual...
gulp.dest
gulp.lastRun
gulp.Gulp
gulp.series
gulp.parallel
gulp.registry
gulp.src
gulp.symlink
gulp.tree

// Modified
gulp.task

// Added
gulp.path
gulp.pipeline
gulp.pump

// Removed
gulp.watch
```

> For a better understanding of the API, please take a look at the [TypeScript definition file](https://github.com/futagoza/gulp/blob/master/packages/gulpx/client/index.d.ts).

## cli

The CLI for `@futagoza/gulpx` use's the `gulp` command, so no need to change your workflow.

* Exported by default from `@futagoza/gulpx/bin/index.js` (API usage is in the JavaScript example below)
* Will treat all command line arguments as task names untill the first argument that starts with `-`
* By default looks for the [Gulp client](https://www.npmjs.com/package/gulp) before looking for the _@futagoza/gulpx_ client
* Always runs the requested tasks in _series_
* Displays the number of requested tasks completed at the end

```js
const { main, lookup } = require( "@futagoza/gulpx/bin" );

// Your custom settings to pass to the `@futagoza/gulpx` CLI (all optional)
const settings = {

    // A resolved path to a javascript (or json) file exporting default settings
    config,

    // A resolved path to a client (defaults to 'gulp' or '@futagoza/gulpx')
    clientfile,

    // The name of the resolved client (defaults to 'gulp' or '@futagoza/gulpx')
    clientname,

    // The current working directory
    cwd,

    // A resolved path to a javascript file that provides the Gulp tasks (defaults to 'gulpfile.js')
    provider,

    // A list of tasks to run (defaults to 'default')
    requests,

};

// Returns the nearest `filename` to the given `cwd`
lookup.file( cwd, filename )

// Will attempt to resolve one of the given `modules` from `cwd`
lookup.dependency( cwd, modules )

// Will execute Gulp tasks in a Promise, so no need to `try..catch` it
main( settings );
```

> __WARNING:__ The _@futagoza/gulpx_ CLI has no option or flag of its own, and no task listing functionality.

-----

[![History](https://img.shields.io/badge/github.com/futagoza/gulp-changelog-yellow.svg)](https://github.com/futagoza/gulp/blob/master/CHANGELOG.md)
[![license](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

_@futagoza/gulpx_ is Copyright (c) 2018+ Futago-za Ryuu
