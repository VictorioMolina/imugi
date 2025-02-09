/**
 * Builds the data of a trading pair.
 *
 * @param {object} data - The data used to build the pair.
 * @returns {object} An object representing the market data of a trading pair.
 */
module.exports = ({ symbol, interval, candles, avgPrice }) => {
  const lastCandle = candles.at(-1);
  const lastPrice = lastCandle.close;
  const market = { symbol, interval, avgPrice, lastPrice, candles };

  return market;
};
