const getCentroid = (p1, p2, p3) => {
  return {
    x: (p1.x + p2.x + p3.x) / 3,
    y: (p1.y + p2.y + p3.y) / 3
  };
};

export const getCentroids = points => {
  let newPoints = [...points];
  const lastPoint = newPoints[newPoints.length - 1];
  newPoints = newPoints.map((point, i) => {
    if (i === 0) return getCentroid(lastPoint, point, newPoints[i + 1]);
    if (i === newPoints.length - 1)
      return getCentroid(newPoints[i - 1], point, newPoints[0]);
    return getCentroid(newPoints[i - 1], point, newPoints[i + 1]);
  });
  return newPoints;
};
