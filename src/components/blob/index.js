import React, { useContext, useEffect } from "react";
import { SvgElementsContext } from "globalState/svgElementsProvider/index";
import { MoveContext } from 'globalState/move/index'

function Blob() {
  // global state
  const {
    points,
    midpoints,
    blobPath,
    setBlobPath,
    setIsOver,
    createBlobPath
  } = useContext(SvgElementsContext);
  const { inMoveMode, setMouseIsOverBlob } = useContext(MoveContext)

  const handleMouseEnter = () => {
    setIsOver(false)
    setMouseIsOverBlob(true)
  }

  useEffect(() => {
    setBlobPath(createBlobPath(points, midpoints));
  }, [midpoints, setBlobPath, createBlobPath]);

  return (
    <path
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setMouseIsOverBlob(false)}
      stroke={inMoveMode ? 'white' : 'black'}
      strokeWidth={inMoveMode ? '8' : '0'}
      fill="black"
      d={blobPath}
    />
  );
}

export default Blob;
