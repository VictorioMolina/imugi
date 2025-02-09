const global = require("./global");
const indicators = require("./indicators");
const market = require("./market");
const signals = require("./signals");

module.exports = {
  ...global,
  ...indicators,
  ...market,
  ...signals,
};
