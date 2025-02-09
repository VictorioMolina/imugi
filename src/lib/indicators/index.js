const momentum = require("./momentum");
const trend = require("./trend");
const volatility = require("./volatility");

module.exports = {
  ...momentum,
  ...trend,
  ...volatility,
};
