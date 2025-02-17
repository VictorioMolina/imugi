/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
exports.EMA_THRESHOLD = (price) => price * 0.02;
exports.MACD_THRESHOLD = 0.05;
exports.BOLLINGER_ZONE_THRESHOLD = 0.1;
exports.ADX_THRESHOLDS = {
  strongTrend: 40,
  moderateTrend: 30,
  weakTrend: 20,
};
exports.RSI_THRESHOLDS = {
  oversold: 25,
  sold: 35,
  bought: 65,
  overbought: 75,
};
exports.STOCH_RSI_THRESHOLDS = {
  oversold: 10,
  sold: 25,
  bought: 75,
  overbought: 90,
};
exports.INDICATOR_WEIGHTS = {
  "1s": { ema: 1.2, macd: 1.4, adx: 1.1, ichimoku: 0.6, rsi: 2.2, stochRSI: 2.5, bollinger: 1 },
  "1m": { ema: 1.5, macd: 1.3, adx: 1.2, ichimoku: 0.7, rsi: 2.1, stochRSI: 2.3, bollinger: 0.9 },
  "3m": { ema: 1.7, macd: 1.5, adx: 1.4, ichimoku: 0.8, rsi: 1.9, stochRSI: 2, bollinger: 0.7 },
  "5m": { ema: 1.9, macd: 1.6, adx: 1.5, ichimoku: 1, rsi: 1.7, stochRSI: 1.8, bollinger: 0.5 },
  "15m": { ema: 2.2, macd: 1.7, adx: 1.6, ichimoku: 1.1, rsi: 1.5, stochRSI: 1.6, bollinger: 0.3 },
  "30m": { ema: 2.4, macd: 1.8, adx: 1.7, ichimoku: 1.3, rsi: 1.3, stochRSI: 1.2, bollinger: 0.3 },
  "1h": { ema: 2.3, macd: 1.8, adx: 1.3, ichimoku: 1.6, rsi: 1.1, stochRSI: 1, bollinger: 0.9 },
  "2h": { ema: 2.2, macd: 2, adx: 1.9, ichimoku: 1.5, rsi: 1, stochRSI: 0.7, bollinger: 0.7 },
  "4h": { ema: 2.3, macd: 2, adx: 1.7, ichimoku: 1.9, rsi: 1, stochRSI: 0.7, bollinger: 0.4 },
  "6h": { ema: 2.8, macd: 2, adx: 1.8, ichimoku: 1.7, rsi: 0.9, stochRSI: 0.7, bollinger: 0.1 },
  "8h": { ema: 2.5, macd: 2.3, adx: 1.7, ichimoku: 1.9, rsi: 0.8, stochRSI: 0.6, bollinger: 0.2 },
  "12h": { ema: 2.6, macd: 2.1, adx: 1.9, ichimoku: 2, rsi: 0.6, stochRSI: 0.5, bollinger: 0.3 },
  "1d": { ema: 2.7, macd: 1.7, adx: 2.1, ichimoku: 2.2, rsi: 0.6, stochRSI: 0.5, bollinger: 0.2 },
  "3d": { ema: 3, macd: 2, adx: 1.9, ichimoku: 2, rsi: 0.5, stochRSI: 0.4, bollinger: 0.2 },
  "1w": { ema: 3, macd: 2, adx: 1.9, ichimoku: 2.5, rsi: 0.3, stochRSI: 0.2, bollinger: 0.1 },
};
