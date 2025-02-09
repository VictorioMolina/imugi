const indicators = require("technicalindicators");

const Indicator = require("../Indicator");
const { SIGNALS, ADX_THRESHOLDS } = require("../../../utils");

/**
 * The ADX is a technical indicator used to measure the strength of a trend,
 * whether upward or downward. It is often used with the Positive Directional
 * Indicator (PDI) and the Negative Directional Indicator (MDI) to determine
 * the direction of the trend.
 *
 * - ADX indicates the strength of the trend. Values above 25 typically
 *   indicate a strong trend, while values below 20 or 25 may suggest a weak
 *   or non-existent trend.
 *
 * - PDI (Positive Directional Indicator) measures the strength of the
 *   upward trend.
 *
 * - MDI (Negative Directional Indicator) measures the strength of the
 *   downward trend.
 * 
 * @class
 * @extends {Indicator}
 */
class ADX extends Indicator {
  /**
   * @constructor
   * @param {number[]} close - Closing prices of the time frame.
   * @param {number[]} high - High prices of the time frame.
   * @param {number[]} low - Low prices of the time frame.
   * @param {object} params - Configuration parameters for the calculation.
   */
  constructor(close, high, low, params) {
    super(close, params);

    this.high = high;
    this.low = low;
    this.value = this._calculate();
  }

  /**
   * Calculates the Average Directional Index (ADX).
   *
   * @returns {object} The most recent ADX, PDI, and MDI values.
   */
  _calculate() {
    const input = {
      close: this.values,
      high: this.high,
      low: this.low,
      ...this.params,
    };

    const analysis = indicators.ADX.calculate(input);
    const { adx, pdi, mdi } = analysis.pop();
    const indicator = { adx, pdi, mdi };

    return indicator;
  }

  /**
   * Analyzes the ADX (Average Directional Index) indicator and returns the
   * corresponding trading signal.
   *
   * @param {object} [thresholds] - Thresholds for the ADX signal.
   * @returns {string} The signal based on the ADX.
   */
  signal(thresholds = ADX_THRESHOLDS) {
    const { adx, pdi, mdi } = this.value;

    if (adx >= thresholds.strongTrend && pdi > mdi) {
      return SIGNALS.STRONG_BUY;
    }
  
    if (
      adx >= thresholds.moderateTrend &&
      adx < thresholds.strongTrend &&
      pdi > mdi
    ) {
      return SIGNALS.BUY;
    }
  
    if (
      adx >= thresholds.moderateTrend &&
      adx < thresholds.strongTrend &&
      mdi > pdi
    ) {
      return SIGNALS.SELL;
    }
  
    if (adx >= thresholds.strongTrend && mdi > pdi) {
      return SIGNALS.STRONG_SELL;
    }

    return SIGNALS.HOLD;
  }
}

module.exports = ADX;
