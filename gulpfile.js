"use strict";

const gulp = require( "gulp" );
const bump = require( "./bump" );
const pump = require( "pump" );

// Bump the "version" field of `package.json`
gulp.task( "bump", () => pump(

    gulp.src( "package.json" ),
    bump(),
    gulp.dest( "./" )

) );
