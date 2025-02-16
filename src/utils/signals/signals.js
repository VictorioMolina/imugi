exports.SIGNALS = {
  STRONG_BUY: "STRONG_BUY",
  BUY: "BUY",
  HOLD: "HOLD",
  SELL: "SELL",
  STRONG_SELL: "STRONG_SELL",
};
exports.BEARISH_SIGNALS = [exports.SIGNALS.SELL, exports.SIGNALS.STRONG_SELL];
exports.BULLISH_SIGNALS = [exports.SIGNALS.BUY, exports.SIGNALS.STRONG_BUY];
exports.SIGNAL_WEIGHTS = {
  STRONG_BUY: 2.5,
  BUY: 2,
  HOLD: 1,
  SELL: 2,
  STRONG_SELL: 2.5,
};
exports.SIGNAL_RELIABILITY_THRESHOLDS = {
  strong: 0.7,
  moderate: 0.55,
};
