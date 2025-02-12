const { extractPriceLevels } = require("./helpers");
const { indicatorParams } = require("../../utils");
const { fetchTradingPair } = require("../../services/binance/api/pairs");
const SignalSynthesizer = require("./SignalSynthesizer");
const {
  EMA,
  MACD,
  ADX,
  ATR,
  RSI,
  StochasticRSI,
  BollingerBands,
} = require("../indicators");

/**
 * Represents a trading pair, encapsulating its market data and indicators
 * for technical analysis.
 *
 * @class
 */
class TradingPair {
  #indicatorParams;
  #initialized;

  /**
   * @constructor
   * @param {string} symbol - The trading pair symbol (e.g., "BTCUSDT").
   * @param {string} [interval="1h"] - The candlestick interval.
   */
  constructor(symbol, interval = "1h") {
    this.symbol = symbol;
    this.interval = interval;
    this.avgPrice = undefined;
    this.lastPrice = undefined;
    this.closes = [];
    this.highs = [];
    this.lows = [];
    this.indicators = {};
    this.signal = undefined;
    this.#indicatorParams = indicatorParams[interval];
    this.#initialized = false;
  }

  /**
   * Initializes the trading pair by fetching market data and
   * setting up indicators.
   *
   * @async
   * @return {Promise<void>}
   * @throws Cannot initialize a trading pair twice.
   */
  async initialize() {
    if (this.#initialized) {
      throw new Error("Cannot initialize a trading pair twice.");
    }

    // Fetch the pair data from Binance
    const { avgPrice, lastPrice, candles } = await fetchTradingPair(
      this.symbol,
      this.interval
    );

    // Extract all price levels
    const { closes, highs, lows } = extractPriceLevels(candles);

    // Initialization
    this.avgPrice = avgPrice;
    this.lastPrice = lastPrice;
    this.closes = closes;
    this.highs = highs;
    this.lows = lows;
    this.#initializeIndicators();
    this.#synthesizeSignal();
    this.#initialized = true;
  }

  /**
   * Initializes trend-based indicators.
   *
   * @private
   * @return {void}
   */
  #initializeTrendIndicators() {
    const { ema, macd, adx } = this.#indicatorParams;

    this.indicators.ema = new EMA(this.closes, ema);
    this.indicators.macd = new MACD(this.closes, macd);
    this.indicators.adx = new ADX(this.closes, this.highs, this.lows, adx);
  }

  /**
   * Initializes momentum-based indicators.
   *
   * @private
   * @return {void}
   */
  #initializeMomentumIndicators() {
    const { rsi, stochRSI } = this.#indicatorParams;

    this.indicators.rsi = new RSI(this.closes, rsi);
    this.indicators.stochRSI = new StochasticRSI(this.closes, stochRSI);
  }

  /**
   * Initializes volatility-based indicators.
   *
   * @private
   * @return {void}
   */
  #initializeVolatilityIndicators() {
    const { atr, bollinger } = this.#indicatorParams;

    this.indicators.atr = new ATR(this.closes, this.highs, this.lows, atr);
    this.indicators.bollinger = new BollingerBands(this.closes, bollinger);
  }

  /**
   * Initializes all indicators for the trading pair.
   *
   * @private
   * @return {void}
   */
  #initializeIndicators() {
    this.#initializeTrendIndicators();
    this.#initializeMomentumIndicators();
    this.#initializeVolatilityIndicators();
  }

  /**
   * Synthesizes the final trading signal from individual technical indicators.
   *
   * @private
   * @return {void}
   */
  #synthesizeSignal() {
    const signals = {
      ema: this.indicators.ema.signal(this.lastPrice),
      macd: this.indicators.macd.signal(),
      adx: this.indicators.adx.signal(),
      rsi: this.indicators.rsi.signal(),
      stochRSI: this.indicators.stochRSI.signal(),
      bollinger: this.indicators.bollinger.signal(this.lastPrice),
    };

    this.signal = SignalSynthesizer.compute(signals);
  }
}

module.exports = TradingPair;
