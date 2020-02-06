import React, { useContext } from 'react'
import {
    StyledContainer,
    StyledMenuButton
} from './styles'
import ToggleButton from 'components/controlMenu/toggleButton/index'
import { SvgElementsContext } from 'globalState/SvgElementsProvider'

function ControlMenu() {

    // global state
    const {setIsOverMenu,setCircles,canAdd,setCanAdd} = useContext(SvgElementsContext)

    const handleClearClick = () => {
        setCircles([])
        setCanAdd(true)
    }

    return (
        <StyledContainer
            onMouseEnter={() => setIsOverMenu(true)}
            onMouseLeave={() => setIsOverMenu(false)}
        >
            <ToggleButton 
                label="add more points"
                onClick={() => setCanAdd(prevCanAdd => !prevCanAdd)}
                initial={canAdd}
            />
            <StyledMenuButton
                onClick={handleClearClick}
            >
                clear
            </StyledMenuButton>
            <StyledMenuButton>
                blobify
            </StyledMenuButton>
        </StyledContainer>
    )
}

export default ControlMenu