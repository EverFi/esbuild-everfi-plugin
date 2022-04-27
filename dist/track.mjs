let _startedAt;
function zeros(value, fixed) {
  const fixedValue = value.toFixed(fixed);
  if (value < 10) {
    return `00${fixedValue}`;
  }
  if (value < 100) {
    return `0${fixedValue}`;
  }
  return fixedValue;
}
function track() {
  if (typeof _startedAt === "undefined") {
    _startedAt = Date.now();
  }
  const value = (Date.now() - _startedAt) / 1e3;
  return `[${zeros(value, 2)}]`;
}
export {
  track
};
//# sourceMappingURL=track.mjs.map
