import styled from 'styled-components'

export const StyledMenuButton = styled.button`
    padding: 3px 12px 3px 12px;
    font-family: Titillium Web;
    font-weight: 400;
    font-size: 15px;
    appearance: none;
    background-color: transparent;
    border: 1px solid black;
    text-align: center;
    cursor: pointer;
    outline: none;
    border-radius: 20px;
    transition: all 0.1s ease-in;

    :hover {
        background-color: black;
        color: pink;
    }
`