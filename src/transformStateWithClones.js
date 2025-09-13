'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let current = { ...state };

  for (const act of actions) {
    let newObj;

    if (act.type === 'addProperties') {
      newObj = { ...current, ...act.extraData };
    } else if (act.type === 'removeProperties') {
      newObj = { ...current };

      if (Array.isArray(act.keysToRemove)) {
        for (const key of act.keysToRemove) {
          delete newObj[key];
        }
      }
    } else if (act.type === 'clear') {
      newObj = {};
    } else {
      newObj = { ...current };
    }

    result.push(newObj);
    current = newObj;
  }

  return result;
}

module.exports = transformStateWithClones;
