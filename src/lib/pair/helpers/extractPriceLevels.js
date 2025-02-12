/**
 * Extracts the price levels (close, high, low) from a list of
 * candlesticks, ensuring that the data is properly aligned for analysis.
 *
 * @param {object[]} candles - The pair candles.
 * @return {object}
 *   An object containing:
 *   - closes: An array of closing prices from the candles.
 *   - highs: An array of high prices from the candles.
 *   - lows: An array of low prices from the candles.
 * @throws Malformed candles.
 */
module.exports = (candles) => {
  const closes = candles.map((candle) => candle.close);
  const highs = candles.map((candle) => candle.high);
  const lows = candles.map((candle) => candle.low);

  if (
    closes.length !== highs.length ||
    highs.length !== lows.length
  ) {
    throw new Error("Malformed candles.");
  }

  return { closes, highs, lows };
};
