Tasks and helpers for use in `gulpfile.js`

### @futagoza/gulp/bump

Will bump the `version` field of any file passed to it.

This is just a wrapper around _[gulp-bump](https://www.npmjs.com/package/gulp-bump)_; it takes arguments from the command line interface, passes them through _[minimist](https://www.npmjs.com/package/minimist)_ to get the options that are then passed to _gulp-bump_. You can also programmatically pass default options.

> Optionally you can pass the `argv` yourself as the first argument (an array), or as `options.argv`

As well as the options from _gulp-bump_, you can use the following on the CLI, and it will get translated to the appropriate option used for _gulp-bump_.

| cli option | gulp-bump option |
| ---------- | ---------------- |
| `--new-version value`<br>`-V value` | `version: value` |
| `--major` | `type: "major"` |
| `--minor` | `type: "minor"` |
| `--patch` | `type: "patch"` |
