Plugins and functions for use with Gulp 4

## @futagoza/gulp/bump

Will bump the `version` field of any file passed to it from Gulp.

> See [@futagoza/gulp-bump](https://www.npmjs.com/package/@futagoza/gulp-bump) for more information.

## @futagoza/gulp/exec

Will run `child_process.spawn()` wrapped in a `Promise` that is only resolved when the spawned process closes. All output by default is sent to the current process via `options.stdio = "inherit"`.

> See [@futagoza/node-run](https://www.npmjs.com/package/@futagoza/node-run) for more information.

## @futagoza/gulp/publish

Will publish the NPM packages passed to it from Gulp.

Why use this instead of NPM or Yarn? Simple, life becomes easier:

* run either Yarn (`option.yarn = true`) or NPM (default)
* perfect for publishing monorepo packages in sync without the use of Lerna
* shorter aliases for some flags and options 
* `--access public` by default

| api option | cli option | npm/yarn option |
| ---------- | ---------- | ---------------- |
| access | --access _scope_ | --access _scope_ |
| dry-run<br>dryRun<br>dry | --dry-run<br>--dryRun<br>--dry | --dry-run |
| newVersion<br>version | --new-version _value_<br>--newVersion _value_<br>-V _value_ | --new-version _value_ |
| otp<br>otpcode | --otp _value_<br>--otpcode _value_ | --otp _value_ |
| public<br>scoped | --public<br>--scoped | --access _public_ |
| registry<br>reg | --registry _url_<br>--reg _url_ | --registry _url_ |
| restricted<br>private | --restricted<br>--private | --access _restricted_ |
| tag | --tag _name_<br>-t _name_ | --tag _name_ |
| yarn | --yarn | |

**NOTE:** To circumvent an issue with running `npm publish` from a `yarn run ...` command, the registry option is set to _https://registry.npmjs.org/_ by default when running `npm publish` only, otherwise it is only included when specified.

-----

[![History](https://img.shields.io/badge/github.com/futagoza/gulp-changelog-yellow.svg)](https://github.com/futagoza/gulp/blob/master/CHANGELOG.md)
[![license](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)
