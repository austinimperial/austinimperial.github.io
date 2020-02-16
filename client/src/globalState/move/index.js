import React, { useContext, useState, useEffect, useCallback } from "react";
import { ControlStateContext } from "globalState/controlState/index";
import { PointsContext } from "globalState/points/index";
import { throttle } from "lodash";
export const MoveContext = React.createContext();

function MoveProvider({ children }) {
  // global state
  const {
    setCanAdd,
    setShowLines,
    mouseDown,
    inMoveMode,
    setInMoveMode,
    setSelectedCircle
  } = useContext(ControlStateContext);
  const { points, setPoints } = useContext(PointsContext);

  // local state
  const [mouseIsOverBlob, setMouseIsOverBlob] = useState(false);
  const [diffs, setDiffs] = useState([]);

  const toggleInMoveMode = () => {
    setInMoveMode(prevInMoveMode => !prevInMoveMode);
    setCanAdd(prevCanAdd => (prevCanAdd ? false : prevCanAdd));
    setShowLines(prevShowLines => (prevShowLines ? false : prevShowLines));
    setSelectedCircle(null);
  };

  const handleMouseDown = useCallback(
    e => {
      const diffs = points.map(point => {
        return { x: point.x - e.pageX, y: point.y - e.pageY };
      });
      setDiffs(diffs);
    },
    [points]
  );

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    return () => window.removeEventListener("mousedown", handleMouseDown);
  }, [handleMouseDown]);

  const moveBlob = useCallback(
    throttle(e => {
      if (inMoveMode && mouseDown && mouseIsOverBlob) {
        const newPoints = diffs.map((diff, i) => {
          return {
            x: e.pageX + diffs[i].x,
            y: e.pageY + diffs[i].y
          };
        });
        setPoints(newPoints);
      }
    }, 20),
    [mouseIsOverBlob, mouseDown, inMoveMode, setPoints, diffs]
  );

  useEffect(() => {
    window.addEventListener("mousemove", moveBlob);
    return () => {
      window.removeEventListener("mousemove", moveBlob);
    };
  }, [moveBlob]);

  const value = {
    inMoveMode,
    setInMoveMode,
    toggleInMoveMode,
    mouseIsOverBlob,
    setMouseIsOverBlob
  };

  return <MoveContext.Provider value={value}>{children}</MoveContext.Provider>;
}

export default MoveProvider;
