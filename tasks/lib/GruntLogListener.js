/*
 * grunt-bower
 * https://github.com/dherges/grunt-bower
 *
 * Copyright (c) 2014 David Herges
 * Licensed under the MIT license.
 */

'use strict';

var archy = require('archy'),
    chalk = require('chalk'),
    inquirer = require('inquirer'),
    mout = require('mout');

var GruntLogListener = function (grunt) {
  this.grunt = grunt;

  this.grunt.event.on('bower.log', this.log.bind(this));
  this.grunt.event.on('bower.error', this.error.bind(this));
  this.grunt.event.on('bower.end', this.end.bind(this));
  this.grunt.event.on('bower.prompt', this.prompt.bind(this));
};

GruntLogListener.prototype.end = function (data, task) {
  if (task === 'list') {
    // print bower dependency tree if 'list' is the command
    this.grunt.log.oklns("dependency tree:");
    console.log(archy(tree2archy(data)));
  }
  this.grunt.log.oklns("Bower command finished.");
};

GruntLogListener.prototype.error = function (err) {
  this.grunt.log.errorlns(err.message);
};

GruntLogListener.prototype.log = function (data) {
  this.grunt.log.writelns(data.id + " >> " + data.message);
  var grunt = this.grunt;

  if (data.data && data.data.picks && data.data.picks.forEach) {
    data.data.picks.forEach(function (pick, index) {
      grunt.log.writelns(
        grunt.log.wordlist(
          ['[', index, ']'],
          {separator: '', color: 'green'}
        ) + ' ' +
        grunt.log.wordlist(
          ['name=' + pick.pkgMeta.name, 'version=' + pick.pkgMeta.version],
          {separator: ', '}
        )
      );
    });
  }
};

GruntLogListener.prototype.prompt = function (prompts, callback) {
  inquirer.prompt(prompts, callback);
};

/**
 * the _tree2archy function, taken directly from bower source
 * https://github.com/bower/bower/blob/master/lib/renderers/StandardRenderer.js#L424-480
 *
 * bower renderers are not a separate module, or else we wouldn't need this,
 * see: https://github.com/bower/bower/issues/874
 */
function tree2archy (node) {
  var dependencies = mout.object.values(node.dependencies);
  var version = !node.missing ? node.pkgMeta._release || node.pkgMeta.version : null;
  var label = node.endpoint.name + (version ? '#' + version : '');
  var update;

  if (node.root) {
    label += ' ' + node.canonicalDir;
  }

  // State labels
  if (node.missing) {
    label += chalk.red(' not installed');
    return label;
  }

  if (node.different) {
    label += chalk.red(' different');
  }

  if (node.linked) {
    label += chalk.magenta(' linked');
  }

  if (node.incompatible) {
    label += chalk.yellow(' incompatible') + ' with ' + node.endpoint.target;
  } else if (node.extraneous) {
    label += chalk.green(' extraneous');
  }

  // New versions
  if (node.update) {
    update = '';

    if (node.update.target && node.pkgMeta.version !== node.update.target) {
        update += node.update.target + ' available';
    }

    if (node.update.latest !== node.update.target) {
        update += (update ? ', ' : '');
        update += 'latest is ' + node.update.latest;
    }

    if (update) {
        label += ' (' + chalk.cyan(update) + ')';
    }
  }

  if (!dependencies.length) {
    return label;
  }

  return {
    label: label,
    nodes: mout.object.values(dependencies).map(tree2archy)
  };
}

module.exports = GruntLogListener;
