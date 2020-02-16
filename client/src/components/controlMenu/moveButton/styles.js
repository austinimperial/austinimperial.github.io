import styled from "styled-components";
const moveIcon = require("./moveIcon.svg");

export const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const StyledMoveButton = styled.button`
  width: 60px;
  height: 60px;
  cursor: pointer;
  outline: none;
  border-radius: 40px;
  transition: all 0.1s ease-in;
  min-width: 0;
  background-color: transparent;

  background-image: url(${moveIcon});
  background-size: 43px;
  background-repeat: no-repeat;
  background-position: right 8px bottom 8px;

  ${props =>
    props.small &&
    `
    margin: 0px;
    border: 1px solid black;
  `}

  ${props =>
    props.big &&
    `
    margin: 10px 0px 0px 0px;
    border: none;

    :hover {
      background-size: 50px;
      background-position: right 4px bottom 4px;
    }
    
  `}

  ${props =>
    props.active &&
    `
    background-color: white;
    border: 1px solid white;
  `}
`;
