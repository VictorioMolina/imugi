/**
 * Represents a base class for financial or mathematical indicators used in
 * market analysis.
 *
 * This abstract class provides a foundation for implementing specific
 * indicator logic by requiring subclasses to define their own calculation,
 * signal generation, and logging mechanisms. 
 *
 * Indicators typically analyze a series of values, such as pair prices or
 * trading volumes, based on specific parameters to produce meaningful insights
 * for decision-making.
 *
 * @abstract
 * @class
 */
class Indicator {
  /**
   * @constructor
   * @param {number[]} values - List of numerical values to calculate the
   *   indicator (typically closing prices).
   * @param {object} params - Configuration parameters for the calculation.
   */
  constructor(values, params) {
    this._values = values;
    this._params = params;
    this.value = undefined;
  }

  /**
   * Calculates the indicator's value.
   *
   * @abstract
   * @protected
   * @returns {*} The result of the indicator's calculation.
   * @throws _calculate() must be implemented in a subclass.
   */
  _calculate() {
    throw new Error("_calculate() must be implemented in a subclass.");
  }

  /**
   * Generates a trading signal based on the indicator's analysis, 
   * following established theories of market analysis.
   *
   * @abstract
   * @param {...any} [args] - Optional parameters to customize
   *   the signal generation
   * @returns {string} The signal generated based on the indicator's state.
   * @throws signal() must be implemented in a subclass.
   */
  signal(...args) {
    throw new Error("signal() must be implemented in a subclass.");
  }

  /**
   * Gets the list of values used for the indicator's calculations.
   *
   * @returns {number[]} The numerical data (typically closing prices) used
   *   by the indicator.
   */
  get values() {
    return this._values;
  }

  /**
   * Gets the current configuration parameters of the indicator.
   *
   * @returns {object} The indicator params.
   */
  get params() {
    return this._params;
  }
}

module.exports = Indicator;
