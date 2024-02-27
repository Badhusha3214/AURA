


/**
 * @param {Object} context
 * @param {Object} payload
 * @returns {void}
 */
export const setCounter = async ({ commit }, payload) => {
    commit("SET_COUNTER", payload);
};
