import React, { useState, useEffect, useContext, useCallback } from "react";
import { getMidpoints } from "./midpoints";
import { getCentroids } from "./centroids";
import { createBlobPath } from "./createBlobPath";
import { getBounds } from "./getBounds";
import { adjustBlobPath } from "./adjustBlobPath";
import { createSvgString } from "./createSvgString";
import { ScreenSizesContext } from 'globalState/screenSizes/index'
export const SvgElementsContext = React.createContext();
const _ = require("lodash");
const fileDownload = require("js-file-download");

function SvgElementsProvider({ children }) {
  // global state
  const { xxs,xs,sm,md,lg,xl,prevScreenSize} = useContext(ScreenSizesContext)

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
  const [logoRef,setLogoRef] = useState(null)
  const [menuRef,setMenuRef] = useState(null)
  const [initialScreenSize,setInitialScreenSize] = useState(null)

  useEffect(() => {
    if (xxs || xs || sm) setInitialScreenSize('small')
  },[])

  const getScreenChangeDirection = useCallback(() => {
    const prevIsBig = ['md','lg','xl'].includes(prevScreenSize)
    const prevIsSmall = ['xxs','xs','sm'].includes(prevScreenSize)
    const bigToSmall = (xxs || xs || sm) && prevIsBig
    const smallToBig = (md || lg || xl) && prevIsSmall
    return {bigToSmall,smallToBig}
  },[prevScreenSize])

  const shiftUp = useCallback(() => {
    const newPoints = points.map(point => ({
      x: initialScreenSize === 'small' ? point.x + 160 : point.x,
      y: initialScreenSize === 'small' ? point.y + 90 : point.y,
    })) 
    return newPoints
  },[points])

  const shiftBack = useCallback(() => {
    const {xMin,yMin} = getBounds(points)
    const newPoints = points.map(point => ({
      x: (xMin > 160) && initialScreenSize === 'small' ? point.x - 160 : point.x,
      y: (yMin > 90) && initialScreenSize === 'small' ? point.y - 90 : point.y,
    })) 
    return newPoints
  },[points])

  useEffect(() => {
    const {smallToBig,bigToSmall} = getScreenChangeDirection()
    if (smallToBig) setPoints(shiftUp())
    if (bigToSmall) setPoints(shiftBack())
  },[prevScreenSize])

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
    const handleDelete = e => {
      if (e.code === "Backspace") deleteCircle(selectedCircle);
    };

    window.addEventListener("keydown", handleDelete);
    return () => window.removeEventListener("keydown", handleDelete);
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
      if (mouseDown && isOverSvg)
        updateCircle(currentCircle, { x: e.offsetX, y: e.offsetY });
    }, 40);

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseDown, currentCircle, updateCircle, isOverSvg]);

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
    setDownloadPrompt,
    logoRef,
    setLogoRef,
    menuRef,
    setMenuRef,
    isOverSvg,
    setIsOverSvg
  };

  return (
    <SvgElementsContext.Provider value={value}>
      {children}
    </SvgElementsContext.Provider>
  );
}

export default SvgElementsProvider;
