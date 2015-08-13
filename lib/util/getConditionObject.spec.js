'use strict';

var chai = require('chai');
var expect = chai.expect;
var getConditionObject = require('./getConditionObject');

describe('util:getConditionObject', function() {
  it('should throw error if value is not an object or an integer', function() {
    expect(getConditionObject).to.throw();
  });

  it('should return the good object with value \'8\'', function() {
    var conditionResult = getConditionObject('8');
    expect(conditionResult).to.have.property('rule').equal('equal');
    expect(conditionResult).to.have.property('version').equal(8);
  });

  it('should return the good object with value 44', function() {
    var conditionResult = getConditionObject(44);
    expect(conditionResult).to.have.property('rule').equal('equal');
    expect(conditionResult).to.have.property('version').equal(44);
  });

  it('should return the good object with value \'7+\'', function() {
    var conditionResult = getConditionObject('7+');
    expect(conditionResult).to.have.property('rule').equal('superior');
    expect(conditionResult).to.have.property('version').equal(7);
  });

  it('should return the good object with value \'190-\'', function() {
    var conditionResult = getConditionObject('190-');
    expect(conditionResult).to.have.property('rule').equal('inferior');
    expect(conditionResult).to.have.property('version').equal(190);
  });
});
