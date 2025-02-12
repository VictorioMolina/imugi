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
   * @return {object} The most recent %K, %D, and Stochastic RSI values.
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
   * @return {string} The signal based on the Stochastic RSI.
   */
  signal(thresholds = STOCH_RSI_THRESHOLDS) {
    const { stochRSI, k, d } = this.value;
    const bullishMomentum = k > d;
    const bearishMomentum = k < d;

    // RSI in extreme oversold territory, suggesting a strong buy
    if (bullishMomentum && stochRSI <= thresholds.oversold) {
      return SIGNALS.STRONG_BUY;
    }

    // RSI in oversold territory, suggesting a buy opportunity
    if (bullishMomentum && stochRSI <= thresholds.sold) {
      return SIGNALS.BUY;
    }

    // RSI in extreme overbought territory, suggesting a strong sell
    if (bearishMomentum && stochRSI >= thresholds.overbought) {
      return SIGNALS.STRONG_SELL;
    }

    // RSI in overbought territory, suggesting a sell opportunity
    if (bearishMomentum && stochRSI >= thresholds.bought) {
      return SIGNALS.SELL;
    }

    // No strong momentum or no significant conditions
    return SIGNALS.HOLD;
  }
}

module.exports = StochasticRSI;
