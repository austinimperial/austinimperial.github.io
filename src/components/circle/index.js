import React, { useContext } from 'react'
import { SvgElementsContext } from 'globalState/SvgElementsProvider'
import { StyledCircle } from './styles'

function Circle({circle,i}) {

    // global state
    const {
      setIsOver,
      setCurrentCircle,
      updateCircle,
      unHighlightAll,
      selectedCircle,
      setSelectedCircle
    } = useContext(SvgElementsContext)

    const handleMouseEnter = async () => {
      updateCircle(i,{isHovering:true})
      setIsOver(true)
    }

    const handleMouseDown = () => {
      setCurrentCircle(i)
      setSelectedCircle(i)
    }

    return (
        <StyledCircle
          cx={circle.x} 
          cy={circle.y} 
          r="10" 
          fill="#6b6a6a"

          onMouseDown={handleMouseDown}
          onMouseUp={() => setCurrentCircle(null)}

          onMouseEnter={handleMouseEnter}
          onMouseLeave={unHighlightAll}

          isHovering={circle.isHovering}
          selected={i === selectedCircle}
        />
    )
}

export default Circle