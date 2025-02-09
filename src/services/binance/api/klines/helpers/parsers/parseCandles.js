const parseCandle = require("./parseCandle");

/**
 * Parses a list of raw candlesticks.
 *
 * @param {(number|string)[][]} candles - An array of raw candlesticks.
 * @returns {object[]} An array of parsed candlesticks.
 */
module.exports = (candles) => candles.map(parseCandle);
