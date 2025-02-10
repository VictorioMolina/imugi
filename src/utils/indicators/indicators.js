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
  ema: 2.5,
  macd: 2.5,
  adx: 1,
  rsi: 2,
  stochRSI: 0.5,
  bollinger: 1.5,
};
