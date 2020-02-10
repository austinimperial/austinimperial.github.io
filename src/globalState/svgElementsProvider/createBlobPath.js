export const createBlobPath = (points,midpoints) => {
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