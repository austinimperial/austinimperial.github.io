import React, { useContext, useEffect, useState, useCallback } from "react";
import { SvgElementsContext } from "globalState/svgElementsProvider/index";
const _ = require("lodash");

function GuideLines() {
  // global state
  const { points, selectedCircle, isOverMenu, isOverSvg } = useContext(SvgElementsContext);

  // local state
  const [cursorCoords, setCursorCoords] = useState(null);

  useEffect(() => {
    const handleMouseMove = _.throttle(e => {
      setCursorCoords({ x: e.layerX, y: e.layerY });
    }, 35);

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const getNextCircleIndex = useCallback(() => {
    if (selectedCircle === null) return points.length - 1;
    if (selectedCircle === points.length - 1) return 0;
    return selectedCircle + 1;
  }, [points, selectedCircle]);

  if (points.length < 2 || isOverMenu || !isOverSvg || cursorCoords === null ) return <></>;

  return (
    <path
      d={`
                M 
                ${points[selectedCircle === null ? 0 : selectedCircle].x} 
                ${points[selectedCircle === null ? 0 : selectedCircle].y} 
                L 
                ${cursorCoords.x}
                ${cursorCoords.y}
                L 
                ${points[getNextCircleIndex()].x}
                ${points[getNextCircleIndex()].y}
            `}
      stroke="#f53dff"
      strokeDasharray="10,10"
    />
  );
}

export default GuideLines;
