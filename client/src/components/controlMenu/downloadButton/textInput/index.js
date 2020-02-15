import React, { useState } from "react";
import { StyledInput, StyledLabel, StyledContainer } from "./styles";

function TextInput({
  label,
  value,
  onChange,
  invalid,
  containerStyle,
  type,
  labelStyle
}) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <StyledContainer style={containerStyle}>
      <StyledInput
        type={type}
        onChange={onChange}
        value={value}
        onFocus={() => setIsClicked(true)}
        onBlur={e => e.target.value.length === 0 && setIsClicked(false)}
        big
        invalid={invalid}
      />
      <StyledLabel isClicked={isClicked} invalid={invalid} style={labelStyle}>
        {label}
      </StyledLabel>
    </StyledContainer>
  );
}

export default TextInput;
