/**
 * Clamps the score to be between 0 and 100, and limits it to two
 * decimal places.
 *
 * @param {number} score - The score to be adjusted.
 * @return {number} The clamped score.
 */
module.exports = (score) => {
  const adjustedScore = Math.min(100, score * 10);

  return parseFloat(adjustedScore.toFixed(2));
};
