/* eslint-disable padding-line-between-statements */
const express = require("express");
const app = express();
const port = 3000;

const { symbols, sleep } = require("./utils");
const Logger = require("./lib/logger");
const MarketBot = require("./lib/bot");

app.get("/signals", async (req, res) => {
  const { interval = "1h" } = req.query;

  try {
    console.clear();

    Logger.logBanner();

    console.log(`🔥 Concurrently analyzing ${symbols.length} pairs\n`);
    await sleep(1000);

    console.log("🔥 Sipping some coffee while analyzing trades\n");
    const trades = await MarketBot.computeTrades(interval);

    console.log("🔥 Checking the current market sentiment\n");
    const marketSentiment = MarketBot.computeSentiment(trades);
    await sleep(1000);

    Logger.logSentiment(interval, marketSentiment);
    await sleep(2500);

    console.log("🔥 Sorting trades like a pro\n");
    MarketBot.sortTrades(trades);
    await sleep(500);

    console.log("🔥 Let the good trades roll!\n");
    await sleep(1500);
    Logger.logTrades(trades);

    res.json({ success: true });
  } catch (error) {
    console.error("Error generating crypto signals:", error);

    res.status(500).json({
      success: false,
      error: "Failed to generate signals",
    });
  }
});

app.listen(port, () => console.log(`Running on http://localhost:${port}`));
