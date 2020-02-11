import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const StyledSvgContainer = styled.div`
  height: 14vh;
  min-width: 280px;
  min-height: 60px;
`

export const StyledText = styled.text`
  font-family: Londrina Outline;
  font-size: 70px;
  fill: black;
  pointer-events: none;
  ::selection {
    background: none;
  }

  ${props =>
    props.subtext &&
    `
        font-family: Titillium Web;
        font-weight: 300;
        font-size: 25px; 
    `}
`;