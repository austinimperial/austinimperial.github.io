import React, { useState, useEffect } from 'react'
export const TouchScreenDetectionContext = React.createContext()

function TouchScreenDetectionProvider({children}) {
    // local state
    const [isTouchScreen,setIsTouchScreen] = useState(false)

    // credit: https://www.geeksforgeeks.org/how-to-detect-touch-screen-device-using-javascript/
    function is_touch_enabled() { 
        return ( 'ontouchstart' in window ) ||  
               ( navigator.maxTouchPoints > 0 ) ||  
               ( navigator.msMaxTouchPoints > 0 ); 
    } 

    useEffect(() => {
        setIsTouchScreen(is_touch_enabled())
        console.log(is_touch_enabled())
    },[])

    const value = {
        isTouchScreen
    }

    return (
        <TouchScreenDetectionContext.Provider value={value} >
            {children}
        </TouchScreenDetectionContext.Provider>
    )
}

export default (TouchScreenDetectionProvider)