import React, { useState, useContext, useEffect, useCallback } from "react";
import { getMidpoints } from "./midpoints";
import { ControlStateContext } from "globalState/controlState/index";
import { getCentroids } from "./centroids";
import { createSvgString } from "./createSvgString";
import { createBlobPath } from "./createBlobPath";
import { getBounds } from "./getBounds";
import { adjustBlobPath } from "./adjustBlobPath";
export const PointsContext = React.createContext();
const fileDownload = require("js-file-download");
const _ = require("lodash");

function PointsProvider({ children }) {
  // global state
  const {
    toggleCanAdd,
    toggleShowLines,
    setDownloadPrompt,
    canAdd,
    setCanAdd,
    setShowLines,
    setInMoveMode,
    downloadPrompt,
    isOverCircle,
    setIsOverCircle,
    svgBackgroundRef,
    isOverMenu,
    isOverSvg,
    currentCircle,
    mouseDown,
    selectedCircle,
    setSelectedCircle
  } = useContext(ControlStateContext);

  // local state
  const [points, setPoints] = useState([]);
  const [midpoints, setMidpoints] = useState([]);

  const handleClearClick = () => {
    setPoints([]);
    setCanAdd(true);
    setShowLines(true);
    setDownloadPrompt(false);
    setInMoveMode(false);
  };

  const melt = useCallback(() => {
    const newPoints = getCentroids(points);
    setPoints(newPoints);
    setInMoveMode(false);
  },[setPoints,setInMoveMode,points]);

  const download = filename => {
    const { xMax, xMin, yMax, yMin } = getBounds(points);
    const blobPath = adjustBlobPath(points);
    const svgString = createSvgString(blobPath, xMax - xMin, yMax - yMin);
    const saveAsFilename = `${filename === "" ? "blob" : filename}.svg`;
    fileDownload(svgString, saveAsFilename);
  };

  useEffect(() => {
    setMidpoints(getMidpoints(points));
  }, [points,setMidpoints]);

  const deleteCircle = useCallback((i) => {
    if (i === null || i === undefined) return;
    if (downloadPrompt) return;
    const newCircles = [...points];
    newCircles.splice(i, 1);
    setSelectedCircle(null);
    setPoints(newCircles);
    setIsOverCircle(false);
  },[setSelectedCircle,setPoints,setIsOverCircle,downloadPrompt,points]);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === "Backspace" && !downloadPrompt) deleteCircle(selectedCircle);
      if (e.code === "Escape") setCanAdd(false);
      if (e.code === "KeyA" && !downloadPrompt) toggleCanAdd();
      if (e.code === "KeyS" && !downloadPrompt) toggleShowLines();
      if (e.code === "KeyD" && !downloadPrompt) setDownloadPrompt(true);
      if (e.code === "KeyX" && !downloadPrompt) deleteCircle(selectedCircle);
      if (e.code === "KeyM" && !downloadPrompt) melt();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
        selectedCircle,
        deleteCircle,
        toggleCanAdd,
        toggleShowLines,
        setDownloadPrompt,
        melt,
        setCanAdd,
        downloadPrompt
    ]);

  useEffect(() => {
    const addCircle = _.throttle(e => {
      const pointToAdd = {
        x: e.pageX,
        y: e.pageY - svgBackgroundRef.current.offsetTop
      };
      if (!isOverCircle && !isOverMenu && canAdd && isOverSvg) {
        setPoints(prevPoints => {
          if (selectedCircle === null) return [...prevPoints, pointToAdd];

          if (selectedCircle === prevPoints.length - 1) {
            setSelectedCircle(prevPoints.length);
            return [...prevPoints, pointToAdd];
          }

          const newPoints = [...prevPoints];
          setSelectedCircle(selectedCircle + 1);
          newPoints.splice(selectedCircle + 1, 0, pointToAdd);
          return newPoints;
        });
      }
    }, 40);

    window.addEventListener("click", addCircle);
    return () => window.removeEventListener("click", addCircle);
  }, [isOverCircle, canAdd, isOverMenu, selectedCircle, isOverSvg, points]);

  const updateCircle = (i, changes) => {
    const newCircles = [...points];
    newCircles[i] = { ...newCircles[i], ...changes };
    setPoints(newCircles);
  };

  useEffect(() => {
    const movePoint = _.throttle(e => {
      if (mouseDown && isOverSvg && !isOverMenu)
        updateCircle(currentCircle, {
          x: e.pageX,
          y: e.pageY - svgBackgroundRef.current.offsetTop
        });
    }, 40);

    window.addEventListener("mousemove", movePoint);
    return () => {
      window.removeEventListener("mousemove", movePoint);
    };
  }, [mouseDown, currentCircle, updateCircle, isOverSvg, isOverMenu]);

  const unHighlightAll = () => {
    setPoints(prevPoints => {
      return prevPoints.map(pc => {
        return { x: pc.x, y: pc.y, isHovering: false };
      });
    });
  };

  const value = {
    unHighlightAll,
    updateCircle,
    points,
    setPoints,
    createBlobPath,
    midpoints,
    getBounds,
    handleClearClick,
    download,
    melt
  };

  return (
    <PointsContext.Provider value={value}>{children}</PointsContext.Provider>
  );
}

export default PointsProvider;

