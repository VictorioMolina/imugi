const TradingPair = require("../pair");
const TAEngine = require("../ta-engine");
const { symbols, SIGNALS, MARKET_SENTIMENT } = require("../../utils");

/**
 * Handles market sentiment analysis and trade computation.
 *
 * @class
 */
class MarketBot {
  /**
   * Computes the market sentiment based on the trades and their signals.
   *
   * @static
   * @param {object[]} trades - List of trades to analyze.
   * @return {string} The market sentiment.
   */
  static computeSentiment(trades) {
    const bearishSignals = [SIGNALS.STRONG_SELL, SIGNALS.SELL];
    const bullishSignals = [SIGNALS.STRONG_BUY, SIGNALS.BUY];
    const neutralSignal = SIGNALS.HOLD;

    const shortsCount =
      trades.filter(({ signal }) => bearishSignals.includes(signal)).length;

    const longsCount =
      trades.filter(({ signal }) => bullishSignals.includes(signal)).length;

    const holdCount =
      trades.filter(({ signal }) => signal === neutralSignal).length;

    if (shortsCount > longsCount + holdCount) {
      return MARKET_SENTIMENT.BEARISH;
    }

    if (longsCount >= shortsCount) {
      return MARKET_SENTIMENT.BULLISH;
    }

    return MARKET_SENTIMENT.NEUTRAL;
  }

  /**
   * Computes the trades for a given interval by analyzing each symbol.
   *
   * @static
   * @async
   * @param {string} interval - The time interval to analyze (e.g., "1h").
   * @return {Promise<object[]>} A promise that fulfills with the
   *   trading analysis.
   */
  static async computeTrades(interval) {
    const results = await Promise.allSettled(
      symbols.map(
        (symbol) => this.computeTrade(symbol, interval)
      )
    );

    return results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);
  }

  /**
   * Computes a trade for the given symbol and time interval.
   *
   * @static
   * @async
   * @param {string} symbol - The trading pair symbol (e.g., "BTCUSDT").
   * @param {string} interval - The time interval to analyze (e.g., "1h").
   * @return {Promise<object>} A promise that fulfills with the computed trade.
   */
  static async computeTrade(symbol, interval) {
    const pair = new TradingPair(symbol, interval);

    await pair.initialize();

    const ta = new TAEngine(pair);

    return ta.analyze();
  }

  /**
   * Sorts an array of trades by score in descending order.
   *
   * @static
   * @param {object[]} trades - List of trades to be sorted.
   * @return {object[]} The sorted list of trades.
   */
  static sortTrades(trades) {
    return trades.sort((a, b) => b.score - a.score);
  }
}

module.exports = MarketBot;
