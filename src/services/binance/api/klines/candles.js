/* eslint-disable max-len */
const axios = require("axios");

const { BINANCE_KLINES_API_URL } = require("../../utils");
const { parseCandles } = require("./helpers");

/**
 * Fetches the candlestick data of a symbol from Binance API, using the given
 * interval and limit.
 *
 * @async
 * @param {string} symbol - The trading pair symbol.
 * @param {string} [interval="1h"] - The interval for the candlestick data.
 * @param {number} [limit=1000] - The number of candlesticks to retrieve.
 * @return {Promise<object[]>} A promise that resolves to the parsed
 *   candlesticks.
 * @see https://developers.binance.com/docs/binance-spot-api-docs/rest-api/public-api-endpoints#klinecandlestick-data
 */
async function fetchCandlesticks(symbol, interval = "1h", limit = 1000) {
  const config = {
    params: { symbol, interval, limit },
  };

  const response = await axios.get(BINANCE_KLINES_API_URL, config);

  const candles = parseCandles(response.data);

  return candles;
};

module.exports = { fetchCandlesticks };
