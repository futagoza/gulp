> This package is included with [@futagoza/gulp](https://www.npmjs.com/package/@futagoza/gulp)

Will publish the NPM or Yarn packages passed to it from Gulp.

* `--access public` by default (publishing scoped packages is simpler)
* perfect for publishing monorepo packages in sync without the use of Lerna
* shorter aliases for some flags and options 
* will use NPM by default, but can use Yarn instead (`option.yarn = true` or `--yarn`)
* optionally checks if package version is already on NPM

### example

```js
const gulp = require( "gulp" );
const publish = require( "@futagoza/gulp-publish-package" );
const pump = require( "pump" );

// Publish all the packages in this monorepo
gulp.task( "publish", () => pump(

    gulp.src( [
        "plugins/*",
        "helpers/*",
    ] ),
    publish()

) );
```

### options

The options are the same as [@futagoza/publish-package](https://www.npmjs.com/package/@futagoza/publish-package), with the exception of:

- _only_ - Only publish packages that match the condition. See [gulp-match](https://github.com/robrich/gulp-match)

```ts
function publish( argv?: string[], options: {} ): stream.Transform;
```

The following are CLI options that can be used either in place of them, or to over-ride them:

| api option | cli option | npm/yarn option |
| ---------- | ---------- | ---------------- |
| access | --access _scope_ | --access _scope_ |
| check-version | --check-version | |
| checkVersion | --checkVersion | |
| dry-run | --dry-run | --dry-run |
| dry | --dry | --dry-run |
| dryRun | --dryRun | --dry-run |
| new-version | --new-version _value_ | --new-version _value_ |
| newVersion | --newVersion _value_ | --new-version _value_ |
| only | --only _condition_ | |
| otp | --otp _value_ | --otp _value_ |
| otpcode | --otpcode _value_ | --otp _value_ |
| private | --private | --access _restricted_ |
| public | --public | --access _public_ |
| scoped | --scoped | --access _public_ |
| registry | --registry _url_ | --registry _url_ |
| reg | --reg _url_ | --registry _url_ |
| restricted | --restricted | --access _restricted_ |
| tag | --tag _name_ | --tag _name_ |
| yarn | --yarn | |

**NOTE:** To circumvent an issue with running `npm publish` from a `yarn run ...` command, the registry option is set to _https://registry.npmjs.org/_ by default when running `npm publish` only, otherwise it is only included when specified.

-----

[![History](https://img.shields.io/badge/github.com/futagoza/gulp-changelog-yellow.svg)](https://github.com/futagoza/gulp/blob/master/CHANGELOG.md)
[![license](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

_@futagoza/gulp-publish-package_ is Copyright (c) 2018+ Futago-za Ryuu
