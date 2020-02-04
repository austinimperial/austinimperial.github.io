import React, { useEffect, useState } from 'react';
import styled from 'styled-components'

const StyledCircle = styled.circle`
  ${props => props.isHovering && `
     fill: red;
     cursor: pointer;
  `}
`

function App() {

  // local state
  const [circles,setCircles] = useState([])
  const [mouseDown,setMouseDown] = useState(false)
  const [isOver,setIsOver] = useState(false)
  const [currentCircle,setCurrentCircle] = useState(null) 

  useEffect(() => {
    window.addEventListener('click',addCircle)
    return () => window.removeEventListener('click',addCircle)
  },[]) 

  useEffect(() => {

    const move = e => {
      if (mouseDown && isOver) updateCircle(currentCircle,{x:e.pageX,y:e.pageY}) 
    }

    window.addEventListener('mousemove',move)
    return () => window.removeEventListener('mousemove',move)

  },[mouseDown,currentCircle,isOver])

  const unHighlightAll = () => {
    setCircles(prevCircles => {
      return prevCircles.map(pc => {
        return {x:pc.x,y:pc.y,isHovering:false}
      })
    })
  }

  const addCircle = e => {
    if (!isOver) setCircles(prevCircles => [...prevCircles,{x: e.clientX, y: e.clientY, isHovering:false}])
  }

  const updateCircle = (i,changes) => {
    const newCircles = [...circles]
    newCircles[i] = {...newCircles[i], ...changes}
    setCircles(newCircles)
  }

  const Circle = ({x,y,setIsOver,setCurrentCircle,i,isHovering,updateCircle,unHighlightAll}) => {

    const handleMouseEnter = async () => {
      updateCircle(i,{isHovering:true})
      setIsOver(true)
    }

    const handleMouseLeave = () => {
      setIsOver(false)
      unHighlightAll()
    }

    return (
        <StyledCircle
          cx={x} 
          cy={y} 
          r="10" 
          fill="black"

          onMouseDown={() => setCurrentCircle(i)}
          onMouseUp={() => setCurrentCircle(null)}

          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}

          isHovering={isHovering}
        />
    )
  }


  return (
    <div
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
    >
      <svg height="100vh" width="100vw">
        {
          circles.map((c,i) => {
            return (
              <Circle 
                x={c.x} 
                y={c.y} 
                key={c.y*c.x}
                i={i}
                setIsOver={setIsOver}
                setCurrentCircle={setCurrentCircle}
                updateCircle={updateCircle}
                isHovering={c.isHovering}
                unHighlightAll={unHighlightAll}
              />
            )
          })
        }
      </svg>
    </div>
  );
}

export default App;
