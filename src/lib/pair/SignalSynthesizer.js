const {
  SIGNALS,
  SIGNAL_WEIGHTS,
  SIGNAL_RELIABILITY_THRESHOLDS,
  INDICATOR_WEIGHTS,
} = require("../../utils");

/**
 * Aggregates multiple trading signals to determine a final trading decision.
 * It uses a weighted scoring system and normalizes results to ensure balanced
 * decision-making.
 *
 * @class
 */
class SignalSynthesizer {
  /**
   * Computes the final trading signal by processing signals from various
   * technical indicators.
   *
   * @static
   * @param {object} signals - Mapping of indicators to their
   *   respective signals.
   * @param {string} [interval="1h"] - The candlestick interval.
   * @return {string} The final computed trading signal.
   */
  static compute(signals, interval = "1h") {
    const scores = Object.values(SIGNALS).reduce(
      (acc, signal) => ({ ...acc, [signal]: 0 }),
      {}
    );

    let totalWeight = 0;

    for (const [indicator, signal] of Object.entries(signals)) {
      const indicatorWeight = INDICATOR_WEIGHTS[interval][indicator] ?? 0;
      const signalWeight = SIGNAL_WEIGHTS[signal] ?? 0;

      scores[signal] += indicatorWeight * signalWeight;
      totalWeight += indicatorWeight;
    }

    return this.#resolveContradictions(scores, totalWeight);
  }

  /**
   * Resolves conflicts between multiple trading signals using a weighted
   * approach. The function normalizes scores to ensure balanced
   * decision-making and prevents bias from dominant indicators.
   *
   * @private
   * @static
   * @param {object} scores - The scores assigned to each signal type.
   * @param {number} totalWeight - The total weight of all indicators.
   * @return {string} The final trading signal after resolving conflicts.
   */
  static #resolveContradictions(scores, totalWeight) {
    if (totalWeight === 0) {
      return SIGNALS.HOLD; // Safety check
    }

    // Normalize scores to prevent bias from dominant indicators
    const normalizedScores = Object.fromEntries(
      Object.entries(scores).map(([key, value]) => [key, value / totalWeight])
    );

    // eslint-disable-next-line object-curly-newline
    const { STRONG_BUY, BUY, HOLD, SELL, STRONG_SELL } = normalizedScores;

    // 1. Hold suggestion
    if (HOLD > Math.max(STRONG_BUY, BUY, SELL, STRONG_SELL)) {
      return SIGNALS.HOLD;
    }

    // 2. Prioritize strong signals if they are greater than all other signals
    if (
      STRONG_BUY >= SIGNAL_RELIABILITY_THRESHOLDS.strong &&
      STRONG_BUY > Math.max(BUY, HOLD, SELL, STRONG_SELL)
    ) {
      return SIGNALS.STRONG_BUY;
    }

    if (
      STRONG_SELL >= SIGNAL_RELIABILITY_THRESHOLDS.strong &&
      STRONG_SELL > Math.max(SELL, HOLD, BUY, STRONG_BUY)
    ) {
      return SIGNALS.STRONG_SELL;
    }

    // 3. Indecision between buy and sell
    if (BUY === SELL) {
      return SIGNALS.HOLD;
    }

    // 4. The buy signal is stronger than the hold and sell signals
    if (
      BUY >= SIGNAL_RELIABILITY_THRESHOLDS.moderate &&
      BUY > Math.max(HOLD, SELL)
    ) {
      return SIGNALS.BUY;
    }

    // 5. The sell signal is stronger than the hold and buy signals
    if (
      SELL >= SIGNAL_RELIABILITY_THRESHOLDS.moderate &&
      SELL > Math.max(HOLD, BUY)
    ) {
      return SIGNALS.SELL;
    }

    // 6. Signals are weak or contradict each other
    return SIGNALS.HOLD;
  }
}

module.exports = SignalSynthesizer;
