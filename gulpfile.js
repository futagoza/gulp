"use strict";

const gulp = require( "@futagoza/gulpx" );
const bump = require( "@futagoza/gulp/bump" );
const eslint = require( "gulp-eslint" );
const publish = require( "@futagoza/gulp/publish" );
const pump = require( "pump" );

// Run ESLint on all JavaScript files.
gulp.task( "lint", () => pump(

    gulp.src( [
        "packages/gulpx/bin/gulpx",
        "packages/**/*.js",
        "plugins/**/*.js",
        ".eslintrc.js",
        "gulpfile.js",
    ] ),
    eslint( { dotfiles: true } ),
    eslint.format(),
    eslint.failAfterError()

) );

// Bump the "version" field of every `package.json` in the packages directory
gulp.task( "bump:packages", () => pump(

    gulp.src( "packages/**/package.json" ),
    bump(),
    gulp.dest( "packages/" )

) );

// Bump the "version" field of every `package.json` in the plugins directory
gulp.task( "bump:plugins", () => pump(

    gulp.src( "plugins/**/package.json" ),
    bump(),
    gulp.dest( "plugins/" )

) );

// Bump everything (good idea?)
gulp.task( "bump", gulp.series( "bump:packages", "bump:plugins" ) );

// Publish all the packages in this monorepo (versions should be synced before-hand)
gulp.task( "publish", () => pump(
    gulp.src( [
        "packages/*",
        "plugins/*",
    ] ),
    publish( )
) );
