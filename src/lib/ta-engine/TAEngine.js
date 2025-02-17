/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
const {
  BULLISH_SIGNALS,
  BEARISH_SIGNALS,
  SIGNAL_WEIGHTS,
  INDICATOR_WEIGHTS,
  RSI_THRESHOLDS,
  ADX_THRESHOLDS,
  STOCH_RSI_THRESHOLDS,
  MACD_THRESHOLD,
} = require("../../utils");
const { clampScore, computeVolatility } = require("./helpers");

/**
 * Trading Analysis Engine (TAEngine) for evaluating trade opportunities.
 *
 * Computes stop-loss (SL), take-profit (TP), and a confidence score based on
 * multiple technical indicators.
 *
 * @class
 * @todo Refactoring: Use atomic helpers (DRY).
 * @todo Refactoring: Handle conditions as specific calculable properties of
 *   each indicator.
 */
class TAEngine {
  /**
   * Initializes the TAEngine for a given trading pair.
   *
   * @constructor
   * @param {object} tradingPair - Object containing trading pair data
   *   and indicators.
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
   * @param {number} [rrr=1/2] - The desired risk-reward ratio.
   * @return {object} Trade configuration with computed parameters.
   */
  analyze(rrr = 1 / 2) {
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
   * Computes the take-profit (TP) level based on EMA and market volatility.
   *
   * @private
   * @return {number} The calculated TP level.
   */
  #calculateTakeProfit() {
    const { lastPrice, signal, indicators } = this.tradingPair;
    const { ema, atr, bollinger } = indicators;
    const volatilityFactor = computeVolatility(atr.value, bollinger.value);

    if (BULLISH_SIGNALS.includes(signal)) {
      const origin = Math.max(lastPrice, ema.value);
      const tp = origin + volatilityFactor * atr.value;

      return Math.min(tp, bollinger.value.upperBand);
    }

    if (BEARISH_SIGNALS.includes(signal)) {
      const origin = Math.min(lastPrice, ema.value);
      const tp = origin - volatilityFactor * atr.value;

      return Math.max(tp, bollinger.value.lowerBand);
    }

    return lastPrice;
  }

  /**
   * Computes the stop-loss (SL) level to maintain a rational risk-reward ratio.
   *
   * @private
   * @param {number} [rrr=1/2] - The desired risk-reward ratio.
   * @return {number} The calculated SL level.
   */
  #calculateStopLoss(rrr = 1 / 2) {
    const { lastPrice, signal, indicators } = this.tradingPair;
    const { bollinger } = indicators;
    const tp = this.takeProfit;
    const tpDistance = Math.abs(tp - lastPrice);

    if (BULLISH_SIGNALS.includes(signal)) {
      const sl = lastPrice - tpDistance * rrr;

      return Math.max(sl, bollinger.value.lowerBand);
    }

    if (BEARISH_SIGNALS.includes(signal)) {
      const sl = lastPrice + tpDistance * rrr;

      return Math.min(sl, bollinger.value.upperBand);
    }

    return lastPrice;
  }

  /**
   * Computes a confidence score based on technical indicators and volatility.
   *
   * @private
   * @return {number} The final score (0-100).
   */
  #calculateScore() {
    const { lastPrice, signal, indicators } = this.tradingPair;
    const { ema, macd, adx, ichimoku, rsi, stochRSI, atr, bollinger } =
      indicators;

    const bullish = BULLISH_SIGNALS.includes(signal);
    const bearish = BEARISH_SIGNALS.includes(signal);

    const indicatorWeights = INDICATOR_WEIGHTS[this.tradingPair.interval];
    let score = SIGNAL_WEIGHTS[signal];

    // EMA
    if (
      bullish && lastPrice < ema.value ||
      bearish && lastPrice > ema.value
    ) {
      score += indicatorWeights.ema;
    }

    // MACD
    if (
      bullish && macd.value.histogram > MACD_THRESHOLD ||
      bearish && macd.value.histogram < -MACD_THRESHOLD
    ) {
      score += indicatorWeights.macd;
    }

    // ADX
    if (adx.value.adx >= ADX_THRESHOLDS.strongTrend) {
      score += indicatorWeights.adx;
    }

    // Ichimoku Cloud
    if (
      bullish &&
        lastPrice >
          Math.max(ichimoku.value.senkou.spanA, ichimoku.value.senkou.spanB) &&
        ichimoku.value.tenkanSen > ichimoku.value.kijunSen &&
        ichimoku.value.chikouSpan > ichimoku.value.kijunSen ||

      bearish &&
        lastPrice <
          Math.min(ichimoku.value.senkou.spanA, ichimoku.value.senkou.spanB) &&
        ichimoku.value.tenkanSen < ichimoku.value.kijunSen &&
        ichimoku.value.chikouSpan < ichimoku.value.kijunSen
    ) {
      score += indicatorWeights.ichimoku;
    }

    // RSI
    if (
      bullish && rsi.value <= RSI_THRESHOLDS.sold ||
      bearish && rsi.value >= RSI_THRESHOLDS.bought
    ) {
      score += indicatorWeights.rsi;
    }

    // Stochastic RSI
    if (
      bullish && stochRSI.value.stochRSI <= STOCH_RSI_THRESHOLDS.sold ||
      bearish && stochRSI.value.stochRSI >= STOCH_RSI_THRESHOLDS.bought
    ) {
      score += indicatorWeights.stochRSI;
    }

    // Bollinger
    if (
      bullish && lastPrice < bollinger.value.lowerBand ||
      bearish && lastPrice > bollinger.value.upperBand
    ) {
      score += indicatorWeights.bollinger;
    }

    // Volatility
    score += computeVolatility(atr.value, bollinger.value);

    return clampScore(score);
  }
}

module.exports = TAEngine;
