import React, { useContext, useRef, useEffect } from "react";
import { StyledText, StyledContainer, StyledSvgContainer } from "./styles";
import { ScreenSizesContext } from "globalState/screenSizes/index";
import { SvgElementsContext } from 'globalState/svgElementsProvider/index'

function Logo() {
  // global state
  const { xxs, xs, sm, md, lg, xl } = useContext(ScreenSizesContext);
  const { setLogoRef, setIsOverSvg } = useContext(SvgElementsContext)

  // ref
  const logoRef = useRef()

  useEffect(() => setLogoRef(logoRef),[])

  if (xxs || xs || sm) {
    return (
      <StyledContainer 
        onMouseMove={() => setIsOverSvg(false)}
        ref={logoRef} 
      >
        <StyledSvgContainer>
          <svg viewBox="0 0 430 100" height="100%">
            <StyledText y="60">quick-blob-svg</StyledText>
            <StyledText subtext x="50" y="85">
              "I need a blob - quick!"
            </StyledText>
          </svg>
        </StyledSvgContainer>
      </StyledContainer>
    );
  }

  if (md || lg || xl) {
    return (
      <svg x="20" y="10">
        <StyledText y="60">quick-blob-svg</StyledText>
        <StyledText subtext x="50" y="85">
          "I need a blob - quick!"
        </StyledText>
      </svg>
    );
  }
}

export default Logo;
