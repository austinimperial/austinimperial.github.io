export const getBounds = (points) => {
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