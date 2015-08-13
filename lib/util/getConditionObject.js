'use strict';

/**
 * getConditionObject
 * param condition {String|Number}
 * return {Object}
 */
module.exports = function getConditionObject(condition) {
  var conditionObject = {};
  var superiorRegExp = /\+/g;
  var inferiorRegExp = /\-/g;

  switch (typeof condition) {
    case 'string':
      switch (true) {
        case superiorRegExp.test(condition):
          conditionObject.rule = 'superior';
          conditionObject.version = parseInt(condition.replace('+', ''));
          break;

        case inferiorRegExp.test(condition):
          conditionObject.rule = 'inferior';
          conditionObject.version = parseInt(condition.replace('-', ''));
          break;

        default:
          conditionObject.rule = 'equal';
          conditionObject.version = parseInt(condition);
          break;
      }
      break;

    case 'number':
      conditionObject.rule = 'equal';
      conditionObject.version = condition;
      break;

    default:
      throw new Error('wrong condition, must be a string or a number');
  }

  return conditionObject;
};
