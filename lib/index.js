'use strict';

var _ = require('lodash');
var evergreenBrowser = require('../evergreenBrowser');
var util = require('./util');

module.exports = {
  isMatch: function(browser, toMatchBrowser) {
    if (_.isEmpty(toMatchBrowser)) {
      return false;
    }

    var isMatch = false;

    for (var key in toMatchBrowser) {
      if (util.isBrowserMatch(browser.name, key) && util.isVersionMatch(browser.major, toMatchBrowser[key])) {
        isMatch = true;
      }
    }

    return isMatch;
  },

  isEvergreen: function(browser, evergreen) {
    if (!evergreen) {
      return true;
    }

    var isEvergreen = false;

    for (var key in evergreenBrowser) {
      if (util.isBrowserMatch(browser.name, key) && util.isVersionMatch(browser.major, evergreenBrowser[key])) {
        isEvergreen = true;
      }
    }

    return isEvergreen;
  },
};
