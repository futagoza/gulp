"use strict";

const gulp = require( "@gulpx/api" );
const bump = require( "@futagoza/gulp/bump" );
const eslint = require( "gulp-eslint" );
const publish = require( "@futagoza/gulp/publish" );
const pump = require( "pump" );

// Run ESLint on all JavaScript files.
gulp.task( "lint", () => pump(

    gulp.src( [
        "gulpx/cli/bin/gulpx",
        "gulpx/**/*.js",
        "packages/**/*.js",
        ".eslintrc.js",
        "gulpfile.js",
    ] ),
    eslint( { dotfiles: true } ),
    eslint.format(),
    eslint.failAfterError()

) );

// Bump the "version" field of every `package.json` in the gulpx directory
gulp.task( "bump:gulpx", () => pump(

    gulp.src( "gulpx/**/package.json" ),
    bump(),
    gulp.dest( "gulpx/" )

) );

// Bump the "version" field of every `package.json` in the packages directory
gulp.task( "bump:plugins", () => pump(

    gulp.src( "packages/**/package.json" ),
    bump(),
    gulp.dest( "packages/" )

) );

gulp.task( "bump", gulp.series( "bump:gulpx", "bump:plugins" ) );

// Publish all the packages in this monorepo (versions should be synced before-hand)
gulp.task( "publish", () => pump(
    gulp.src( [
        "gulpx/*",
        "packages/*",
    ] ),
    publish( )
) );
