import React, { useContext, useEffect} from 'react'
import { SvgElementsContext } from 'globalState/SvgElementsProvider'
function Lines() {
      
      // global state
      const {circles,linePath,setLinePath} = useContext(SvgElementsContext)

      const createSVGPathString = (pointList) => {
            // consumes a list of objects [ {x:value, y:value}...]
            // outputs an SVG path d attribute, which is a string.
            // the result is that all the points in the pointList
            // are connected by lines.
      
            const newPoints = [...pointList]
            if (newPoints.length > 0) newPoints.push(newPoints[0])
            const result = newPoints.reduce((total,currentValue,currentIndex) => {
                  if (currentIndex === 0) {
                        console.log(`M ${currentValue.x} ${currentValue.y}`)
                        return total + `M ${currentValue.x} ${currentValue.y}`
                  }

                  return total + ` L ${currentValue.x} ${currentValue.y}`
            },"")
            setLinePath(result)
      }

      useEffect(() => {
            createSVGPathString(circles)
      },[circles])

      return (
            <path 
                  stroke="black" 
                  fill="none"
                  d={linePath}
            />
      )
}

export default Lines

// select mode and add mode
// find isOverBackground, to update isOver