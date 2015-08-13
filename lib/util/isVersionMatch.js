'use strict';

var getConditionObject = require('./getConditionObject');

/**
 * isVersionMatch
 * param askedVersion {String|Number}
 * return {Boolean}
 */
module.exports = function isVersionMatch(askedVersion, condition) {
  var isMatch;
  var conditionObject = getConditionObject(condition);

  if (typeof askedVersion === 'string') {
    askedVersion = parseInt(askedVersion);
  }

  switch (conditionObject.rule) {
    case 'superior':
      isMatch = askedVersion >= conditionObject.version;
      break;

    case 'inferior':
      isMatch = askedVersion <= conditionObject.version;
      break;

    case 'equal':
      isMatch = askedVersion === conditionObject.version;
      break;
  }

  return isMatch;
};
