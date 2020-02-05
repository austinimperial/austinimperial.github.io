import React, { useState, useEffect } from 'react'
export const SvgElementsContext = React.createContext()
const _ = require('lodash')

function SvgElementsProvider({children}) {

    // local state
    const [circles,setCircles] = useState([])
    const [mouseDown,setMouseDown] = useState(false)
    const [isOver,setIsOver] = useState(false)
    const [currentCircle,setCurrentCircle] = useState(null)
    const [selectedCircle,setSelectedCircle] = useState(null) 
    const [linePath,setLinePath] = useState("")

    useEffect(() => {

        const handleDelete = e => {
            if (e.code === "Backspace") deleteCircle(selectedCircle)
        }

        window.addEventListener('keydown',handleDelete)
        return () => window.removeEventListener('keydown',handleDelete)
    })

    useEffect(() => {

        const addCircle = _.throttle(e => {
            if (!isOver) setCircles(prevCircles => [...prevCircles,{x: e.clientX, y: e.clientY}])
        },50)

        window.addEventListener('click', addCircle)
        return () => window.removeEventListener('click', addCircle)
    },[isOver]) 

    useEffect(() => {

        const move = _.throttle(e => {
            if (mouseDown) updateCircle(currentCircle,{x:e.pageX,y:e.pageY}) 
        },30)

        window.addEventListener('mousemove', move)
        return () => window.removeEventListener('mousemove',move)

    },[mouseDown,currentCircle,isOver])

    const updateCircle = (i,changes) => {
        const newCircles = [...circles]
        newCircles[i] = {...newCircles[i], ...changes}
        setCircles(newCircles)
    }

    const unHighlightAll = () => {
        setCircles(prevCircles => {
            return prevCircles.map(pc => {
            return {x:pc.x,y:pc.y,isHovering:false}
            })
        })
    }

    const deleteCircle = (i) => {
        const newCircles = [...circles]
        newCircles.splice(i,1)
        setCircles(newCircles)
        setSelectedCircle(null)
        setIsOver(false)
    }

    const value = {
        circles,setCircles,
        mouseDown,setMouseDown,
        isOver,setIsOver,
        currentCircle,setCurrentCircle,
        selectedCircle,setSelectedCircle,
        unHighlightAll,
        updateCircle,
        linePath,setLinePath
    }

    return (
        <SvgElementsContext.Provider value={value}>
            {children}
        </SvgElementsContext.Provider>
    )
}

export default SvgElementsProvider