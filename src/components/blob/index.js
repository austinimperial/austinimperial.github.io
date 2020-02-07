import React, { useContext, useEffect} from 'react'
import { SvgElementsContext } from 'globalState/SvgElementsProvider'

function Blob() {
      
      // global state
      const {points,midpoints,blobPath,setBlobPath,setIsOver} = useContext(SvgElementsContext)

      const createSVGPathString = (pointList,midpointList) => {
            // consumes a list of objects [ {x:value, y:value}...]
            // outputs an SVG path d attribute, which is a string.
            // the result is that all the points in the pointList
            // are connected by lines.
      
            const newMidpoints = [...midpointList]
            
            const result = newMidpoints.reduce((total,currentValue,currentIndex) => {
                const lastMidPoint = newMidpoints[newMidpoints.length-1]
                if (currentValue === undefined) return
                if (currentIndex === 0) {
                        return total + (
                            `M 
                                ${lastMidPoint.x} 
                                ${lastMidPoint.y} 
                            Q   
                                ${points[0].x} 
                                ${points[0].y} 
                                ${currentValue.x} 
                                ${currentValue.y}
                            `
                        )
                }

                return total + (
                    ` Q 
                        ${pointList[currentIndex].x} 
                        ${pointList[currentIndex].y} 
                        ${currentValue.x} 
                        ${currentValue.y}
                    `  
                )

            },"")
            setBlobPath(result)
      }

      useEffect(() => {
            createSVGPathString(points,midpoints)
      },[midpoints])

      return (
            <path 
                    onMouseEnter={() => setIsOver(false)}
                    stroke="black" 
                    fill="black"
                    d={blobPath}
            />
      )
}

export default Blob