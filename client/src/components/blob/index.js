import React, { useContext, useEffect } from "react";
import { ControlStateContext } from "globalState/controlState/index";
import { PointsContext } from "globalState/points/index";
import { MoveContext } from "globalState/move/index";

function Blob() {
  // global state
  const { blobPath, setBlobPath, setIsOverCircle, inMoveMode } = useContext(ControlStateContext);
  const { setMouseIsOverBlob } = useContext(MoveContext);
  const { createBlobPath, midpoints, points } = useContext(PointsContext);

  const handleMouseEnter = () => {
    setIsOverCircle(false);
    setMouseIsOverBlob(true);
  };

  useEffect(() => {
    setBlobPath(createBlobPath(points, midpoints));
  }, [midpoints, setBlobPath, createBlobPath]);

  return (
    <path
      onMouseDown={handleMouseEnter}
      onMouseUp={() => setMouseIsOverBlob(false)}
      stroke={inMoveMode ? "white" : "black"}
      strokeWidth={inMoveMode ? "8" : "0"}
      fill="black"
      d={blobPath}
    />
  );
}

export default Blob;
