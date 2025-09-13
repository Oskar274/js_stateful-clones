'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = { ...state };

  for (const act of actions) {
    let newObj;

    switch (act.type) {
      case 'addProperties':
        newObj = { ...stateCopy, ...act.extraData };
        break;

      case 'removeProperties':
        newObj = { ...stateCopy };
        if (Array.isArray(act.keysToRemove)) {
          for (const key of act.keysToRemove) {
            delete newObj[key];
          }
        }
        break;

      case 'clear':
        newObj = {};
        break;

      default:
        newObj = { ...stateCopy };
        break;
    }

    result.push(newObj);
    stateCopy = newObj;
  }

  return result;
}


module.exports = transformStateWithClones;
