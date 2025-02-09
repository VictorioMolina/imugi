exports.EMA_THRESHOLD = (price) => price * 0.02;
exports.MACD_THRESHOLD = 0.05;
exports.ADX_THRESHOLDS = {
  strongTrend: 40,
  moderateTrend: 30,
  weakTrend: 20,
};
exports.RSI_THRESHOLDS = {
  strongBuy: 25,
  buy: 35,
  sell: 65,
  strongSell: 75,
};
exports.STOCH_RSI_THRESHOLDS = {
  oversold: 25,
  overbought: 75,
  strongOversold: 10,
  crossover: 15,
};
exports.BOLLINGER_BANDS_THRESHOLD = 0.15;
exports.INDICATOR_WEIGHTS = {
  ema: 2.5,
  macd: 2.5,
  adx: 1,
  rsi: 2,
  stochRSI: 0.5,
  bollinger: 1.5,
};
