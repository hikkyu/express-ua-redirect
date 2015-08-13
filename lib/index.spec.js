var chai = require('chai');
var expect = chai.expect;
var lib = require('../lib');

describe('lib:isMatch', function() {
  describe('should return true', function() {
    it('with \'IE 7\' and \'IE 8-\'', function() {
      expect(lib.isMatch({name: 'IE', major: '7'}, {IE: '8-'})).to.be.true;
    });

    it('with \'IE 8\' and \'IE 8-\'', function() {
      expect(lib.isMatch({name: 'IE', major: '8'}, {IE: '8-'})).to.be.true;
    });

    it('with \'IE 9\' and \'IE 8+\'', function() {
      expect(lib.isMatch({name: 'IE', major: '9'}, {IE: '8+'})).to.be.true;
    });
  });

  describe('should return false', function() {
    it('with \'IE 9\' and \'IE 8-\'', function() {
      expect(lib.isMatch({name: 'IE', major: '9'}, {IE: '8-'})).to.be.false;
    });

    it('with \'IE 7\' and \'IE 8+\'', function() {
      expect(lib.isMatch({name: 'IE', major: '7'}, {IE: '8+'})).to.be.false;
    });
  });
});

describe('lib:isEvergreen', function() {
  describe('should return true', function() {
      it('with chrome 44', function() {
        expect(lib.isEvergreen({name: 'chrome', major: '44'}, true)).to.be.true;
      });

      it('if evergreen is not activated', function() {
        expect(lib.isEvergreen({name: 'chrome', major: '44'}, false)).to.be.true;
      })
  });

  describe('should return false', function() {
    it('should return false with chrome 23', function() {
      expect(lib.isEvergreen({name: 'chrome', major: '23'}, true)).to.be.false;
    });

    it('should return false with internet explorer 7', function() {
      expect(lib.isEvergreen({name: 'IE', major: '7'}, true)).to.be.false;
    });
  });
});
