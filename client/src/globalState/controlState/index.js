import React, { useState } from "react";
export const ControlStateContext = React.createContext();

function ControlStateProvider({ children }) {
  // local state
  const [blobPath, setBlobPath] = useState("");
  const [mouseDown, setMouseDown] = useState(false);
  const [isOverCircle, setIsOverCircle] = useState(false);
  const [isOverMenu, setIsOverMenu] = useState(false);
  const [isOverSvg, setIsOverSvg] = useState(false);
  const [currentCircle, setCurrentCircle] = useState(null);
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [linePath, setLinePath] = useState("");
  const [canAdd, setCanAdd] = useState(true);
  const [showLines, setShowLines] = useState(true);
  const [downloadPrompt, setDownloadPrompt] = useState(false);
  const [inMoveMode, setInMoveMode] = useState(false);
  const [svgBackgroundRef, setSvgBackgroundRef] = useState(null);

  const toggleShowLines = () => {
    setShowLines(prevShowLines => !prevShowLines);
    setCanAdd(prevCanAdd => (prevCanAdd ? false : prevCanAdd));
    setInMoveMode(false);
  };

  const toggleCanAdd = () => {
    setCanAdd(prevCanAdd => !prevCanAdd);
    setShowLines(prevShowLines => (!prevShowLines ? true : prevShowLines));
    setInMoveMode(false);
  };

  const toggleDownloadPrompt = () => {
    setDownloadPrompt(prevDownloadPrompt => !prevDownloadPrompt);
    setCanAdd(prevCanAdd => (prevCanAdd ? false : prevCanAdd));
    setInMoveMode(false);
  };

  const value = {
    mouseDown,
    setMouseDown,
    isOverCircle,
    setIsOverCircle,
    currentCircle,
    setCurrentCircle,
    selectedCircle,
    setSelectedCircle,
    linePath,
    setLinePath,
    isOverMenu,
    setIsOverMenu,
    canAdd,
    setCanAdd,
    blobPath,
    setBlobPath,
    showLines,
    toggleShowLines,
    setShowLines,
    toggleCanAdd,
    downloadPrompt,
    toggleDownloadPrompt,
    setDownloadPrompt,
    isOverSvg,
    setIsOverSvg,
    inMoveMode,
    setInMoveMode,
    svgBackgroundRef,
    setSvgBackgroundRef
  };

  return (
    <ControlStateContext.Provider value={value}>
      {children}
    </ControlStateContext.Provider>
  );
}

export default ControlStateProvider;
