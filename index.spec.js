var middleware = require('./index');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
chai.should();

describe('middleware:express-ua-redirect', function() {
  var next;
  var options = {
    browsers: {
      unauthorized: {
        IE: '8-'
      }
    }
  };
  var req = {
    headers: {}
  };
  var res;

  beforeEach(function() {
    req.headers['user-agent'] = '';
    req.url = '/test';
    next = sinon.spy();
    res = {
      redirect: sinon.spy()
    };
  });

  afterEach(function() {
    next.reset();
    requestFunction = null;
    res.redirect.reset();
  });

  describe('should not redirect', function() {
    it('with no user-agent', function() {
      middleware(options)(req, res, next);
      next.should.have.been.called;
      res.redirect.should.have.not.been.called;
    });

    it('with defaultOptions even with creepy browser', function() {
      req.headers['user-agent'] = 'Mozilla/4.0 (compatible; MSIE 5.5b1; Mac_PowerPC)';
      middleware({})(req, res, next);
      next.should.have.been.called;
      res.redirect.should.have.not.been.called;
    });

    it('with \'Chrome 44\' and evergreen activated', function() {
      req.headers['user-agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.130'
      middleware(options)(req, res, next);
      next.should.have.been.called;
      res.redirect.should.have.not.been.called;
    });

    it('with \'IE9\' and \'IE 8-\' set as unauthorize', function() {
      req.headers['user-agent'] = 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; Media Center PC 6.0; InfoPath.3; MS-RTC LM 8; Zune 4.7)'
      middleware(options)(req, res, next);
      next.should.have.been.called;
      res.redirect.should.have.not.been.called;
    });

    it('with \'IE7\' and \'IE 8-\' set as unauthorize if \'req.url\' is equal \'redirectTo\' option to avoid infinite loop', function() {
      req.headers['user-agent'] = 'Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)';
      req.url = '/incompatible-browser';
      middleware(options)(req, res, next);
      next.should.have.been.called;
      res.redirect.should.have.not.been.called;
    });

    it('with \'IE7\' and \'IE 8-\' set as unauthorize if \'req.url\' is a static asset', function() {
      req.headers['user-agent'] = 'Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)';
      req.url = '/test.css';
      middleware(options)(req, res, next);
      next.should.have.been.called;
      res.redirect.should.have.not.been.called;
    });

    it('with \'evergreen\' mode and \'safari 7+\' set as authorized', function() {
      middleware({
        browsers: {
          authorized: {
            safari: '7+'
          },
          evergreen: true
        }
      })(req, res, next);
      next.should.have.been.called;
      res.redirect.should.have.not.been.called;
    })
  });

  describe('should redirect', function() {
    it('with \'IE7\' and \'IE 8-\' set as unauthorize', function() {
      req.headers['user-agent'] = 'Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)';
      middleware(options)(req, res, next);
      next.should.have.not.been.called;
      res.redirect.should.have.been.calledWith('/incompatible-browser');
    });
  });
});
