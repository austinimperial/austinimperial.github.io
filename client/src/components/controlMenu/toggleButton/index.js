import React, { useState, useEffect } from "react";
import { StyledContainer, StyledToggleButton, StyledText } from "./styles";

function ToggleButton({ value, label, containerStyle, ...rest }) {
  // local state
  const [isOn, setIsOn] = useState(value || true);

  useEffect(() => {
    if (isOn !== value) setIsOn(prevIsOn => !prevIsOn);
  }, [setIsOn, isOn, value]);

  return (
    <StyledContainer style={containerStyle} {...rest}>
      <StyledToggleButton
        onClick={() => setIsOn(prevIsOn => !prevIsOn)}
        isOn={isOn}
      ></StyledToggleButton>
      <StyledText>{label}</StyledText>
    </StyledContainer>
  );
}

export default ToggleButton;
