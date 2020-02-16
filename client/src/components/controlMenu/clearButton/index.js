import React, { useState, useContext } from "react";
import { StyledMenuButton } from "components/controlMenu/shared/sharedStyles";
import { ControlStateContext } from "globalState/controlState/index";
import { StyledContainer, StyledConfirmButton, StyledText } from "./styles";

function ClearButton({ containerStyle, onClick }) {
  // global state
  const { setSelectedCircle, setIsOverSvg, setIsOverMenu } = useContext(
    ControlStateContext
  );

  // local state
  const [confirm, setConfirm] = useState(false);

  const handleConfirmClick = () => {
    onClick();
    setConfirm(false);
    setSelectedCircle(null);
  };

  const handleUnconfirmClick = () => {
    setConfirm(false);
    setIsOverSvg(true);
    setIsOverMenu(false);
  };

  if (!confirm) {
    return (
      <StyledContainer style={containerStyle}>
        <StyledMenuButton
          onClick={() => setConfirm(prevConfirm => !prevConfirm)}
        >
          clear
        </StyledMenuButton>
      </StyledContainer>
    );
  }

  if (confirm) {
    return (
      <StyledContainer style={containerStyle}>
        <StyledText>are you sure?</StyledText>

        <StyledConfirmButton onClick={handleConfirmClick}>
          Y
        </StyledConfirmButton>

        <StyledConfirmButton onClick={handleUnconfirmClick}>
          N
        </StyledConfirmButton>
      </StyledContainer>
    );
  }
}

export default ClearButton;
