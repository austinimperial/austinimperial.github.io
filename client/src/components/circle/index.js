import React, { useContext } from "react";
import { ControlStateContext } from "globalState/controlState/index";
import { PointsContext } from "globalState/points/index";
import { StyledCircle } from "./styles";
import { TouchScreenDetectionContext } from 'globalState/touchScreenDetection/index'

function Circle({ circle, i }) {
  // global state
  const {
    setIsOverCircle,
    setCurrentCircle,
    selectedCircle,
    setSelectedCircle
  } = useContext(ControlStateContext);
  const { updateCircle, unHighlightAll } = useContext(PointsContext);
  const { isTouchScreen } = useContext(TouchScreenDetectionContext)

  const handleMouseEnter = async () => {
    updateCircle(i, { isHovering: true });
    setIsOverCircle(true);
  };

  const handleMouseDown = () => {
    setCurrentCircle(i);
    setSelectedCircle(i);
  };

  return (
    <StyledCircle
      cx={circle.x}
      cy={circle.y}
      r="10"
      fill="#6b6a6a"
      onMouseDown={handleMouseDown}
      onMouseUp={() => setCurrentCircle(null)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={unHighlightAll}
      isHovering={circle.isHovering && !isTouchScreen}
      selected={i === selectedCircle}
    />
  );
}

export default Circle;
