export const createSvgString = (pathData, xMax, yMax) => {
  const result = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <svg 
            viewBox='0 0 ${xMax} ${yMax}' xmlns="http://www.w3.org/2000/svg" 
        >
            <path fill='black' stroke="black" d='${pathData}'/>
        </svg>
    `;
  const pretty = result.replace(/\s{1,}/, " ");
  return pretty;
};
