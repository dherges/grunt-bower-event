/*
 * grunt-bower
 * https://github.com/dherges/grunt-bower
 *
 * Copyright (c) 2014 David Herges
 * Licensed under the MIT license.
 */

'use strict';


var grunt = require('grunt');

/**
 * Generates a '.content-xml' file for each bower package so that it becomes a 'cq:ClientLibraryFolder' that is
 * recognized by AEM.
 *
 * Client library dependencies are automatically wired according to the bower dependencies.
 */
function AemClientLibraries () {
}

AemClientLibraries.prototype.end = function (data) {
  var mapPackageName = function (pkgName) {
    return "procato." + pkgName.replace('.', '');
  };

  grunt.log.oklns("Running AEM scaffolder...");

  var myEndpoint = data.endpoint;
  var myComponent = data.pkgMeta;
  var canonicalDir = data.canonicalDir;
  grunt.verbose.writeln("endpoint: " + myEndpoint);
  grunt.verbose.writeln("component: " + myComponent);
  grunt.verbose.writeln("canonicalDir: " + canonicalDir);

  var components = data.dependencies;

  // TODO: 'bower list' returns a nested list, need to do this for every nested component

  for (var compName in components) {
    var comp = components[compName];

    // file path: '<%= vendor %>/{package}/.content.xml'
    var path = grunt.template.process('<%= pkgDirectory %>/.content.xml', {
      data: {
        pkgDirectory: comp.canonicalDir
      }
    });

    var dependencies = grunt.util
      .toArray(comp.dependencies)
      .map(function (dependency) {
        return mapPackageName(dependency.pkgMeta.name);
      });

    // .content.xml template
    var xmlTemplate = '<?xml version="1.0" encoding="UTF-8"?>' + "\n" +
      '<jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"' + "\n" +
      '    jcr:primaryType="cq:ClientLibraryFolder"' + "\n" +
      '    categories="[<%= pkgName %>]"' + "\n" +
      '    dependencies="[<%= deps.join(",") %>]"/>';

    var xmlContents = grunt.template.process(xmlTemplate, {
      data: {
        pkgName: mapPackageName(compName),
        deps: dependencies
      }
    });

    grunt.file.write(path, xmlContents);
  }
};

AemClientLibraries.prototype.error = function (err) {
  grunt.log.error("error in aem clientlibraries");
};

AemClientLibraries.prototype.log = function (data) {
  grunt.log.write("log in aem clientlibraries");
};


module.exports = AemClientLibraries;
