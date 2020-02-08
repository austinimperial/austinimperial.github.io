import React, { useState, useContext } from 'react'
import { StyledMenuButton } from 'components/controlMenu/shared/sharedStyles'
import { SvgElementsContext } from 'globalState/SvgElementsProvider'
import { 
    StyledContainer,
    StyledConfirmButton,
    StyledText
} from './styles'

function ClearButton({containerStyle,onClick}) {

    // global state
    const {setSelectedCircle} = useContext(SvgElementsContext)

    // local state
    const [confirm,setConfirm] = useState(false)

    const handleConfirmClick = () => {
        onClick()
        setConfirm(false)
        setSelectedCircle(null)
    }

    if (!confirm) {
        return (
            <StyledContainer style={containerStyle} >
                <StyledMenuButton
                        onClick={() => setConfirm(prevConfirm => !prevConfirm)}
                    >
                        clear
                </StyledMenuButton>    
            </StyledContainer>

        )  
    }
    
    if (confirm) {
        return (
            <StyledContainer style={containerStyle} >
                <StyledText>are you sure?</StyledText>
                
                <StyledConfirmButton
                    onClick={handleConfirmClick}
                >
                    Y
                </StyledConfirmButton> 

                <StyledConfirmButton
                    onClick={() => setConfirm(false)}
                >
                    N
                </StyledConfirmButton>       
            </StyledContainer>

        )        
    }
}

export default ClearButton