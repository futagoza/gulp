"use strict";

const gulp = require( "gulp" );
const bump = require( "@futagoza/gulp/bump" );
const publish = require( "@futagoza/gulp/publish" );
const pump = require( "pump" );

// Bump the "version" field of `package.json`
gulp.task( "bump", () => pump(

    gulp.src( "packages/**/package.json" ),
    bump(),
    gulp.dest( "packages/" )

) );

// Puplish `@futagoza/gulp`
gulp.task( "publish", () => pump(
    gulp.src( "packages/*" ),
    publish( )
) );
