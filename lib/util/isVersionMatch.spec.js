var chai = require('chai');
var expect = chai.expect;
var isVersionMatch = require('./isVersionMatch');

describe('util:isVersionMatch', function() {
  describe('should return true', function() {
    it('with 7 and \'7+\'', function() {
      expect(isVersionMatch(7, '7+')).to.be.true;
    });

    it('with \'7\' and \'7+\'', function() {
      expect(isVersionMatch('7', '7+')).to.be.true;
    });

    it('with 6 and \'7-\'', function() {
      expect(isVersionMatch(6, '7-')).to.be.true;
    });

    it('with \'6\' and \'7-\'', function() {
      expect(isVersionMatch('6', '7-')).to.be.true;
    });

    it('with 6 and 6', function() {
      expect(isVersionMatch(6, 6)).to.be.true;
    });
  });

  describe('should return false', function() {
    it('with 6 and \'7+\'', function() {
      expect(isVersionMatch(6, '7+')).to.be.false;
    });

    it('with \'6\' and \'7+\'', function() {
      expect(isVersionMatch('6', '7+')).to.be.false;
    });

    it('with 8 and \'7-\'', function() {
      expect(isVersionMatch(8, '7-')).to.be.false;
    });

    it('with \'8\' and \'7-\'', function() {
      expect(isVersionMatch('8', '7-')).to.be.false;
    });

    it('with 6 and 7', function() {
      expect(isVersionMatch(6, 7)).to.be.false;
    });
  });
});
