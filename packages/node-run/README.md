Will run `child_process.spawn()` wrapped in a `Promise` that is only resolved when the spawned process closes. All output by default is sent to the current process via `options.stdio = "inherit"`.

This package was created to help develope wrapper tasks in Gulp (`gulpfile.js` to be precise) that execute an external process.

The arguments are the same as `child_process.spawn()`, but if the second argument isn't an array, it will try `options.args` or `options.argv`; failing that, the first argument (the string) will be split (by default " " is used, but that can be changed using `options.ws`), and all but the first element will be used as the `args` argument, setting the first element as the new command.

```js
const run = require( "@futagoza/node-run" );

run( "npm", [ "publish", "--access", "public" ] );

run( "npm", { args: [ "publish", "--access", "public" ] } );

run( "npm publish --access public" );
```

In addition to the options passable to `child_process.spawn()`, the following are supported:

|   option   | child_process.spawn option |
| ---------- | -------------------------- |
| pipe | options.stdio = "pipe" |
| inherit | options.stdio = "inherit" |
| input | _passed to stdin_ |

-----

[![History](https://img.shields.io/badge/github.com/futagoza/gulp-changelog-yellow.svg)](https://github.com/futagoza/gulp/blob/master/CHANGELOG.md)
[![license](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)
