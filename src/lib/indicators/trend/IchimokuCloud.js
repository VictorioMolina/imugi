const indicators = require("technicalindicators");

const Indicator = require("../Indicator");
const { SIGNALS } = require("../../../utils");

/**
 * The Ichimoku Cloud is a technical indicator that provides insight into the
 * trend direction, momentum, and future support and resistance levels.
 * It consists of five main components that together form a "cloud" structure,
 * which is used to determine the strength and direction of the trend.
 *
 * - Tenkan-sen (Conversion Line): A fast-moving average that shows the
 *   short-term trend.
 *
 * - Kijun-sen (Base Line): A slower moving average that reflects the
 *   medium-term trend.
 *
 * - Senkou Span A (Leading Span A): The midpoint between the Tenkan-sen
 *   and Kijun-sen, projected forward.
 *
 * - Senkou Span B (Leading Span B): A slower, longer-term moving average
 *   projected forward.
 *
 * - Chikou Span (Lagging Span): The closing price plotted 26 periods
 *   in the past.
 *
 * @class
 * @extends {Indicator}
 */
class IchimokuCloud extends Indicator {
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
   * Calculates the Ichimoku Cloud indicator components.
   *
   * @return {object} The most recent Ichimoku Cloud properties.
   */
  _calculate() {
    const input = { high: this.high, low: this.low, ...this.params };
    const analysis = indicators.IchimokuCloud.calculate(input);
    const ichimoku = analysis.pop();
    const indicator = {
      tenkanSen: ichimoku?.conversion,
      kijunSen: ichimoku?.base,
      chikouSpan: this.values[this.values.length - 1 - 26],
      senkou: {
        spanA: ichimoku?.spanA,
        spanB: ichimoku?.spanB,
      },
    };

    return indicator;
  }

  /**
   * Analyzes the Ichimoku Cloud indicator and returns a trading signal.
   *
   * The signal is determined based on the relative positions of the
   * Tenkan-sen, Kijun-sen, Senkou Span A & B, and Chikou Span.
   *
   * @param {number} price - The last price of the trading pair.
   * @return {string} The signal based on Ichimoku.
   */
  signal(price) {
    const {
      tenkanSen,
      kijunSen,
      chikouSpan,
      senkou,
    } = this.value;

    const bullishTenkanKijun = tenkanSen > kijunSen;
    const bearishTenkanKijun = tenkanSen < kijunSen;

    const bullishCloud = senkou.spanA > senkou.spanB;
    const bearishCloud = senkou.spanA < senkou.spanB;

    const bullishChikou = chikouSpan > price;
    const bearishChikou = chikouSpan < price;

    // Tenkan-sen is above Kijun-sen, and cloud is bullish
    if (bullishTenkanKijun && bullishCloud) {
      return bullishChikou ? SIGNALS.STRONG_BUY : SIGNALS.BUY;
    }

    // Tenkan-sen is below Kijun-sen, cloud is bearish
    if (bearishTenkanKijun && bearishCloud) {
      return bearishChikou ? SIGNALS.STRONG_SELL : SIGNALS.SELL;
    }

    // Weak or no clear trend
    return SIGNALS.HOLD;
  }
}

module.exports = IchimokuCloud;
