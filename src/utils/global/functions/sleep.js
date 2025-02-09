/**
 * Delays the execution for a given number of milliseconds.
 *
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise} A promise that resolves after the given delay.
 */
module.exports = (ms) => new Promise(resolve => setTimeout(resolve, ms));
