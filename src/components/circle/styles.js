import styled from 'styled-components'

export const StyledCircle = styled.circle`

  ${props => props.selected && `
    fill: #40ff00;
    cursor: pointer
  `}
  
  ${props => props.isHovering && `
     fill: red;
     cursor: pointer;
  `}
`