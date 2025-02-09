const indicators = require("technicalindicators");

const Indicator = require("../Indicator");
const { SIGNALS, RSI_THRESHOLDS } = require("../../../utils");

/**
 * The Relative Strength Index (RSI) is a momentum oscillator used to measure
 * the speed and change of price movements. It is typically used to identify
 * overbought or oversold conditions in a market, helping traders decide when
 * to enter or exit trades.
 * 
 * @class
 * @extends {Indicator}
 */
class RSI extends Indicator {
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
   * Calculates the Relative Strength Index (RSI).
   *
   * @returns {number} The most recent RSI value, in a range from 0 to 100.
   */
  _calculate() {
    const input = { values: this.values, ...this.params };
    const analysis = indicators.RSI.calculate(input);
    const rsi = analysis.pop();

    return rsi;
  }

  /**
   * Analyzes the Relative Strength Index (RSI) and returns the corresponding
   * trading signal.
   *
   * @param {object} [thresholds] - Thresholds for the RSI signal.
   * @returns {string} The signal based on the RSI.
   */
  signal(thresholds = RSI_THRESHOLDS) {
    const rsi = this.value;

    if (rsi < thresholds.strongBuy) return SIGNALS.STRONG_BUY;
    if (rsi < thresholds.buy) return SIGNALS.BUY;
    if (rsi > thresholds.strongSell) return SIGNALS.STRONG_SELL;
    if (rsi > thresholds.sell) return SIGNALS.SELL;

    return SIGNALS.HOLD;
  }
}

module.exports = RSI;
