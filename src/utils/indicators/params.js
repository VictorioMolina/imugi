const indicatorParams = Object.freeze({
  "1s": {
    ema: {
      period: 5,
    },
    macd: {
      fastPeriod: 5,
      slowPeriod: 10,
      signalPeriod: 3,
    },
    adx: {
      period: 5,
    },
    rsi: {
      period: 5,
    },
    stochRSI: {
      rsiPeriod: 4,
      stochasticPeriod: 5,
      kPeriod: 3,
      dPeriod: 3,
    },
    atr: {
      period: 5,
    },
    bollinger: {
      period: 10,
      stdDev: 1.5,
    },
  },
  "1m": {
    ema: {
      period: 7,
    },
    macd: {
      fastPeriod: 7,
      slowPeriod: 12,
      signalPeriod: 4,
    },
    adx: {
      period: 7,
    },
    rsi: {
      period: 7,
    },
    stochRSI: {
      rsiPeriod: 6,
      stochasticPeriod: 7,
      kPeriod: 3,
      dPeriod: 3,
    },
    atr: {
      period: 7,
    },
    bollinger: {
      period: 10,
      stdDev: 1.6,
    },
  },
  "3m": {
    ema: {
      period: 8,
    },
    macd: {
      fastPeriod: 8,
      slowPeriod: 14,
      signalPeriod: 5,
    },
    adx: {
      period: 8,
    },
    rsi: {
      period: 8,
    },
    stochRSI: {
      rsiPeriod: 7,
      stochasticPeriod: 8,
      kPeriod: 3,
      dPeriod: 3,
    },
    atr: {
      period: 8,
    },
    bollinger: {
      period: 12,
      stdDev: 1.7,
    },
  },
  "5m": {
    ema: {
      period: 10,
    },
    macd: {
      fastPeriod: 10,
      slowPeriod: 18,
      signalPeriod: 6,
    },
    adx: {
      period: 9,
    },
    rsi: {
      period: 9,
    },
    stochRSI: {
      rsiPeriod: 8,
      stochasticPeriod: 10,
      kPeriod: 3,
      dPeriod: 3,
    },
    atr: {
      period: 9,
    },
    bollinger: {
      period: 12,
      stdDev: 1.8,
    },
  },
  "15m": {
    ema: {
      period: 14,
    },
    macd: {
      fastPeriod: 12,
      slowPeriod: 20,
      signalPeriod: 7,
    },
    adx: {
      period: 12,
    },
    rsi: {
      period: 12,
    },
    stochRSI: {
      rsiPeriod: 10,
      stochasticPeriod: 12,
      kPeriod: 3,
      dPeriod: 3,
    },
    atr: {
      period: 12,
    },
    bollinger: {
      period: 14,
      stdDev: 1.9,
    },
  },
  "30m": {
    ema: {
      period: 18,
    },
    macd: {
      fastPeriod: 14,
      slowPeriod: 26,
      signalPeriod: 9,
    },
    adx: {
      period: 15,
    },
    rsi: {
      period: 15,
    },
    stochRSI: {
      rsiPeriod: 12,
      stochasticPeriod: 14,
      kPeriod: 3,
      dPeriod: 3,
    },
    atr: {
      period: 15,
    },
    bollinger: {
      period: 16,
      stdDev: 2.0,
    },
  },
  "1h": {
    ema: {
      period: 24,
    },
    macd: {
      fastPeriod: 18,
      slowPeriod: 32,
      signalPeriod: 11,
    },
    adx: {
      period: 18,
    },
    rsi: {
      period: 18,
    },
    stochRSI: {
      rsiPeriod: 14,
      stochasticPeriod: 16,
      kPeriod: 3,
      dPeriod: 3,
    },
    atr: {
      period: 18,
    },
    bollinger: {
      period: 20,
      stdDev: 2.1,
    },
  },
  "2h": {
    ema: {
      period: 32,
    },
    macd: {
      fastPeriod: 24,
      slowPeriod: 48,
      signalPeriod: 16,
    },
    adx: {
      period: 22,
    },
    rsi: {
      period: 22,
    },
    stochRSI: {
      rsiPeriod: 18,
      stochasticPeriod: 20,
      kPeriod: 3,
      dPeriod: 3,
    },
    atr: {
      period: 22,
    },
    bollinger: {
      period: 24,
      stdDev: 2.2,
    },
  },
  "4h": {
    ema: {
      period: 40,
    },
    macd: {
      fastPeriod: 30,
      slowPeriod: 60,
      signalPeriod: 20,
    },
    adx: {
      period: 26,
    },
    rsi: {
      period: 26,
    },
    stochRSI: {
      rsiPeriod: 22,
      stochasticPeriod: 24,
      kPeriod: 3,
      dPeriod: 3,
    },
    atr: {
      period: 26,
    },
    bollinger: {
      period: 30,
      stdDev: 2.3,
    },
  },
  "6h": {
    ema: {
      period: 50,
    },
    macd: {
      fastPeriod: 40,
      slowPeriod: 80,
      signalPeriod: 25,
    },
    adx: {
      period: 30,
    },
    rsi: {
      period: 30,
    },
    stochRSI: {
      rsiPeriod: 28,
      stochasticPeriod: 30,
      kPeriod: 3,
      dPeriod: 3,
    },
    atr: {
      period: 30,
    },
    bollinger: {
      period: 35,
      stdDev: 2.4,
    },
  },
  "8h": {
    ema: {
      period: 60,
    },
    macd: {
      fastPeriod: 45,
      slowPeriod: 90,
      signalPeriod: 30,
    },
    adx: {
      period: 34,
    },
    rsi: {
      period: 34,
    },
    stochRSI: {
      rsiPeriod: 30,
      stochasticPeriod: 32,
      kPeriod: 3,
      dPeriod: 3,
    },
    atr: {
      period: 34,
    },
    bollinger: {
      period: 40,
      stdDev: 2.5,
    },
  },
  "12h": {
    ema: {
      period: 70,
    },
    macd: {
      fastPeriod: 50,
      slowPeriod: 100,
      signalPeriod: 35,
    },
    adx: {
      period: 40,
    },
    rsi: {
      period: 40,
    },
    stochRSI: {
      rsiPeriod: 35,
      stochasticPeriod: 36,
      kPeriod: 3,
      dPeriod: 3,
    },
    atr: {
      period: 40,
    },
    bollinger: {
      period: 50,
      stdDev: 2.6,
    },
  },
  "1d": {
    ema: {
      period: 100,
    },
    macd: {
      fastPeriod: 75,
      slowPeriod: 150,
      signalPeriod: 50,
    },
    adx: {
      period: 50,
    },
    rsi: {
      period: 50,
    },
    stochRSI: {
      rsiPeriod: 45,
      stochasticPeriod: 50,
      kPeriod: 3,
      dPeriod: 3,
    },
    atr: {
      period: 50,
    },
    bollinger: {
      period: 60,
      stdDev: 2.8,
    },
  },
  "3d": {
    ema: {
      period: 150,
    },
    macd: {
      fastPeriod: 120,
      slowPeriod: 240,
      signalPeriod: 80,
    },
    adx: {
      period: 60,
    },
    rsi: {
      period: 60,
    },
    stochRSI: {
      rsiPeriod: 55,
      stochasticPeriod: 60,
      kPeriod: 3,
      dPeriod: 3,
    },
    atr: {
      period: 60,
    },
    bollinger: {
      period: 70,
      stdDev: 2.9,
    },
  },
  "1w": {
    ema: {
      period: 200,
    },
    macd: {
      fastPeriod: 150,
      slowPeriod: 300,
      signalPeriod: 100,
    },
    adx: {
      period: 70,
    },
    rsi: {
      period: 70,
    },
    stochRSI: {
      rsiPeriod: 65,
      stochasticPeriod: 70,
      kPeriod: 3,
      dPeriod: 3,
    },
    atr: {
      period: 70,
    },
    bollinger: {
      period: 80,
      stdDev: 3.0,
    },
  },
});

module.exports = indicatorParams;
