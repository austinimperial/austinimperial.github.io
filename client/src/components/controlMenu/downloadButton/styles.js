import styled from "styled-components";
const downloadIcon = require("./downloadIcon.svg");
const validDownloadicon = require("./validDownloadIcon.svg");

export const StyledContainer = styled.div`
  display: flex;
  margin: 0px 0px 0px 4px;
`;

export const StyledDownloadButton = styled.button`
  margin: 10px 0px 0px 0px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  outline: none;
  border-radius: 40px;
  transition: all 0.1s ease-in;
  min-width: 0;
  background-color: transparent;

  ${props => props.big && `
    border: none;

    :hover {
      background-size: 35px;
      background-position: right 6px bottom 6px;
    }
    
  `}

  ${props => props.small && `
    border: 1px solid black;
  `}

  background-image: url(${props =>
    props.valid ? validDownloadicon : downloadIcon});
  background-size: 30px;
  background-repeat: no-repeat;
  background-position: right 9px bottom 9px;
`;

export const StyledWindow = styled.div`
  position: absolute;
  left: 50px;
  height: 60px;
  width: 150px;
  overflow: hidden;
`;

export const StyledSlider = styled.form`
  margin: 0px 0px 0px 10px;
  height: 60px;
  top: 10px;
  left: -250px;
  position: absolute;
  transition: left 0.15s ease-in-out;

  ${props =>
    props.active &&
    `
        left: 0px;
    `}
`;
