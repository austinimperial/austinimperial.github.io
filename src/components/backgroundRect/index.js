import React, { useContext } from 'react'
import { SvgElementsContext } from 'globalState/svgElementsProvider/index'
import styled from 'styled-components'
const _ = require("lodash");

export const StyledBackgroundRect = styled.rect`
  height: 100vh;
  width: 100vw;
  fill: ${props => props.theme.bgMain};
`;

function BackgroundRect() {
    // global state
    const {setIsOver,canAdd,setSelectedCircle} = useContext(SvgElementsContext)

    return (
        <StyledBackgroundRect
            onMouseMove={_.throttle(() => setIsOver(false), 50)}
            onClick={() => {
            setIsOver(false);
            if (!canAdd) setSelectedCircle(null);
            }}
        />
    )
}

export default BackgroundRect