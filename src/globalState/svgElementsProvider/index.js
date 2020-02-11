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
  const [currentCircle, setCurrentCircle] = useState(null);
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [linePath, setLinePath] = useState("");
  const [canAdd, setCanAdd] = useState(true);
  const [showLines, setShowLines] = useState(true);
  const [downloadPrompt, setDownloadPrompt] = useState(false);

  useEffect(() => {
    setMidpoints(getMidpoints(points));
  }, [points]);

  const deleteCircle = (i) => {
    if (i === null || i === undefined) return;
    if (downloadPrompt) return;
    const newCircles = [...points];
    newCircles.splice(i, 1);
    setSelectedCircle(null);
    setPoints(newCircles);
    setIsOver(false);
  };

  useEffect(() => {
    const handleDelete = e => {
      if (e.code === "Backspace") deleteCircle(selectedCircle);
    };

    window.addEventListener("keydown", handleDelete);
    return () => window.removeEventListener("keydown", handleDelete);
  }, [selectedCircle,deleteCircle]);

  useEffect(() => {
    const addCircle = _.throttle(e => {
      if (!isOver && !isOverMenu && canAdd) {
        setPoints(prevPoints => {
          if (selectedCircle === null)
            return [...prevPoints, { x: e.clientX, y: e.clientY }];

          if (selectedCircle === prevPoints.length - 1) {
            setSelectedCircle(prevPoints.length);
            return [...prevPoints, { x: e.clientX, y: e.clientY }];
          }

          const newPoints = [...prevPoints];
          setSelectedCircle(selectedCircle + 1);
          newPoints.splice(selectedCircle + 1, 0, {
            x: e.clientX,
            y: e.clientY
          });
          return newPoints;
        });
      }
    }, 60);

    window.addEventListener("click", addCircle);
    return () => window.removeEventListener("click", addCircle);
  }, [isOver, canAdd, isOverMenu, selectedCircle]);

  const updateCircle = (i, changes) => {
    const newCircles = [...points];
    newCircles[i] = { ...newCircles[i], ...changes };
    setPoints(newCircles);
  };

  useEffect(() => {
    const move = _.throttle(e => {
      if (mouseDown) updateCircle(currentCircle, { x: e.pageX, y: e.pageY });
    }, 40);

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseDown, currentCircle, updateCircle]);

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
  };

  const toggleLines = () => {
    setShowLines(prevShowLines => !prevShowLines);
    setCanAdd(prevCanAdd => (prevCanAdd ? false : prevCanAdd));
  };

  const toggleCanAdd = () => {
    setCanAdd(prevCanAdd => !prevCanAdd);
    setShowLines(prevShowLines => (!prevShowLines ? true : prevShowLines));
  };

  const toggleDownloadPrompt = () => {
    setDownloadPrompt(prevDownloadPrompt => !prevDownloadPrompt);
    setCanAdd(prevCanAdd => (prevCanAdd ? false : prevCanAdd));
  };

  const melt = () => {
    const newPoints = getCentroids(points);
    setPoints(newPoints);
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
    toggleLines,
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
    setDownloadPrompt
  };

  return (
    <SvgElementsContext.Provider value={value}>
      {children}
    </SvgElementsContext.Provider>
  );
}

export default SvgElementsProvider;
