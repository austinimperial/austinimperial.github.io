import React, { useState } from 'react'
import { StyledMenuButton } from 'components/controlMenu/shared/sharedStyles'
import { 
    StyledContainer,
    StyledConfirmButton,
    StyledText
} from './styles'

function ClearButton({containerStyle,onClick}) {

    // local state
    const [confirm,setConfirm] = useState(false)

    const handleConfirmClick = () => {
        onClick()
        setConfirm(false)
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