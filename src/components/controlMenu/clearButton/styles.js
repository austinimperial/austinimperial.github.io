import styled from 'styled-components'

export const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    box-sizing: border-box;
`

export const StyledConfirmButton = styled.button`
    margin: 0px 5px 0px 5px;
    width: 30px;
    height: 30px;
    border: 1px solid black;
    outline: none;
    appearence: none;
    background-color: transparent;
    border-radius: 15px;
    text-align: center;
    transition: all 0.1s ease-in;

    :hover {
        background-color: black;
        color: pink;
    }
`

export const StyledText = styled.p`
    margin: 0px 4px 0px 5px;
    font-family: Titillium Web;
    font-size: 16px;
    color: black;
`