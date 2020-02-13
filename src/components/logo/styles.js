import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const StyledSvgContainer = styled.div`
  width: 100vh;
  max-width: 400px;
  margin: 0px 0px 0px 10px;
`;

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
