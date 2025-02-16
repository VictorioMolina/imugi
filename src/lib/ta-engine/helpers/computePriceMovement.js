/**
 * Estimates the potential price movement based on the Average True Range (ATR)
 * and the market volatility. This helps forecast the expected range of price
 * changes over a given period, factoring in both historical volatility and
 * current market conditions.
 *
 * The function calculates the expected price movement by multiplying the ATR
 * by a factor that adjusts for the relative volatility. This estimation
 * provides traders with an idea of how much a market could move, assisting in
 * setting appropriate stop-loss and take-profit levels.
 *
 * @param {number} atr - The Average True Range (ATR).
 * @param {number} volatility - A factor that represents the relative
 *   volatility of the market, derived from comparing Bollinger Bands width to
 *   the ATR.
 * @return {number} The estimated price movement, indicating the expected
 *   range of price changes based on the current volatility conditions.
 */
module.exports = (atr, volatility) => atr * (1 + volatility);
