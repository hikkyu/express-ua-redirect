'use strict';

var chai = require('chai');
var expect = chai.expect;
var isBrowserMatch = require('./isBrowserMatch');

describe('util:isBrowserMatch', function() {
  describe('should return true', function() {
    it('with \'chrome\' and \'chrome\'', function() {
      expect(isBrowserMatch('chrome', 'chrome')).to.be.true;
    });

    it('with \'chrome\' and \'Chrome\'', function() {
      expect(isBrowserMatch('chrome', 'Chrome')).to.be.true;
    });
  });

  describe('should return false', function() {
    it('with \'safari\' and \'chrome\'', function() {
      expect(isBrowserMatch('safari', 'chrome')).to.be.false;
    });
  });
});
