Tasks and helpers for use in `gulpfile.js`

### @futagoza/gulp/bump

Will bump the `version` field of any file passed to it.

This is just a wrapper around _[gulp-bump](https://www.npmjs.com/package/gulp-bump)_ to take options from the cli and pass them to _gulp-bump_, so if you're planning to programmatically pass options, just use `gulp-bump` directly.

As well as the options from _gulp-bump_, you can use the following on the CLI, and it will get translated to the appropriate option used for _gulp-bump_.

| cli option | gulp-bump option |
| ---------- | ---------------- |
| `--new-version value`<br>`-V value` | `version: value` |
| `--major` | `type: "major"` |
| `--minor` | `type: "minor"` |
| `--patch` | `type: "patch"` |
