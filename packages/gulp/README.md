Tasks and helpers for use in `gulpfile.js`

## @futagoza/gulp/bump

Will bump the `version` field of any file passed to it from Gulp.

This is just a wrapper around _[gulp-bump](https://www.npmjs.com/package/gulp-bump)_; it takes arguments from the command line interface, passes them through _[minimist](https://www.npmjs.com/package/minimist)_ to get the options that are then passed to _gulp-bump_. You can also programmatically pass default options.

> Optionally you can pass the `argv` yourself as the first argument (an array), or as `options.argv`

As well as the options from _gulp-bump_, you can use the following on the CLI, and it will get translated to the appropriate option used for _gulp-bump_.

| cli option | gulp-bump option |
| ---------- | ---------------- |
| `--new-version value`<br>`-V value` | `version: value` |
| `--major` | `type: "major"` |
| `--minor` | `type: "minor"` |
| `--patch` | `type: "patch"` |

## @futagoza/gulp/exec

Will run `child_process.spawn()` wrapped in a `Promise` that is only resolved when the spawned process closes. All output by default is sent to the current process via `options.stdio = "inherit"`.

The arguments are the same as `child_process.spawn()`, but if the second argument isn't an array, it will try `options.args` or `options.argv`; failing that, the first argument (the string) will be split (by default " " is used, but that can be changed using `options.ws`), and all but the first element will be used as the `args` argument, setting the first element as the new command.

> Technically, this is not a Gulp plugin, but a normal Node.js function, therefore can be used without Gulp.

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

> NOTE: To circumvent an issue with running `npm publish` from a `yarn run ...` command, the registry option is set to _https://registry.npmjs.org/_ by default when running `npm publish` only, otherwise it is only included when specified.
