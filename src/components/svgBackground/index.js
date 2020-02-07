import React, { useContext } from 'react'
import Circle from 'components/circle/index'
import { SvgElementsContext } from 'globalState/SvgElementsProvider'
import Lines from 'components/lines/index'
import GuideLines from 'components/guideLines/index'
import Blob from 'components/blob/index'
import {
    StyledContainerSVG,
    StyledBackgroundRect
} from './styles'
import Logo from './logo'
const _ = require('lodash')

function SvgBackground() {

    // global state
    const {
        setMouseDown,
        points,
        setIsOver,
        setSelectedCircle,
        showLines,
        canAdd
    } = useContext(SvgElementsContext)

    return (
        <div
            style={{'position':'absolute'}}
            onMouseDown={() => setMouseDown(true)}
            onMouseUp={() => setMouseDown(false)}
        >
            <StyledContainerSVG>
                <StyledBackgroundRect
                    onMouseMove={_.throttle(() => setIsOver(false),50)}
                    onClick={() => {
                        setIsOver(false)
                        if (!canAdd) setSelectedCircle(null)
                    }}
                />
                <Logo />
                <Blob />
                {showLines && <Lines />}
                {(showLines && canAdd) && <GuideLines />}  
                {
                    showLines &&
                    points.map((circle,i) => {
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