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
   * @returns {number} The most recent EMA value.
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
   * @returns {string} The signal based on the EMA.
   */
  signal(price, threshold = EMA_THRESHOLD(price)) {
    const ema = this.value;
    const diff = price - ema;

    if (diff >= threshold) {
      return SIGNALS.STRONG_BUY;
    }

    if (diff > 0) {
      return SIGNALS.BUY;
    }

    if (Math.abs(diff) <= threshold) {
      return SIGNALS.HOLD;
    }

    if (diff <= -threshold) {
      return SIGNALS.STRONG_SELL;
    }

    return SIGNALS.SELL;
  }
}

module.exports = EMA;
