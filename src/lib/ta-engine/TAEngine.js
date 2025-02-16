const {
  SIGNALS,
  SIGNAL_WEIGHTS,
  INDICATOR_WEIGHTS,
  RSI_THRESHOLDS,
  ADX_THRESHOLDS,
  STOCH_RSI_THRESHOLDS,
  MACD_THRESHOLD,
} = require("../../utils");
const {
  clampScore,
  computePriceMovement,
  computeVolatility,
} = require("./helpers");

/**
 * Trading Analysis Engine (TAEngine) for evaluating trade opportunities.
 *
 * Computes stop-loss (SL), take-profit (TP), and a confidence score based on
 * multiple technical indicators.
 *
 * @class
 * @todo Compute TP and SL in a dynamic and mathematically correct way.
 */
class TAEngine {
  /**
   * Initializes the TAEngine for a given trading pair.
   *
   * @constructor
   * @param {object} tradingPair - Object containing trading pair data and indicators.
   */
  constructor(tradingPair) {
    this.tradingPair = tradingPair;
    this.takeProfit = 0;
    this.stopLoss = 0;
    this.score = 0;
  }

  /**
   * Analyzes the trading pair and calculates TP, SL, and score.
   *
   * @param {number} [rrr=3/2] - The risk-reward ratio.
   * @returns {object} Trade configuration with computed parameters.
   */
  analyze(rrr = 3 / 2) {
    this.takeProfit = this.#calculateTakeProfit();
    this.stopLoss = this.#calculateStopLoss(rrr);
    this.score = this.#calculateScore();

    return {
      symbol: this.tradingPair.symbol,
      interval: this.tradingPair.interval,
      lastPrice: this.tradingPair.lastPrice,
      avgPrice: this.tradingPair.avgPrice,
      signal: this.tradingPair.signal,
      takeProfit: this.takeProfit,
      stopLoss: this.stopLoss,
      score: this.score,
    };
  }

  /**
   * Computes the take-profit (TP) level based on ATR and market volatility.
   *
   * @private
   * @returns {number} The calculated TP level.
   */
  #calculateTakeProfit() {
    const { lastPrice, signal, indicators } = this.tradingPair;
    const { atr, bollinger } = indicators;
    const volatility = computeVolatility(atr.value, bollinger.value);
    const delta = computePriceMovement(atr.value, volatility);
    const bullishSignals = [SIGNALS.BUY, SIGNALS.STRONG_BUY];

    if (signal === SIGNALS.HOLD) {
      return lastPrice;
    }

    if (bullishSignals.includes(signal)) {
      return Math.max(lastPrice + delta, 0);
    }

    return Math.max(lastPrice - delta, 0);
  }

  /**
   * Computes the stop-loss (SL) level to maintain a rational risk-reward ratio.
   *
   * @private
   * @param {number} [rrr=3/2] - The risk-reward ratio.
   * @returns {number} The calculated SL level.
   */
  #calculateStopLoss(rrr = 3 / 2) {
    const { lastPrice, signal } = this.tradingPair;
    const delta = Math.abs(this.takeProfit - lastPrice) / rrr;
    const bullishSignals = [SIGNALS.BUY, SIGNALS.STRONG_BUY];

    if (signal === SIGNALS.HOLD) {
      return lastPrice;
    }

    if (bullishSignals.includes(signal)) {
      return Math.max(lastPrice - delta, 0);
    }

    return Math.max(lastPrice + delta, 0);
  }

  /**
   * Computes a confidence score based on technical indicators and volatility.
   *
   * @private
   * @returns {number} The final score (0-100).
   */
  #calculateScore() {
    const { lastPrice, signal, indicators } = this.tradingPair;
    const { ema, macd, adx, ichimoku, rsi, stochRSI, atr, bollinger } =
      indicators;

    const bullishSignals = [SIGNALS.BUY, SIGNALS.STRONG_BUY];
    const bearishSignals = [SIGNALS.SELL, SIGNALS.STRONG_SELL];
    const bullish = bullishSignals.includes(signal);
    const bearish = bearishSignals.includes(signal);

    let score = SIGNAL_WEIGHTS[signal];

    // EMA
    if (
      (bullish && lastPrice < ema.value) ||
      (bearish && lastPrice > ema.value)
    ) {
      score += INDICATOR_WEIGHTS.ema;
    }

    // MACD
    if (
      (bullish && macd.value.histogram > MACD_THRESHOLD) ||
      (bearish && macd.value.histogram < -MACD_THRESHOLD)
    ) {
      score += INDICATOR_WEIGHTS.macd;
    }

    // ADX
    if (adx.value.adx >= ADX_THRESHOLDS.strongTrend) {
      score += INDICATOR_WEIGHTS.adx;
    }

    // Ichimoku Cloud
    if (
      (bullish &&
        lastPrice >
          Math.max(ichimoku.value.senkou.spanA, ichimoku.value.senkou.spanB) &&
        ichimoku.value.tenkanSen > ichimoku.value.kijunSen &&
        ichimoku.value.chikouSpan > ichimoku.value.kijunSen) ||
      (bearish &&
        lastPrice <
          Math.min(ichimoku.value.senkou.spanA, ichimoku.value.senkou.spanB) &&
        ichimoku.value.tenkanSen < ichimoku.value.kijunSen &&
        ichimoku.value.chikouSpan < ichimoku.value.kijunSen)
    ) {
      score += INDICATOR_WEIGHTS.ichimoku;
    }

    // RSI
    if (
      (bullish && rsi.value <= RSI_THRESHOLDS.sold) ||
      (bearish && rsi.value >= RSI_THRESHOLDS.bought)
    ) {
      score += INDICATOR_WEIGHTS.rsi;
    }

    // Stochastic RSI
    if (
      (bullish && stochRSI.value.stochRSI <= STOCH_RSI_THRESHOLDS.sold) ||
      (bearish && stochRSI.value.stochRSI >= STOCH_RSI_THRESHOLDS.bought)
    ) {
      score += INDICATOR_WEIGHTS.stochRSI;
    }

    // Bollinger
    if (
      (bullish && lastPrice < bollinger.value.lowerBand) ||
      (bearish && lastPrice > bollinger.value.upperBand)
    ) {
      score += INDICATOR_WEIGHTS.bollinger;
    }

    // Volatility
    score += computeVolatility(atr.value, bollinger.value);

    return clampScore(score);
  }
}

module.exports = TAEngine;
