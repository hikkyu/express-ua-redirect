'use strict';

/**
 * isBrowserMatch
 * param askedBrowser {String}
 * param browser {String}
 * return {Boolean}
 */
module.exports = function isBrowserMatch(askedBrowser, browser) {
  askedBrowser = askedBrowser.toLowerCase();
  browser = browser.toLowerCase();
  return askedBrowser === browser;
};
