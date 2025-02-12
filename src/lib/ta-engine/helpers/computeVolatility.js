/**
 * Calculates the market's volatility factor by comparing the width of the
 * Bollinger Bands to the Average True Range (ATR). This provides an
 * indication of the relative market volatility, helping to assess the
 * potential for price fluctuations.
 *
 * The formula compares the distance between the upper and lower Bollinger
 * Bands to the ATR, and then normalizes the result to make the volatility
 * factor more manageable. This normalized value helps to adjust risk
 * management strategies, such as setting stop-loss and take-profit levels
 * in trading strategies.
 *
 * @param {number} atr - The Average True Range (ATR).
 * @param {object} bollinger - The Bollinger Bands.
 * @param {number} [smoothFactor=1/3] - Smoothing factor.
 * @return {number} The volatility factor, which quantifies the relative
 *   volatility of the market. A higher value indicates higher volatility,
 *   and a lower value suggests lower volatility.
 */
module.exports = (atr, bollinger, smoothFactor = 1 / 3) => {
  const bandWidth = bollinger.upperBand - bollinger.lowerBand;

  return bandWidth / atr * smoothFactor;
};
