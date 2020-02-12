import styled from "styled-components";

export const StyledContainer = styled.div`
  ${props => props.small && `
    background-color: transparent;
    display: flex;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    padding: 10px;
    flex-wrap: wrap;
  `}

  ${props => props.big && `
    top: 130px;
    left: 20px;
    background-color: transparent;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;  
  `}

`;

export const StyledControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex-grow: 1;

  ${props => props.left && `
    align-items: flex-start;
  `}

  ${props => props.right && `
    align-items: flex-end;
  `}
`