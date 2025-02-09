const { 
  SIGNALS,
  SIGNAL_WEIGHTS,
  WEAK_SIGNAL_THRESHOLD,
  STRONG_SIGNAL_THRESHOLD,
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
   * @returns {string} The final computed trading signal.
   */
  static compute(signals) {
    const scores = Object.values(SIGNALS).reduce(
      (acc, signal) => ({ ...acc, [signal]: 0 }),
      {}
    );

    let totalWeight = 0;

    for (const [indicator, signal] of Object.entries(signals)) {
      const indicatorWeight = INDICATOR_WEIGHTS[indicator] ?? 1;
      const signalWeight = SIGNAL_WEIGHTS[signal] ?? 0;

      scores[signal] += indicatorWeight * signalWeight;
      totalWeight += indicatorWeight;
    }

    return this.#resolveContradictions(scores, totalWeight);
  }

  /**
   * Resolves conflicts between multiple signals using a threshold-based
   * approach. The function normalizes scores to prevent bias from
   * dominant indicators.
   *
   * @private
   * @static
   * @param {object} scores - The score assigned to each signal type.
   * @param {number} totalWeight - The total weight of all indicators.
   * @returns {string} The final trading signal.
   */
  static #resolveContradictions(scores, totalWeight) {
    if (totalWeight === 0) { // Safety check
      return SIGNALS.HOLD;
    }

    // Normalize scores to ensure fair weighting
    const normalizedScores = Object.fromEntries(
      Object.entries(scores).map(([key, value]) => [key, value / totalWeight])
    );

    if (normalizedScores.STRONG_BUY > STRONG_SIGNAL_THRESHOLD) {
      return SIGNALS.STRONG_BUY;
    }

    if (normalizedScores.STRONG_SELL > STRONG_SIGNAL_THRESHOLD) {
      return SIGNALS.STRONG_SELL;
    }

    if (
      normalizedScores.BUY > normalizedScores.SELL &&
      normalizedScores.BUY > WEAK_SIGNAL_THRESHOLD
    ) {
      return SIGNALS.BUY;
    }

    if (
      normalizedScores.SELL > normalizedScores.BUY &&
      normalizedScores.SELL > WEAK_SIGNAL_THRESHOLD
    ) {
      return SIGNALS.SELL;
    }

    return SIGNALS.HOLD; // Default fallback
  }
}

module.exports = SignalSynthesizer;
