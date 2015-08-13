'use strict';
// TODO complete evergreen object
// TODO mocha istambul
// TODO Readme

var parser = require('ua-parser-js');
var _ = require('lodash');
var lib = require('./lib');

var defaultOptions = {
  browsers: {
    unauthorized: {},
    authorized: {},
    evergreen: false
  },
  redirectTo: '/incompatible-browser'
}

var middleware = function(options) {
  var options = _.extend({}, defaultOptions, options);

  return function(req, res, next) {
    var browser = parser(req.headers['user-agent']).browser;
    var browserOpt = options.browsers;

    if (
      _.isUndefined(browser.name) ||
      req.url === options.redirectTo ||
      /\./g.test(req.url)) {
      return next();
    }

    if (
      !lib.isMatch(browser, browserOpt.unauthorized) &&
      (lib.isMatch(browser, browserOpt.authorized) || lib.isEvergreen(browser, browserOpt.ervergreen))
    ) {
      return next();
    }

    return res.redirect(options.redirectTo);
  };
};

module.exports = middleware;
