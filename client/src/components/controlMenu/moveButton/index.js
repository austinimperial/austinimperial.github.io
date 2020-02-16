import React, { useContext } from "react";
import { ScreenSizesContext } from "globalState/screenSizes/index";
import { MoveContext } from "globalState/move/index";
import { StyledContainer, StyledMoveButton } from "./styles";

function MoveButton({ containerStyle, buttonStyle }) {
  // global state
  const { xxs, xs, sm, md, lg, xl } = useContext(ScreenSizesContext);
  const { toggleInMoveMode, inMoveMode } = useContext(MoveContext);

  return (
    <StyledContainer style={containerStyle}>
      <StyledMoveButton
        onClick={toggleInMoveMode}
        active={inMoveMode}
        style={buttonStyle}
        small={xxs || xs || sm}
        big={md || lg || xl}
      />
    </StyledContainer>
  );
}

export default MoveButton;
