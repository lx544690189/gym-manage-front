// Generate four random hex digits.
const S4 = function () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
// 生成uuid
const guid = function () {
  return (`${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`);
};

module.exports = {
  guid,
};