export const getMidpoint = (point1,point2) => {
    return {
        x: (point1.x + point2.x) / 2, 
        y: (point1.y + point2.y) / 2
    }
}

export const getMidpoints = (pointList) => {
    const newMidpoints = pointList.map((point,i) => {
        if (i === pointList.length-1) return getMidpoint(pointList[0],point)
        return getMidpoint(point, pointList[i+1])
    })
    return newMidpoints
}