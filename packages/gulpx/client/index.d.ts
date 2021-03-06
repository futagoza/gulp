import { pump, pipeline } from "@futagoza/pump";
import * as Registry from "undertaker-registry";
import * as Undertaker from "undertaker";
import * as vfs from "vinyl-fs";

interface Gulp extends Undertaker {

    /**
     * Create's a new instance of the `@futagoza/gulpx` client
     * 
     * @param registry Instance of an existing Undertaker registry.
     */
    Gulp( registry?: Registry ): Gulp;

    /**
     * Emits files matching provided glob or array of globs. Returns a stream of Vinyl files that can
     * be piped to plugins.
     * 
     * @param globs Glob or array of globs to read.
     * @param options Options to pass to node-glob through glob-stream.
     */
    src: typeof vfs.src;

    /**
     * Can be piped to and it will write files. Re-emits all data passed to it so you can pipe to
     * multiple folders. Folders that don't exist will be created.
     * 
     * @param path The path (output folder) to write files to or a function that returns it.
     */
    dest: typeof vfs.dest;

    /**
     * Functions exactly like gulp.dest, but will create symlinks instead of copying a directory.
     * 
     * @param folder A folder path or a function that receives a file and returns a folder path.
     */
    symlink: typeof vfs.symlink;

    /**
     * Is a wrapper around _gulp.src_ where the `read` option has a fixed value of `false` so that
     * no file content is ever returned.
     * 
     * @param globs Glob or array of globs.
     * @param opts Options to pass to node-glob through glob-stream.
     */
    path: typeof vfs.src;

    /**
     * Register the task by the given _taskName_.
     * 
     * When the task is executed and it returns an array, the array will be passed to
     * `@futagoza/pump`, and handled by it's promised pipeline.
     * 
     * @param taskName - Task name.
     * @param fn - Task function.
     */
    task( taskName: string, fn: Undertaker.TaskFunction ): void;

    /**
     * Pipe streams together and close all of them if one of them closes.
     */
    pipeline: typeof pipeline;

    /**
     * Will wrap `pump` in a Promise, as well as change any promise's and functions to streams.
     */
    pump: typeof pump;

}

declare const gulpx: Gulp;
export = gulpx;
