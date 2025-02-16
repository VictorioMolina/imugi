/* eslint-disable max-len */
const axios = require("axios");

const { BINANCE_AVG_PRICE_API_URL } = require("../../utils");

/**
 * Fetches the average price of a symbol from Binance API.
 *
 * @async
 * @param {string} symbol - The trading pair symbol.
 * @return {Promise<number>} A promise that resolves to the average price
 *   of the trading pair.
 * @see https://developers.binance.com/docs/binance-spot-api-docs/rest-api/public-api-endpoints#klinecandlestick-data
 */
async function fetchAvgPrice(symbol) {
  const config = {
    params: { symbol },
  };

  const response = await axios.get(BINANCE_AVG_PRICE_API_URL, config);

  const { price: avgPrice } = response.data;

  return parseFloat(avgPrice);
};

module.exports = { fetchAvgPrice };
