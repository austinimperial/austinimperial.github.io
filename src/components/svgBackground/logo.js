import React from 'react'
import styled from 'styled-components'

const StyledText = styled.text`
    font-family: Londrina Outline;
    font-size: 70px;
    fill: black;
    pointer-events: none;
    ::selection { background: none; }

    ${props => props.subtext && `
        font-family: Titillium Web;
        font-weight: 300;
        font-size: 25px; 
    `}
`

function Logo() {
    return (
        <svg x="20" y="10">
            <defs>
                <style>
                    @import url('https://fonts.googleapis.com/css?family=Londrina+Outline&display=swap');
                    @import url('https://fonts.googleapis.com/css?family=Titillium+Web:200,300,400,500');
                </style>
            </defs>
            <StyledText
                y="60"
            >
                quick-blob-svg
            </StyledText>
            <StyledText subtext x="50" y="85">
                "I need a blob - quick!"
            </StyledText>
        </svg>
    )
}

export default Logo