export const getScreenSizes = sizeInPixels => {
  const sizeRanges = {
    xxs: [0, 468],
    xs: [468, 576],
    sm: [576, 768],
    md: [768, 992],
    lg: [992, 1200],
    xl: [1200, 100000]
  };
  const sizes = { ...sizeRanges };
  const sizeRangesEntries = Object.entries(sizeRanges);
  sizeRangesEntries.forEach(sr => {
    sr[1][0] < sizeInPixels && sizeInPixels <= sr[1][1]
      ? (sizes[sr[0]] = true)
      : (sizes[sr[0]] = false);
  });
  return sizes;
};
