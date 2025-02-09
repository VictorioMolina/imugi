const indicators = require("technicalindicators");

const Indicator = require("../Indicator");
const { SIGNALS, STOCH_RSI_THRESHOLDS } = require("../../../utils");

/**
 * The Stochastic RSI (Relative Strength Index) is an indicator used to
 * identify overbought or oversold conditions in a market. It combines the
 * concepts of the RSI with the stochastic oscillator to provide a more
 * sensitive reading of overbought and oversold levels.
 * 
 * @class
 * @extends {Indicator}
 */
class StochasticRSI extends Indicator {
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
   * Calculates the Stochastic RSI.
   *
   * @returns {object} The most recent %K, %D, and Stochastic RSI values.
   */
  _calculate() {
    const input = { values: this.values, ...this.params };
    const analysis = indicators.StochasticRSI.calculate(input);
    const { stochRSI, d, k } = analysis.pop();
    const indicator = { stochRSI, d, k };

    return indicator;
  }

  /**
   * Analyzes the Stochastic RSI indicator and returns the corresponding trading
   * signal based on the provided Stochastic RSI values and predefined or
   * custom thresholds.
   *
   * @param {object} [thresholds] - Thresholds for the Stochastic RSI signal.
   * @returns {string} The signal based on the Stochastic RSI.
   */
  signal(thresholds = STOCH_RSI_THRESHOLDS) {
    const { stochRSI, k, d } = this.value;

    if (
      k < d &&
      k < thresholds.strongOversold &&
      stochRSI < thresholds.oversold
    ) {
      return SIGNALS.STRONG_SELL;
    }

    if (
      (k < d && stochRSI > thresholds.overbought) ||
      stochRSI > thresholds.overbought
    ) {
      return SIGNALS.SELL;
    }
  
    if (
      (k > d && stochRSI < thresholds.oversold) ||
      stochRSI < thresholds.oversold
    ) {
      return SIGNALS.BUY;
    }
  
    if (
      k > d &&
      k > thresholds.strongOversold &&
      stochRSI < thresholds.oversold
    ) {
      return SIGNALS.STRONG_BUY;
    }

    return SIGNALS.HOLD;
  }
}

module.exports = StochasticRSI;
