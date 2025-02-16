const parseCandle = require("./parseCandle");

/**
 * Parses a list of raw candlesticks.
 *
 * @param {Array<number | string>[]} candles - An array of raw candlesticks.
 * @return {object[]} An array of parsed candlesticks.
 */
module.exports = (candles) => candles.map(parseCandle);
