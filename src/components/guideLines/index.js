import React, { useContext, useEffect, useState, useCallback } from 'react'
import { SvgElementsContext } from 'globalState/SvgElementsProvider'
const _ = require('lodash')

function GuideLines() {

    // global state
    const {points,selectedCircle} = useContext(SvgElementsContext)

    // local state
    const [cursorCoords,setCursorCoords] = useState({x:0,y:0})
    
    useEffect(() => {

        const handleMouseMove = _.throttle(e => {
            setCursorCoords({x:e.pageX,y:e.pageY})
        },35)

        window.addEventListener('mousemove',handleMouseMove)
        return () => window.removeEventListener('mousemove',handleMouseMove)
    },[points])

    const getNextCircleIndex = useCallback(() => {
        if (!selectedCircle) return points.length-1
        if (selectedCircle === points.length-1) return 0
        return selectedCircle + 1
    },[points,selectedCircle])

    if (points.length < 2 || !points) return <></>

    return (
        <path 
        d={`
            M 
            ${points[selectedCircle || 0].x} 
            ${points[selectedCircle || 0].y} 
            L 
            ${cursorCoords.x || 0}
            ${cursorCoords.y || 0}
            L 
            ${points[getNextCircleIndex()].x || 0}
            ${points[getNextCircleIndex()].y || 0}
        `}
        stroke="#f53dff"
        strokeDasharray="10,10"
    />
    )
}

export default GuideLines
