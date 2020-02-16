import React, { useContext } from "react";
import { ControlStateContext } from "globalState/controlState/index";
import styled from "styled-components";
const _ = require("lodash");

export const StyledBackgroundRect = styled.rect`
  height: 100vh;
  width: 100vw;
  fill: ${props => props.theme.bgMain};
`;

function BackgroundRect() {
  // global state
  const { setIsOverCircle, canAdd, setSelectedCircle } = useContext(
    ControlStateContext
  );

  return (
    <StyledBackgroundRect
      onMouseMove={_.throttle(() => setIsOverCircle(false), 50)}
      onClick={() => {
        setIsOverCircle(false);
        if (!canAdd) setSelectedCircle(null);
      }}
    />
  );
}

export default BackgroundRect;
