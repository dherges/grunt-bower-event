# grunt-bower-event

[![Built with Grunt][grunt-img]][grunt-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coveralls-img]][coveralls-url] [![Dependencies][deps-img]][deps-url] [![Dev Dependencies][devdeps-img]][devdeps-url]

> Now Grunt is talking your Bower language, listening for answers.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-bower-event --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-bower-event');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-copy/tree/grunt-0.3-stable).*



## Bower task
_Run this task with the `grunt bower` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

#### bowerDirectory

Type: `String`

Default: current working directory of grunt

Bower working directory where your .bowerrc configuration is located.


#### config

Type: `Object`

Default: empty, Bower default config

Bower configuration according to the [specification](https://github.com/bower/config/blob/master/lib/util/defaults.js#L22-L41).
Leave blank for Bower's default config.


#### arguments

Type: `Array`

Default: empty

Arguments that are passed to the bower command.
Leave blank if command does not take arguments.

Example: ```['bootstrap']``` for command  ```'bower install'```.


#### argumentOptions

Type: `Object`

Default: empty

Argument options that are passed to the bower command.

Example: ```{"force-latest": true}``` for command ```bower install```


#### eventPrefix

Type: `String`

Default: `bower.`

Bower events are namespace-prefixed with this label when they are emitted through the ```grunt.event``` API.

Example: listen for a log event with ```grunt.event.on('bower.log', function (data) { ... })```


### Usage Examples

#### Simple Bower command

```js
bower: {
  install: {
  }
}
```

The above configuration will run ```bower install```.

Just give the desired bower command as grunt target. The list of commands is available at [Bower's API documentation](http://bower.io/docs/api/)

#### Explicit Bower command

```js
bower: {
  customTarget: {
    command: 'list'
  }
}
```

The above configuration will run ```bower list```.

#### Subscribe to Bower events

```js
grunt.event.on('bower.end', function (data, command) {
  console.log("received data from command: " + command);
  console.log(data);
});
```

Events from bower commands are emitted through the ```grunt.event``` API. The events are ```log```, ```error```,
```end```, and  ```prompt```.  They are prefixed with the option given by ```eventPrefix```, e.g. "bower.end" in the
example above.

The callback takes two parameters: the ```data``` object that the bower command produced and a string argument
```command```, e.g. "install".

#### TODO

**more samples to come..**



## Release History

 * 2014-12-29   v0.3.0   NPM registry version fixes. I encourage you to use v0.3.0 and later.
 * 2014-12-29   v0.2.1   Filter events by bower command (see [issue #2]("https://github.com/dherges/grunt-bower-event/issues/2" "Issue #2")).
 * 2014-08-25   v0.2.0   Publish a version to npm registry.
 * 2013-07-11   v0.1.0   First version.



[grunt-img]:     https://cdn.gruntjs.com/builtwith.png
[grunt-url]:     http://gruntjs.com/
[travis-img]:    https://travis-ci.org/dherges/grunt-bower-event.svg?branch=master
[travis-url]:    https://travis-ci.org/dherges/grunt-bower-event
[coveralls-img]: https://img.shields.io/coveralls/dherges/grunt-bower-event.svg
[coveralls-url]: https://coveralls.io/r/dherges/grunt-bower-event?branch=master
[deps-img]:      https://david-dm.org/dherges/grunt-bower-event.png
[deps-url]:      https://david-dm.org/dherges/grunt-bower-event
[devdeps-img]:   https://david-dm.org/dherges/grunt-bower-event/dev-status.png
[devdeps-url]:   https://david-dm.org/dherges/grunt-bower-event#info=devDependencies
