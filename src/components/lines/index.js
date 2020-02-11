import React, { useContext, useEffect, useCallback } from "react";
import { SvgElementsContext } from "globalState/svgElementsProvider/index";

function Lines() {
  // global state
  const { points, linePath, setLinePath } = useContext(SvgElementsContext);

  const createSVGPathString = useCallback((pointList) => {
    // consumes a list of objects [ {x:value, y:value}...]
    // outputs an SVG path d attribute, which is a string.
    // the result is that all the points in the pointList
    // are connected by lines.

    const newPoints = [...pointList];

    // add duplicate of first point to the end of the array
    if (newPoints.length > 0) newPoints.push(newPoints[0]);

    const result = newPoints.reduce((total, currentValue, currentIndex) => {
      if (currentIndex === 0) {
        return `M ${currentValue.x} ${currentValue.y}`;
      }

      return total + ` L ${currentValue.x} ${currentValue.y}`;
    }, "");
    setLinePath(result);
  },[setLinePath]);

  useEffect(() => {
    createSVGPathString(points);
  }, [points,createSVGPathString]);

  return <path stroke="#f53dff" fill="none" d={linePath} />;
}

export default Lines;
