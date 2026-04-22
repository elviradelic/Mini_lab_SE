class PercentageStrategy {
  calculate(score) {
    return `${score}%`;
  }
}

class PassFailStrategy {
  calculate(score) {
    return score >= 50 ? "Pass" : "Fail";
  }
}

module.exports = {
  PercentageStrategy,
  PassFailStrategy
};