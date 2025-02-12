/* eslint-disable new-cap */
const indicators = require("technicalindicators");

const Indicator = require("../Indicator");
const { SIGNALS, EMA_THRESHOLD } = require("../../../utils");

/**
 * The EMA is a weighted moving average that gives more importance to recent
 * price data. It is used to identify trends and momentum in the market.
 *
 * @class
 * @extends {Indicator}
 */
class EMA extends Indicator {
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
   * Calculates the Exponential Moving Average (EMA).
   *
   * @return {number} The most recent EMA value.
   */
  _calculate() {
    const input = { values: this.values, ...this.params };
    const analysis = indicators.EMA.calculate(input);
    const ema = analysis.pop();

    return ema;
  }

  /**
   * Analyzes the Exponential Moving Average (EMA) indicator and returns the
   * corresponding trading signal.
   *
   * This function compares the current price to the EMA and determines a
   * signal based on their relationship.
   *
   * @param {number} price - The last price of the trading pair.
   * @param {number} [threshold] - Threshold for the EMA signal.
   * @return {string} The signal based on the EMA.
   */
  signal(price, threshold = EMA_THRESHOLD(price)) {
    const ema = this.value;
    const diff = price - ema;

    // Price is significantly below the EMA, indicating oversold
    if (diff <= -threshold) {
      return SIGNALS.STRONG_BUY;
    }

    // Price is slightly below the EMA, suggesting a buying opportunity
    if (diff < 0 && diff >= -threshold / 2) {
      return SIGNALS.BUY;
    }

    // Price is slightly above the EMA, suggesting a selling opportunity
    if (diff > 0 && diff <= threshold / 2) {
      return SIGNALS.SELL;
    }

    // Price is significantly above the EMA, indicating overbought
    if (diff >= threshold) {
      return SIGNALS.STRONG_SELL;
    }

    // Price is very close to the EMA, indicating no strong trend
    return SIGNALS.HOLD;
  }
}

module.exports = EMA;
