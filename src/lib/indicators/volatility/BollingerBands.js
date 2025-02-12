const indicators = require("technicalindicators");

const Indicator = require("../Indicator");
const { SIGNALS, BOLLINGER_ZONE_THRESHOLD } = require("../../../utils");

/**
 * The Bollinger Bands indicator is used to measure market volatility and
 * identify overbought or oversold conditions. It consists of three lines:
 *
 * 1. Upper Band: A moving average (usually 20 periods) plus a specified
 *    number of standard deviations above it.
 *
 * 2. Lower Band: A moving average minus the same number of standard
 *    deviations.
 *
 * 3. Middle Band: The simple moving average (SMA) itself, typically 20
 *    periods.
 *
 * Bollinger Bands expand when the market is volatile and contract during
 * periods of low volatility. The width between the upper and lower bands
 * is used as an indicator of volatility. When the price moves outside the
 * bands, it may suggest potential overbought or oversold conditions.
 *
 * @class
 * @extends {Indicator}
 */
class BollingerBands extends Indicator {
  /**
   * @constructor
   * @param {number[]} values - List of numerical values to calculate the
   *   indicator (typically closing prices).
   * @param {object} params - Configuration parameters for the calculation.
   */
  constructor(values, params) {
    super(values, params);

    this.value = this._calculate();
  }

  /**
   * Calculates the Bollinger Bands for a given set of values.
   *
   * @return {object} The most recent upper and lower Bollinger Bands.
   */
  _calculate() {
    const input = { values: this.values, ...this.params };
    const analysis = indicators.BollingerBands.calculate(input);
    const bollinger = analysis.pop();
    const bollingerBands = {
      upperBand: bollinger?.upper,
      lowerBand: bollinger?.lower,
    };

    return bollingerBands;
  }

  /**
   * Analyzes the Bollinger Bands indicator to determine the appropriate
   * trading signal.
   *
   * @param {number} price - The last price of the trading pair,
   *   used to compare with the Bollinger Bands to determine the
   *   trading action.
   * @param {number} [threshold=0.1] - A value between 0 and 1 that represents
   *   the percentage of the total band width used to define the zone within
   *   which the price will trigger a signal.
   * @return {string} The signal based on the current Bollinger Bands.
   */
  signal(price, threshold = BOLLINGER_ZONE_THRESHOLD) {
    const { upperBand, lowerBand } = this.value;
    const bandWidth = upperBand - lowerBand;
    const lowerBandZone = lowerBand + bandWidth * threshold;
    const upperBandZone = upperBand - bandWidth * threshold;

    // Price is significantly below the lower band, indicating oversold
    if (price <= lowerBand) {
      return SIGNALS.STRONG_BUY;
    }

    // Price is near the lower band, suggesting a buy opportunity
    if (price <= lowerBandZone) {
      return SIGNALS.BUY;
    }

    // Price is significantly above the upper band, indicating overbought
    if (price >= upperBand) {
      return SIGNALS.STRONG_SELL;
    }

    // Price is near the upper band, suggesting a sell opportunity
    if (price >= upperBandZone) {
      return SIGNALS.SELL;
    }

    // Price is within a neutral range, suggesting no immediate action
    return SIGNALS.HOLD;
  }
}

module.exports = BollingerBands;
