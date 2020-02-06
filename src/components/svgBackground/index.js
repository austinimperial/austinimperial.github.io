import React, { useContext } from 'react'
import Circle from 'components/circle/index'
import { SvgElementsContext } from 'globalState/SvgElementsProvider'
import Lines from 'components/lines/index'
import {
    StyledContainerSVG,
    StyledBackgroundRect
} from './styles'
import Logo from './logo'
const _ = require('lodash')

function SvgBackground() {

    // global state
    const {setMouseDown,circles,setIsOver} = useContext(SvgElementsContext)

    return (
        <div
            style={{'position':'absolute'}}
            onMouseDown={() => setMouseDown(true)}
            onMouseUp={() => setMouseDown(false)}
        >
            <StyledContainerSVG>
                <StyledBackgroundRect
                    onMouseMove={_.throttle(() => setIsOver(false),50)}
                />
                <Logo />
                <Lines />
                {
                    circles.map((circle,i) => {
                        return (
                            <Circle 
                                key={Math.random()}
                                i={i}
                                circle={circle}
                            />
                        )
                    })
                }               
            </StyledContainerSVG>

        </div>
    )
}

export default SvgBackground