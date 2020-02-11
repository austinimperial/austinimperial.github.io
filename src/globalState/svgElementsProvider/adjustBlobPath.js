import { getBounds } from "./getBounds";
import { getMidpoints } from "./midpoints";
import { createBlobPath } from "./createBlobPath";

export const adjustBlobPath = points => {
  const { xMin, yMin } = getBounds(points);
  const newPoints = points.map(point => {
    return {
      x: point.x - xMin,
      y: point.y - yMin
    };
  });
  const midpoints = getMidpoints(newPoints);
  return createBlobPath(newPoints, midpoints);
};
