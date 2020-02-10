import React, { useContext } from 'react'
import { StyledContainer } from './styles'
import { StyledMenuButton } from 'components/controlMenu/shared/sharedStyles'
import ToggleButton from 'components/controlMenu/toggleButton/index'
import { SvgElementsContext } from 'globalState/svgElementsProvider/index'
import ClearButton from 'components/controlMenu/clearButton/index'
const fileDownload = require('js-file-download');

function ControlMenu() {

    // global state
    const {
        setIsOverMenu,
        canAdd,setPoints,setShowLines,
        showLines,toggleLines,
        toggleCanAdd,setCanAdd,
        melt,getBounds,adjustBlobPath
    } = useContext(SvgElementsContext)

    const handleClearClick = () => {
        setPoints([])
        setCanAdd(true)
        setShowLines(true)
    }

    const createSvgString = (blobPath,xMax,yMax) => {
        const result = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
            <svg 
                viewBox='0 0 ${xMax} ${yMax}' 
                xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" 
            >
                <path fill='black' stroke="black" d='${blobPath}'/>
            </svg>
        `
        const pretty = result.replace(/\s{1,}/, " ")
        return pretty
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
            <StyledMenuButton
                style={{'margin':'10px 0px 0px 0px'}}
                onClick={() => {
                    const {xMax,xMin,yMax,yMin} = getBounds()
                    const blobPath = adjustBlobPath()
                    fileDownload(createSvgString(blobPath, xMax-xMin, yMax-yMin), 'blob.svg')
                }}
            >
                download
            </StyledMenuButton>
        </StyledContainer>
    )
}

export default ControlMenu