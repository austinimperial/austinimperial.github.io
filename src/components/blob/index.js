import React, { useContext, useEffect } from "react";
import { SvgElementsContext } from "globalState/svgElementsProvider/index";

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

  useEffect(() => {
    setBlobPath(createBlobPath(points, midpoints));
  }, [midpoints,setBlobPath,createBlobPath]);

  return (
    <path
      onMouseEnter={() => setIsOver(false)}
      stroke="black"
      fill="black"
      d={blobPath}
    />
  );
}

export default Blob;
