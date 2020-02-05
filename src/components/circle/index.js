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

    const handleMouseLeave = () => {
      setIsOver(false)
      unHighlightAll()
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
          fill="black"

          onMouseDown={handleMouseDown}
          onMouseUp={() => setCurrentCircle(null)}

          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}

          isHovering={circle.isHovering}
          selected={i === selectedCircle}
        />
    )
}

export default Circle