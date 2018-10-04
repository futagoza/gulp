> This package is included with [@futagoza/gulp](https://www.npmjs.com/package/@futagoza/gulp)

Will bump the `version` field of any file passed to it from Gulp.

### example

```js
const gulp = require( "gulp" );
const bump = require( "@futagoza/gulp-bump" );
const pump = require( "pump" );

// Bump the "version" field of every `package.json` in the packages directory
gulp.task( "bump", () => pump(

    gulp.src( "packages/**/package.json" ),
    bump( /* [ argv = process.argv, options = {} ] */ ),
    gulp.dest( "packages/" )

) );
```

### cli usage

This module was created to _always_ read the CLI arguments passed to the current Gulp task. It takes the arguments from the command line interface, processes them before finally passing them to _[gulp-regex][2]_. You can also programmatically pass default options.

> Optionally you can pass the `argv` yourself as the first argument (an array), or as `options.argv`

### options

As well as the options from [gulp-regex][2], you can use the following:

| api option | cli option | description |
| ---------- | ---------- | ---------------- |
| argv  | | Used if no `argv` argument was provided; otherwise defaults to `process.argv` |
| ignore<sub>1</sub> | --ignore | Inverts the job of _only_, bumping every file but those that match the pattern |
| major | --major | Sets the option `type` for [gulp-regex][2] to `"major"`<sub>2</sub> |
| minor | --minor | Sets the option `type` for [gulp-regex][2] to `"minor"`<sub>2</sub> |
| new-version | --new-version _value_<br>-V _value_ | Gulp prints it's own version with `--version`, so this happened... |
| only<sub>1</sub> | --only _pattern_ | Only bump files with the property _name_ that match _pattern_ (a RegExp string) |
| patch | --patch | Sets the option `type` for [gulp-regex][2] to `"patch"`<sub>2</sub> |
| quiet | --quit | Flag to silence the summary. |
| summary<sub>3</sub> | | A callback that by default prints the summary to the console. |
| tag | --tag, --keepmetadata | Flag that enables the `keepmetadata` option for [gulp-regex][2]. |

1. This has only implemented for and tested on JSON files
2. Only used if there's no `type` or `version` options
3. Has a call signature of `(filename: string, results: {}) => void`

### license

[![History](https://img.shields.io/badge/github.com/futagoza/gulp-changelog-yellow.svg)](https://github.com/futagoza/gulp/blob/master/CHANGELOG.md)
[![license](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

This module was originally a wrapper around _[gulp-bump][1]_ until v0.4; at which point because I needed a way to change the summary, I copy-pasted the code and it's dependencies, as well as updating the code for Node 6+ and adding what I needed; so now it's a direct wrapper around [gulp-regex][2] instead.

_@futagoza/gulp-bump_ is Copyright (c) 2018+ Futago-za Ryuu<br>
[gulp-bump][1] and [gulp-regex][2] are Copyright (c) 2015+ [Steve Lacy](slacy.me)

[1]: https://www.npmjs.com/package/gulp-bump
[2]: https://www.npmjs.com/package/gulp-regex
