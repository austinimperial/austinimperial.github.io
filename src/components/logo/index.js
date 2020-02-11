import React, { useContext } from "react";
import { 
  StyledText,
  StyledContainer,
  StyledSvgContainer
} from './styles'
import { ScreenSizesContext } from 'globalState/screenSizes/index'

function Logo() {
  // global state
  const {xxs,xs,sm,md,lg,xl} = useContext(ScreenSizesContext)

  const defs = (
    <defs>
      <style>
        @import
        url('https://fonts.googleapis.com/css?family=Londrina+Outline&display=swap');
        @import
        url('https://fonts.googleapis.com/css?family=Titillium+Web:200,300,400,500');
      </style>
    </defs>
  )

  if (xxs || xs || sm) {
    return (
      <StyledContainer>
        <StyledSvgContainer>
          <svg viewBox='0 0 430 100' height='100%'>
            {defs}
            <StyledText y="60">quick-blob-svg</StyledText>
            <StyledText subtext x="50" y="85">
              "I need a blob - quick!"
            </StyledText>
          </svg>   
        </StyledSvgContainer>    
      </StyledContainer>
    )

  }

  if (md || lg || xl) {
    return (
      <svg x="20" y="10">
        {defs}
        <StyledText y="60">quick-blob-svg</StyledText>
        <StyledText subtext x="50" y="85">
          "I need a blob - quick!"
        </StyledText>
      </svg>
    );    
  }

}

export default Logo;
