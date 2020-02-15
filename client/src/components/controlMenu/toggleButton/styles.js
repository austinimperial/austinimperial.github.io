import styled from "styled-components";

export const StyledToggleButton = styled.button`
  width: 60px;
  height: 30px;
  margin: 0px;
  appearance: none;
  background-color: transparent;
  border-radius: 30px;
  border: 1px solid black;
  outline: none;
  overflow: visible;
  box-sizing: border-box;
  transition: all 0.1s ease-in;

  // background circle
  background-image: url('data:image/svg+xml;,
        <svg viewBox="0 0 100 100" height="22px" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="black"/>
        </svg>');
  background-repeat: no-repeat;
  background-position: right 32px bottom 3px;
  ${props =>
    props.isOn &&
    `
        background-position: right 4px bottom 3px;
    `}
`;

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledText = styled.p`
  margin: 0px 4px 0px 8px;
  font-family: Titillium Web;
  font-size: 16px;
  color: black;
`;
