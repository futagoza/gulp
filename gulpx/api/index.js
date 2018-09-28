"use strict";

const Undertaker = require( "undertaker" );
const vfs = require( "vinyl-fs" );

/**
 * A custom variant of the Gulp API.
 */
class Gulp extends Undertaker {

    constructor( registry ) {

        super( registry );

        // Bind the functions for destructuring
        this.task = this.task.bind( this );
        this.series = this.series.bind( this );
        this.parallel = this.parallel.bind( this );
        this.registry = this.registry.bind( this );
        this.tree = this.tree.bind( this );
        this.lastRun = this.lastRun.bind( this );

        // Let people use these from our instance
        this.Gulp = Gulp;
        this.dest = vfs.dest;
        this.src = vfs.src;
        this.symlink = vfs.symlink;

    }

    path( globs, opt ) {

        if ( opt === null ) opt = {};
        opt.read = false;

        return vfs.src( globs, opt );

    }

}

module.exports = new Gulp();
