const indicators = require("technicalindicators");

const Indicator = require("../Indicator");

/**
 * The Average True Range (ATR) is a volatility indicator that measures 
 * market volatility by decomposing the total range of an asset's price 
 * movement into a specific period. It helps traders assess the strength 
 * and stability of a trend. The ATR is often used to set stop-loss levels 
 * or position sizes based on market volatility.
 *
 * The ATR is calculated based on three factors for each period:
 * 1. The current period's high minus the current period's low.
 * 2. The absolute value of the current period's high minus the previous close.
 * 3. The absolute value of the current period's low minus the previous close.
 * 
 * The ATR takes the maximum of these three values and averages them 
 * over a given period to provide a measure of volatility.
 *
 * @class
 * @extends {Indicator}
 */
class ATR extends Indicator {
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
   * Calculates the Average True Range (ATR).
   *
   * @returns {number} The most recent ATR value.
   */
  _calculate() {
    const input = {
      close: this.values,
      high: this.high,
      low: this.low,
      ...this.params,
    };

    const analysis = indicators.ATR.calculate(input);
    const atr = analysis.pop();

    return atr;
  }
}

module.exports = ATR;
