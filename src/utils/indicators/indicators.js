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
  ema: 1,
  macd: 1.8,
  adx: 1,
  ichimoku: 2.2,
  rsi: 1.7,
  stochRSI: 1.2,
  bollinger: 1.1,
};
