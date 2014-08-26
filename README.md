# grunt-bower-event [![Built with Grunt][grunt-img]][grunt-url] [![Build Status][travis-img]][travis-url] [![Coverage Status][coveralls-img]][coveralls-url]


> Now Grunt is talking your Bower language, listening for answers.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-copy --save-dev
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

#### arguments
TODO

#### argumentOptions
TODO


### Usage Examples

```js
bower: {
  install: {
  }
}
```



## Release History

 * 2014-08-25   v0.2.0   Publish a version to npm registry.
 * 2013-07-11   v0.1.0   First version.


[grunt-img]:     https://cdn.gruntjs.com/builtwith.png
[grunt-url]:     http://gruntjs.com/
[travis-img]:    https://travis-ci.org/dherges/grunt-bower-event.svg?branch=master
[travis-url]:    https://travis-ci.org/dherges/grunt-bower-event
[coveralls-img]: https://img.shields.io/coveralls/dherges/grunt-bower-event.svg
[coveralls-url]: https://coveralls.io/r/dherges/grunt-bower-event?branch=master

