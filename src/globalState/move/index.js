import React, { useContext, useState, useEffect, useCallback } from 'react'
import { SvgElementsContext } from 'globalState/svgElementsProvider/index'
export const MoveContext = React.createContext()
const _ = require('lodash')

function MoveProvider({children}) {
    // global state
    const {
        points,
        setPoints,
        setCanAdd,
        setShowLines,
        mouseDown,
        inMoveMode,
        setInMoveMode
    } = useContext(SvgElementsContext)

    // local state
    const [mouseIsOverBlob,setMouseIsOverBlob] = useState(false)
    const [diffs,setDiffs] = useState([])

    const toggleInMoveMode = () => {
        setInMoveMode(prevInMoveMode => !prevInMoveMode)
        setCanAdd(prevCanAdd => prevCanAdd ? false : prevCanAdd);
        setShowLines(prevShowLines => prevShowLines ? false : prevShowLines);
    }

    const handleMouseDown = useCallback(e => {
        const diffs = points.map(point => {
            return {x: point.x - e.offsetX, y: point.y - e.offsetY}
        })
        setDiffs(diffs)
    },[points])

    useEffect(() => {
        window.addEventListener('mousedown',handleMouseDown)
        return () => window.removeEventListener('mousedown',handleMouseDown)
    },[handleMouseDown])


    useEffect(() => {

        const moveBlob = e => {
            if (inMoveMode && mouseDown && mouseIsOverBlob) {
                const newPoints = points.map((point,i) => {
                    return {
                        x: e.offsetX + diffs[i].x,
                        y: e.offsetY + diffs[i].y
                    }
                })
                setPoints(newPoints)
            }
        }

        window.addEventListener("mousemove", moveBlob);
        return () => {
            window.removeEventListener("mousemove", moveBlob);
        }
    },[mouseIsOverBlob,mouseDown,inMoveMode,points,setPoints,points,diffs])


    const value = {
        inMoveMode,
        setInMoveMode,
        toggleInMoveMode,
        mouseIsOverBlob,
        setMouseIsOverBlob
    }

    return (
        <MoveContext.Provider value={value}>
            {children}
        </MoveContext.Provider>
    )
}

export default MoveProvider