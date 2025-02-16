/**
 * Parses a single candlestick into a structured object.
 *
 * @param {(number|string)[]} candle - A raw array of numbers representing
 *   a single candlestick.
 * @return {object} An object representing the parsed candlestick.
 */
module.exports = (candle) => ({
  timestamp: candle[0], // Open time
  open: parseFloat(candle[1]),
  high: parseFloat(candle[2]),
  low: parseFloat(candle[3]),
  close: parseFloat(candle[4]),
  volume: parseFloat(candle[5]),
});
