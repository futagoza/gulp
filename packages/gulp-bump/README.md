[![History](https://img.shields.io/badge/github.com/futagoza/gulp-changelog-yellow.svg)](https://github.com/futagoza/gulp/blob/master/CHANGELOG.md)
[![license](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

> This package is included with [@futagoza/gulp](https://www.npmjs.com/package/@futagoza/gulp)

Will bump the `version` field of any file passed to it from Gulp.

```js
const gulp = require( "gulp" );
const bump = require( "@futagoza/gulp-bump" );
const pump = require( "pump" );

// Bump the "version" field of every `package.json` in the packages directory
gulp.task( "bump", () => pump(

    gulp.src( "packages/**/package.json" ),
    bump(),
    gulp.dest( "packages/" )

) );
```

This is just a wrapper around _[gulp-bump](https://www.npmjs.com/package/gulp-bump)_; it takes arguments from the command line interface, passes them through _[minimist](https://www.npmjs.com/package/minimist)_ to get the options that are then passed to _gulp-bump_. You can also programmatically pass default options.

> Optionally you can pass the `argv` yourself as the first argument (an array), or as `options.argv`

As well as the options from _gulp-bump_, you can use the following on the CLI, and it will get translated to the appropriate option used for _gulp-bump_.

| cli option | gulp-bump option |
| ---------- | ---------------- |
| `--new-version value`<br>`-V value` | `version: value` |
| `--major` | `type: "major"` |
| `--minor` | `type: "minor"` |
| `--patch` | `type: "patch"` |
