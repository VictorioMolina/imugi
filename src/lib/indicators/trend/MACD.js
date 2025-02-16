const indicators = require("technicalindicators");

const Indicator = require("../Indicator");
const { SIGNALS, MACD_THRESHOLD } = require("../../../utils");

/**
 * The MACD is a trend-following momentum indicator that shows the relationship
 * between two moving averages of an asset's price. It consists of three
 * components:
 *
 * - macd: The difference between the fast EMA and the slow EMA.
 *
 * - signal: A 9-period EMA of the macd line, used to smooth short-term
 *   fluctuations.
 *
 * - histogram: The difference between the macd line and the signal line,
 *   used to identify momentum strength.
 *
 * @class
 * @extends {Indicator}
 */
class MACD extends Indicator {
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
   * Calculates the Moving Average Convergence Divergence (MACD) for a
   * given set of values.
   *
   * @return {object} The most recent MACD, signal, and histogram values.
   */
  _calculate() {
    const input = { values: this.values, ...this.params };
    const analysis = indicators.MACD.calculate(input);
    const { MACD: macd, signal = 0, histogram = 0 } = analysis.pop();
    const indicator = { macd, signal, histogram };

    return indicator;
  }

  /**
   * Analyzes the MACD indicator and returns the corresponding trading signal.
   *
   * @todo Avoid using a static threshold.
   * @param {number} [threshold=0.05] - Threshold used to define a
   *   strong signal.
   * @return {string} The signal based on the MACD.
   */
  signal(threshold = MACD_THRESHOLD) {
    const { macd, signal, histogram } = this.value;

    // MACD is above the signal line, indicating upward momentum
    if (macd > signal) {
      return histogram > threshold ? SIGNALS.STRONG_BUY : SIGNALS.BUY;
    }

    // MACD is below the signal line, indicating downward momentum
    if (macd < signal) {
      return histogram < -threshold ? SIGNALS.STRONG_SELL : SIGNALS.SELL;
    }

    // No clear direction
    return SIGNALS.HOLD;
  }
}

module.exports = MACD;
