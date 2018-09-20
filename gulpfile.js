"use strict";

const gulp = require( "gulp" );
const bump = require( "@futagoza/gulp/bump" );
const publish = require( "@futagoza/gulp/publish" );
const pump = require( "pump" );

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
