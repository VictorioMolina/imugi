/**
 * Static class for logging various types of information, including the
 * software description, market sentiment, and trade details, in a structured
 * format.
 *
 * @class
 */
class Logger {
  /**
   * Logs a banner with the software description.
   * 
   * @static
   * @returns {void}
   */
  static logBanner() {
    console.log("\n                              ______________                               ");
    console.log("                        ,===:'.,            `-._                           ");
    console.log("                                 `:.`---.__         `-._                       ");
    console.log("                                 `:.     `--.         `.                     ");
    console.log("                                 \\        `.         `.                   ");
    console.log("                         (,,(,    \\        `.   ____,-`.            ");
    console.log("                      (,'     `/   \\   ,--.___`.'                         ");
    console.log("                  ,  ,'  ,--.  `,   \\.;'         `                         ");
    console.log("                   `{D, {    \\  :    \\;                                    ");
    console.log("                     V,,'    /  /    //                                    ");
    console.log("                     j;;    /  ,' ,-//.    ,---.      ,                    ");
    console.log("                     \\;'   /  ,' /  _  \\  /  _  \\   ,'/                    ");
    console.log("                           \\   `'  / \\  `'  / \\  `.' /                     ");
    console.log("                            `.___,'   `.__,'   `.__,'  \n\n\n");
    console.log("                                Welcome to IMUGI");
    console.log("                  Real-time crypto market analysis and signals.");
    console.log("      Analyzes multiple trading pairs and provides trading recommendations.\n\n");
  }


  /**
   * Logs a table with the market sentiment and the selected interval.
   *
   * @static
   * @param {string} interval - The time interval (e.g., '1h', '30m', '5m').
   * @param {string} marketSentiment - The current market sentiment.
   * @returns {void}
   */
  static logSentiment(interval, marketSentiment) {
    console.log("+----------------------+----------------------+");
    console.log("| Interval             | Market Sentiment     |");
    console.log("+----------------------+----------------------+");
    console.log(`| ${interval.padEnd(20)} | ${marketSentiment.padEnd(20)} |`);
    console.log("+----------------------+----------------------+\n");
  }

  /**
   * Logs detailed trade information in a formatted table.
   *
   * @static
   * @param {object} trade - The trade object containing trade information.
   * @returns {void}
   */
  static logTrade(trade) {
    console.log("+----------------------+----------------------+");
    console.log(`| Symbol               | ${trade.symbol.padEnd(20)} |`);
    console.log("+----------------------+----------------------+");
    console.log(`| Signal               | ${trade.signal.padEnd(20)} |`);
    console.log("+----------------------+----------------------+");
    console.log(`| Score                | ${(trade.score + "/100").padEnd(20)} |`);
    console.log("+----------------------+----------------------+");
    console.log(`| Last Price           | ${trade.lastPrice.toFixed(5).padEnd(20)} |`);
    console.log("+----------------------+----------------------+");
    console.log(`| Avg Price            | ${trade.avgPrice.toFixed(5).padEnd(20)} |`);
    console.log("+----------------------+----------------------+");
    console.log(`| Take Profit          | ${trade.takeProfit.toFixed(5).padEnd(20)} |`);
    console.log("+----------------------+----------------------+");
    console.log(`| Stop Loss            | ${trade.stopLoss.toFixed(5).padEnd(20)} |`);
    console.log("+----------------------+----------------------+\n");
  }

  /**
   * Logs all the given trades.
   * 
   * @static
   * @param {object[]} trades - List of trades to be logged.
   * @returns {void}
   */
  static logTrades(trades) {
    trades.forEach(Logger.logTrade);
  }
}

module.exports = Logger;
