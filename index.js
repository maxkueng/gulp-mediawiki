"use strict";

var path = require('path');
var whenthen = require('whenthen');
var gutil = require('gulp-util');
var es = require('event-stream');
var MeidaWiki = require('nodemw');

module.exports = mediawikiPlugin;

function mediawikiPlugin (config) {
	config = config || {};

	config.name = config.name || 'mediawiki';
	config.namespace_delimiter = config.namespace_delimiter || '__';
	config.space_delimiter = config.space_delimiter || '_';
	config.edit_message = config.edit_message || '';

	var log = function (message) {
		gutil.log(config.name, message);
	};

	var client = new MeidaWiki({
		server: config.server,
		port: config.port,
		path: config.path,
		username: config.username,
		password: config.password,
		debug: false
	});

	var whenLoggedIn = whenthen(function (resolve) {
		if (!config.username || !config.password) {
			log('No credentials provided, skipping login.');
			return resolve();
		}

		client.logIn(function () {
			resolve();
		});
	});
	
	return es.map(function (file, cb) {
		whenLoggedIn.do(function () {
			var filename = path.basename(file.path)
				.replace(config.namespace_delimiter, ':')
				.replace(config.space_delimiter, ' ');

			if (config.namespace) {
				filename = config.namespace + ':' + filename;
			}

			if (config.extension && path.extname(file.path) === config.extension) {
				filename = filename.replace(new RegExp(config.extension + '$'), '');
			}

			client.edit(filename, file.contents.toString(), config.edit_message, function () {
				cb(null, file);
			});

		});

	});
}
