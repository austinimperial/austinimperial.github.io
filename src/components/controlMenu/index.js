import React, { useContext } from 'react'
import { StyledContainer } from './styles'
import { StyledMenuButton } from 'components/controlMenu/shared/sharedStyles'
import ToggleButton from 'components/controlMenu/toggleButton/index'
import { SvgElementsContext } from 'globalState/SvgElementsProvider'
import ClearButton from 'components/controlMenu/clearButton/index'

function ControlMenu() {

    // global state
    const {
        setIsOverMenu,
        canAdd,setPoints,setShowLines,
        showLines,toggleLines,
        toggleCanAdd,setCanAdd,
        melt
    } = useContext(SvgElementsContext)

    const handleClearClick = () => {
        setPoints([])
        setCanAdd(true)
        setShowLines(true)
    }

    return (
        <StyledContainer
            onMouseEnter={() => setIsOverMenu(true)}
            onMouseLeave={() => setIsOverMenu(false)}
        >
            <ToggleButton 
                label="add points"
                containerStyle={{'margin':'10px 0px 0px 0px'}}
                onClick={toggleCanAdd}
                value={canAdd}
            />
            <ToggleButton 
                label="show lines"
                containerStyle={{'margin':'10px 0px 0px 0px'}}
                onClick={toggleLines}
                value={showLines}
            />
            <ClearButton 
                onClick={handleClearClick}
                containerStyle={{'margin':'10px 0px 0px 0px','minHeight':'32px'}}
            />
            <StyledMenuButton
                style={{'margin':'10px 0px 0px 0px'}}
                onClick={() => melt()}
            >
                melt
            </StyledMenuButton>
        </StyledContainer>
    )
}

export default ControlMenu