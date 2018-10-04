> See the  [commit history](https://github.com/futagoza/gulp/commits/master) for a full list of changes.

## goals

* Add `--only` and `--ignore` to `@futagoza/sync-yarn-workspaces`
* Add a JSON reading, formatting and writing package
* Update `@futagoza/gulp-bump` to operate on `package.json` files only

## next

* Added `@futagoza/create-stream`, a non-gulp package
* Added `@futagoza/pump`, an optional gulp package
* Added `@futagoza/child-process`, a non-gulp package
* Set `@futagoza/gulp` to use `@futagoza/child-process`
* Set `@futagoza/node-run` to use `@futagoza/child-process`
* Set `@futagoza/publish-package` to use `@futagoza/child-process`
* Added `@futagoza/gulpx`, a custom variant of the Gulp client and the Gulp CLI
* Added `@futagoza/sync-yarn-workspaces`, a non-gulp package
* Added the `checkVersion` option to `@futagoza/publish-package`
* Updated `@futagoza/gulp-publish-package` to use the new `checkVersion` option
* Updated the behavior of the `--only` option for `@futagoza/gulp-*`
* Added the `--ignore` flag to `@futagoza/gulp-*`
* Updated documentation for some `@futagoza/*` packages 

## [v0.5.1](https://github.com/futagoza/gulp/compare/v0.5.0...v0.5.1) _(2018-09-26)_

* Fix: upgrade `@futagoza/*` dependencies from `0.4.x` to `0.5.x`

## [v0.5.0](https://github.com/futagoza/gulp/compare/v0.4.1...v0.5.0) _(2018-09-26)_

* Clarify documentation
* Added `@futagoza/cli-utils`, a non-gulp package
* Updated `@futagoza/gulp-bump` to use `@futagoza/cli-utils`
* Updated `@futagoza/gulp-publish-package` to use `@futagoza/cli-utils`
* `@futagoza/gulp` now exports `@futagoza/cli-utils`
* Added conditional support via the `--only` option

## [v0.4.1](https://github.com/futagoza/gulp/compare/v0.4.0...v0.4.1) _(2018-09-23)_

* Fix: upgrade `@futagoza/*` dependencies from `0.3.x` to `0.4.x`

## [v0.4.0](https://github.com/futagoza/gulp/compare/v0.3.3...v0.4.0) _(2018-09-22)_

* Imported the code and dependencies from `gulp-bump` into `@futagoza/gulp-bump`
* Overhaul the documentation for `@futagoza/gulp-bump`
* Fix repository field for `@futagoza/gulp-publish-package`
* Added `@futagoza/publish-package`, a non-gulp package
* Set `@futagoza/gulp-publish-package` to use `@futagoza/publish-package`

## [v0.3.3](https://github.com/futagoza/gulp/compare/v0.3.2...v0.3.3) _(2018-09-21)_

* Added `@futagoza/gulp-publish-package`
* Set `@futagoza/gulp/publish` to export `@futagoza/gulp-publish-package`

## [v0.3.2](https://github.com/futagoza/gulp/compare/v0.3.1...v0.3.2) _(2018-09-20)_

* Added `@futagoza/node-run`, a non-gulp package
* Set `@futagoza/gulp/exec` to export `@futagoza/node-run`
* Updated documentation for `@futagoza/gulp*` packages 

## [v0.3.1](https://github.com/futagoza/gulp/compare/v0.3.0...v0.3.1) _(2018-09-20)_

* Added `@futagoza/gulp-bump`
* Set `@futagoza/gulp/bump` to export `@futagoza/gulp-bump`

## [v0.3.0](https://github.com/futagoza/gulp/compare/v0.2.0...v0.3.0) _(2018-09-20)_

* Added `@futagoza/gulp/publish`

## [v0.2.0](https://github.com/futagoza/gulp/compare/v0.1.0...v0.2.0) _(2018-09-20)_

* Handle options for `@futagoza/gulp/bump` more cleanly.
* Clarified documentation on `@futagoza/gulp/bump`
* Added main file: `@futagoza/gulp/index.js`
* Added `@futagoza/gulp/exec`

## [v0.1.0](https://github.com/futagoza/gulp/commits/v0.1.0) _(2018-09-19)_

* Initial release.
* Added `@futagoza/gulp/bump`
