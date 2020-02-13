import React, { useState, useEffect } from "react";
import { getMidpoints } from "./midpoints";
import { getCentroids } from "./centroids";
import { createBlobPath } from "./createBlobPath";
import { getBounds } from "./getBounds";
import { adjustBlobPath } from "./adjustBlobPath";
import { createSvgString } from "./createSvgString";
export const SvgElementsContext = React.createContext();
const _ = require("lodash");
const fileDownload = require("js-file-download");

function SvgElementsProvider({ children }) {

  // local state
  const [points, setPoints] = useState([]);
  const [midpoints, setMidpoints] = useState([]);
  const [blobPath, setBlobPath] = useState("");
  const [mouseDown, setMouseDown] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [isOverMenu, setIsOverMenu] = useState(false);
  const [isOverSvg,setIsOverSvg] = useState(false)
  const [currentCircle, setCurrentCircle] = useState(null);
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [linePath, setLinePath] = useState("");
  const [canAdd, setCanAdd] = useState(true);
  const [showLines, setShowLines] = useState(true);
  const [downloadPrompt, setDownloadPrompt] = useState(false);
  const [inMoveMode,setInMoveMode] = useState(false)

  useEffect(() => {
    setMidpoints(getMidpoints(points));
  }, [points]);

  const deleteCircle = i => {
    if (i === null || i === undefined) return;
    if (downloadPrompt) return;
    const newCircles = [...points];
    newCircles.splice(i, 1);
    setSelectedCircle(null);
    setPoints(newCircles);
    setIsOver(false);
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === "Backspace") deleteCircle(selectedCircle);
      if (e.code === 'Escape') setCanAdd(false)
      if (e.code === 'KeyA' && !downloadPrompt) toggleCanAdd()
      if (e.code === 'KeyS' && !downloadPrompt) toggleShowLines()
      if (e.code === 'KeyD' && !downloadPrompt) setDownloadPrompt(true)
      if (e.code === 'KeyX' && !downloadPrompt) deleteCircle(selectedCircle)
      if (e.code === 'KeyM' && !downloadPrompt) melt()
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCircle, deleteCircle]);

  useEffect(() => {
    const addCircle = _.throttle(e => {
      const pointToAdd = { x: e.offsetX, y: e.offsetY }
      if (!isOver && !isOverMenu && canAdd && isOverSvg) {
        setPoints(prevPoints => {
          if (selectedCircle === null)
            return [...prevPoints, pointToAdd];

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
  }, [isOver, canAdd, isOverMenu, selectedCircle, isOverSvg]);

  const updateCircle = (i, changes) => {
    const newCircles = [...points];
    newCircles[i] = { ...newCircles[i], ...changes };
    setPoints(newCircles);
  };

  useEffect(() => {
    const move = _.throttle(e => {
      if (mouseDown && isOverSvg && !isOverMenu)
        updateCircle(currentCircle, { x: e.offsetX, y: e.offsetY });
    }, 40);

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseDown, currentCircle, updateCircle, isOverSvg, isOverMenu]);

  const unHighlightAll = () => {
    setPoints(prevPoints => {
      return prevPoints.map(pc => {
        return { x: pc.x, y: pc.y, isHovering: false };
      });
    });
  };

  const handleClearClick = () => {
    setPoints([]);
    setCanAdd(true);
    setShowLines(true);
    setDownloadPrompt(false);
    setInMoveMode(false)
  };

  const toggleShowLines = () => {
    setShowLines(prevShowLines => !prevShowLines);
    setCanAdd(prevCanAdd => (prevCanAdd ? false : prevCanAdd));
    setInMoveMode(false)
  };

  const toggleCanAdd = () => {
    setCanAdd(prevCanAdd => !prevCanAdd);
    setShowLines(prevShowLines => (!prevShowLines ? true : prevShowLines));
    setInMoveMode(false)
  };

  const toggleDownloadPrompt = () => {
    setDownloadPrompt(prevDownloadPrompt => !prevDownloadPrompt);
    setCanAdd(prevCanAdd => (prevCanAdd ? false : prevCanAdd));
    setInMoveMode(false)
  };

  const melt = () => {
    const newPoints = getCentroids(points);
    setPoints(newPoints);
    setInMoveMode(false)
  };

  const download = filename => {
    const { xMax, xMin, yMax, yMin } = getBounds(points);
    const blobPath = adjustBlobPath(points);
    const svgString = createSvgString(blobPath, xMax - xMin, yMax - yMin);
    const saveAsFilename = `${filename === "" ? "blob" : filename}.svg`;
    fileDownload(svgString, saveAsFilename);
  };

  const value = {
    points,
    setPoints,
    mouseDown,
    setMouseDown,
    isOver,
    setIsOver,
    currentCircle,
    setCurrentCircle,
    selectedCircle,
    setSelectedCircle,
    unHighlightAll,
    updateCircle,
    linePath,
    setLinePath,
    isOverMenu,
    setIsOverMenu,
    canAdd,
    setCanAdd,
    midpoints,
    setMidpoints,
    blobPath,
    setBlobPath,
    showLines,
    toggleShowLines,
    setShowLines,
    toggleCanAdd,
    melt,
    createBlobPath,
    adjustBlobPath,
    getBounds,
    download,
    handleClearClick,
    downloadPrompt,
    toggleDownloadPrompt,
    setDownloadPrompt,
    isOverSvg,
    setIsOverSvg,
    inMoveMode,
    setInMoveMode
  };

  return (
    <SvgElementsContext.Provider value={value}>
      {children}
    </SvgElementsContext.Provider>
  );
}

export default SvgElementsProvider;
