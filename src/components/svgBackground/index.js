import React, { useContext } from 'react'
import Circle from 'components/circle/index'
import { SvgElementsContext } from 'globalState/SvgElementsProvider'
import Lines from 'components/lines/index'

import {
    StyledBackgroundSVG
} from './styles'

function SvgBackground() {

    // global state
    const {setMouseDown,circles} = useContext(SvgElementsContext)

    return (
        <div
            onMouseDown={() => setMouseDown(true)}
            onMouseUp={() => setMouseDown(false)}
        >
            <StyledBackgroundSVG>
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
            </StyledBackgroundSVG>
        </div>
    )
}

export default SvgBackground