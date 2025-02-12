const { fetchCandlesticks } = require("../klines/candles");
const { fetchAvgPrice } = require("./price");
const { buildPair } = require("./helpers");

/**
 * Fetches market data for a given trading pair symbol and interval.
 *
 * This function retrieves the candlestick data and average price for the
 * given symbol concurrently from the Binance API. It extracts the last price
 * from the most recent candlestick data and consolidates all relevant
 * information for the symbol.
 *
 * @async
 * @param {string} symbol - The trading pair symbol.
 * @param {string} [interval="1h"] - The interval for the candlestick data.
 * @return {Promise<object>} A promise that resolves to the retrieved
 *   trading pair's market data.
 */
async function fetchTradingPair(symbol, interval = "1h") {
  const promises = [
    fetchCandlesticks(symbol, interval),
    fetchAvgPrice(symbol),
  ];

  const [candles, avgPrice] = await Promise.all(promises);

  const data = {
    symbol,
    interval,
    candles,
    avgPrice,
  };

  const tradingPair = buildPair(data);

  return tradingPair;
};

module.exports = { fetchTradingPair };
