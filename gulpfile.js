"use strict";

const { dest, series, src, task } = require( "@futagoza/gulpx" );
const bump = require( "@futagoza/gulp-bump" );
const eslint = require( "gulp-eslint" );
const publish = require( "@futagoza/gulp-publish-package" );

// Run ESLint on all JavaScript files.
task( "lint", () => [

    src( [
        "packages/gulpx/bin/gulpx",
        "packages/**/*.js",
        "plugins/**/*.js",
        ".eslintrc.js",
        "gulpfile.js",
    ] ),
    eslint( { dotfiles: true } ),
    eslint.format(),
    eslint.failAfterError()

] );

// Bump the "version" field of every `package.json` in the packages directory
task( "bump:packages", () => [

    src( "packages/**/package.json" ),
    bump(),
    dest( "packages/" )

] );

// Bump the "version" field of every `package.json` in the plugins directory
task( "bump:plugins", () => [

    src( "plugins/**/package.json" ),
    bump(),
    dest( "plugins/" )

] );

// Bump everything (good idea?)
task( "bump", series( "bump:packages", "bump:plugins" ) );

// Publish all the packages in this monorepo (versions should be synced before-hand)
task( "publish", () => [

    src( [
        "packages/*",
        "plugins/*",
    ] ),
    publish()

] );
