import styled from 'styled-components'

export const StyledCircle = styled.circle`

  ${props => props.selected && `
    fill: #43aba8;
    cursor: pointer
  `}
  
  ${props => props.isHovering && `
     fill: #f53dff;
     cursor: pointer;
  `}
`