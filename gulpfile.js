"use strict";

const gulp = require( "gulp" );
const bump = require( "@futagoza/gulp/bump" );
const eslint = require( "gulp-eslint" );
const publish = require( "@futagoza/gulp/publish" );
const pump = require( "pump" );

// Run ESLint on all JavaScript files.
gulp.task( "lint", () => pump(

    gulp.src( [
        "packages/**/*.js",
        ".eslintrc.js",
        "gulpfile.js",
    ] ),
    eslint( { dotfiles: true } ),
    eslint.format(),
    eslint.failAfterError()

) );

// Bump the "version" field of every `package.json` in the packages directory
gulp.task( "bump", () => pump(

    gulp.src( "packages/**/package.json" ),
    bump(),
    gulp.dest( "packages/" )

) );

// Publish all the packages in this monorepo (versions should be synced before-hand)
gulp.task( "publish", () => pump(
    gulp.src( "packages/*" ),
    publish( )
) );
