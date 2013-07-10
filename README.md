# grunt-bower

> Grunt plugin for Bower, a package manager for the web.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install dherges/grunt-bower --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-bower');
```

## The "bower" task

### Overview
In your project's Gruntfile, add a section named `bower` to the data object passed into `grunt.initConfig()`.

What command is being executed is either given through the target name or explicitly through the ```command``` option.

```js
grunt.initConfig({
  bower: {
    install: {
      options: {
        // Target-specific options for 'bower install' go here.
      },
      args: [
        // Target-specific arguments for 'bower install' go here.
      ]
    },
    your_second_target: {
      command: 'list',
      options: {}, // Target-specific options for 'bower list' go here.
      args: [] // Target-specific arguments for 'bower list' go here.
    }
  }
})
```

### Options

#### command
Type: `String`
Default value: `''`

If set, ```comand``` gives the bower command that is executed. For now, ```install``` and ```list``` are known to be useful commands for this plugin, though all commands of Bower's programmatic API are available.

#### options
Type: `Object`
Default value: `{}`

Options for the bower command being executed; see [http://bower.io](http://bower.io) for a list of available options.

#### arguments
Type: `Array`
Default value: `[]`

Arguments for the bower command being executed; see [http://bower.io](http://bower.io) for a list of available arguments.


### Usage Examples

#### Install
In this example, we run a simple ```bower install```.

```js
grunt.initConfig({
  bower: {
    install: {
    }
  }
})
```

#### List pathes
In this example, we run ```bower list --paths```.

```js
grunt.initConfig({
  bower: {
    consumePaths: {
      command: 'list',
      options: {
        paths: true
      }
    }
  }
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

 * 2013-07-11 v0.1.0 First version.
