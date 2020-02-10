import React, { useState, useEffect } from 'react'
import { restElement } from '@babel/types'
export const SvgElementsContext = React.createContext()
const _ = require('lodash')

function SvgElementsProvider({children}) {

    // local state
    const [points,setPoints] = useState([])
    const [midpoints,setMidpoints] = useState([])
    const [blobPath,setBlobPath] = useState("")
    const [mouseDown,setMouseDown] = useState(false)
    const [isOver,setIsOver] = useState(false)
    const [isOverMenu,setIsOverMenu] = useState(false)
    const [currentCircle,setCurrentCircle] = useState(null)
    const [selectedCircle,setSelectedCircle] = useState(null) 
    const [linePath,setLinePath] = useState("")
    const [canAdd,setCanAdd] = useState(true)
    const [showLines,setShowLines] = useState(true)

    const getMidpoint = (point1,point2) => {
        return {
            x: (point1.x + point2.x) / 2, 
            y: (point1.y + point2.y) / 2
        }
    }

    const getMidpoints = (pointList) => {
        const newMidpoints = pointList.map((point,i) => {
            if (i === pointList.length-1) return getMidpoint(pointList[0],point)
            return getMidpoint(point, pointList[i+1])
        })
        return newMidpoints
    }

    useEffect(() => {
        setMidpoints(getMidpoints(points))
    },[points])

    useEffect(() => {

        const handleDelete = e => {
            if (e.code === "Backspace") deleteCircle(selectedCircle)
        }

        window.addEventListener('keydown',handleDelete)
        return () => window.removeEventListener('keydown',handleDelete)
    },[selectedCircle])

    useEffect(() => {

        const addCircle = _.throttle(e => {
            if (!isOver && !isOverMenu && canAdd) {
                setPoints(prevPoints => {
                    if (selectedCircle === null) return [...prevPoints,{x: e.clientX, y: e.clientY}]

                    if (selectedCircle === prevPoints.length-1) {
                        setSelectedCircle(prevPoints.length)
                        return [...prevPoints,{x: e.clientX, y: e.clientY}]
                    }

                    const newPoints = [...prevPoints]
                    setSelectedCircle(selectedCircle + 1)
                    newPoints.splice(selectedCircle + 1, 0, {x: e.clientX, y: e.clientY})
                    return newPoints
                })
            }
        },60)

        window.addEventListener('click', addCircle)
        return () => window.removeEventListener('click', addCircle)
    },[isOver,canAdd,isOverMenu,selectedCircle,points]) 

    useEffect(() => {

        const move = _.throttle(e => {
            if (mouseDown) updateCircle(currentCircle,{x:e.pageX,y:e.pageY}) 
        },40)

        window.addEventListener('mousemove', move)
        return () => window.removeEventListener('mousemove',move)

    },[mouseDown,currentCircle])

    const updateCircle = (i,changes) => {
        const newCircles = [...points]
        newCircles[i] = {...newCircles[i], ...changes}
        setPoints(newCircles)
    }

    const unHighlightAll = () => {
        setPoints(prevPoints => {
            return prevPoints.map(pc => {
            return {x:pc.x,y:pc.y,isHovering:false}
            })
        })
    }

    const deleteCircle = (i) => {
        const newCircles = [...points]
        newCircles.splice(i,1)
        setSelectedCircle(null)
        setPoints(newCircles)
        setIsOver(false)
    }

    const toggleLines = () => {
        setShowLines(prevShowLines => !prevShowLines)
        setCanAdd(prevCanAdd => prevCanAdd ? false : prevCanAdd)
    }

    const toggleCanAdd = () => {
        setCanAdd(prevCanAdd => !prevCanAdd)
        setShowLines(prevShowLines => !prevShowLines ? true : prevShowLines)
    }

    const getCentroid = (p1,p2,p3) => {
        return (
            {
                x: (p1.x + p2.x + p3.x) / 3,
                y: (p1.y + p2.y + p3.y) / 3
            }
        )
    }

    const melt = () => {
        let newPoints = [...points]
        const lastPoint = newPoints[newPoints.length-1]
        newPoints = newPoints.map((point,i) => {
            if (i === 0) return getCentroid(lastPoint,point,newPoints[i+1])
            if (i === newPoints.length-1) return getCentroid(newPoints[i-1],point,newPoints[0])
            return getCentroid(newPoints[i-1],point,newPoints[i+1])
        })
        setPoints(newPoints)
    }

    const createBlobPath = (points,midpoints) => {
        // consumes a list of objects [ {x:value, y:value}...]
        // outputs an SVG path d attribute, which is a string.
        // the result is that all the points in the pointList
        // are connected by lines.
  
        const newMidpoints = [...midpoints]
        
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
                    ${points[currentIndex].x} 
                    ${points[currentIndex].y} 
                    ${currentValue.x} 
                    ${currentValue.y}
                `  
            )

        },"")
        const pretty = result.replace(/\s{1,}/g, " ")
        return pretty
    }

    const getBounds = () => {
        if (points.length === 0) return {}
        const xValues = points.map(point => point.x)
        const yValues = points.map(point => point.y)
        return {
            xMax: Math.max(...xValues),
            xMin: Math.min(...xValues),
            yMax: Math.max(...yValues),
            yMin: Math.min(...yValues),
        }
    }

    const adjustBlobPath = () => {
        const {xMin, yMin} = getBounds()
        const newPoints = points.map(point => {
            return {
                x: point.x - xMin,
                y: point.y - yMin
            }
        })
        const midpoints = getMidpoints(newPoints)
        console.log(newPoints)
        return createBlobPath(newPoints,midpoints)
    }

    const value = {
        points,setPoints,
        mouseDown,setMouseDown,
        isOver,setIsOver,
        currentCircle,setCurrentCircle,
        selectedCircle,setSelectedCircle,
        unHighlightAll,
        updateCircle,
        linePath,setLinePath,
        isOverMenu,setIsOverMenu,
        canAdd,setCanAdd,
        midpoints,setMidpoints,
        blobPath,setBlobPath,
        showLines,toggleLines,
        setShowLines,
        toggleCanAdd,melt,
        createBlobPath,
        getBounds,adjustBlobPath
    }

    return (
        <SvgElementsContext.Provider value={value}>
            {children}
        </SvgElementsContext.Provider>
    )
}

export default SvgElementsProvider