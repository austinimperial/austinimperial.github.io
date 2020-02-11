import React, { useState, useEffect } from 'react'
export const ScreenSizesContext = React.createContext()
const _ = require('lodash')

const getScreenSizes = (sizeInPixels) => {
    const sizeRanges = {
        xxs: [0,468],
        xs: [468,576],
        sm: [576,768],
        md: [768,992],
        lg: [992,1200],
        xl: [1200,100000]
    }
    const sizes = {...sizeRanges}
    const sizeRangesEntries = Object.entries(sizeRanges)
    sizeRangesEntries.forEach(sr => {
        sr[1][0] < sizeInPixels && sizeInPixels <= sr[1][1]
            ? sizes[sr[0]] = true
            : sizes[sr[0]] = false
    })
    return sizes
}


const getWidth = () => {
    const w = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
    return w
}

function ScreenSizesProvider({children}) {
    const [screenSizes,setScreenSizes] = useState(getScreenSizes(getWidth()))
    const [width,setWidth] = useState(0)

    useEffect(() => {
        window.addEventListener('resize', _.throttle(() => setWidth(getWidth()), 500 ))
        return function() {
            window.removeEventListener('resize',_.throttle(() => setWidth(getWidth()), 500 ))
        } 
    },[])

    useEffect(() => {
        // only update screenSizes if prev is different than current
        const currentScreenSizes = getScreenSizes(getWidth())
        if (_.isEqual(currentScreenSizes,screenSizes)) return
        setScreenSizes(currentScreenSizes)
    }, [width])

    return (
        <ScreenSizesContext.Provider value={screenSizes}>
            {children}
        </ScreenSizesContext.Provider>
    )
}

export default ScreenSizesProvider