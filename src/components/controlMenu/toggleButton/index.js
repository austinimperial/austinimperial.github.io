import React, { useState, useEffect } from 'react'
import {
    StyledContainer,
    StyledToggleButton,
    StyledText
} from './styles'

function ToggleButton({initial, ...rest}) {

    // local state
    const [isOn,setIsOn] = useState(initial || true)

    useEffect(() => {
        if (isOn !== initial) setIsOn(prevIsOn => !prevIsOn)
    })

    return (
        <StyledContainer
            {...rest}
        >
            <StyledToggleButton
                onClick={() => setIsOn(prevIsOn => !prevIsOn)}
                isOn={isOn}
            >

            </StyledToggleButton>  
            <StyledText>add points</StyledText>
        </StyledContainer>
    )
}

export default ToggleButton