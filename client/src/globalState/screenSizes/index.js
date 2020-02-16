import React, { useState, useEffect } from "react";
import { getScreenSizes } from "./getScreenSizes";
import { getWidth } from "./getWidth";
export const ScreenSizesContext = React.createContext();
const _ = require("lodash");

function ScreenSizesProvider({ children }) {
  const [screenSizes, setScreenSizes] = useState(getScreenSizes(getWidth()));
  const [width, setWidth] = useState(0);
  const [prevScreenSize, setPrevScreenSize] = useState("a");

  useEffect(() => {
    const updateWidth = () => setWidth(getWidth());

    window.addEventListener("resize", _.throttle(updateWidth, 200));
    return () =>
      window.removeEventListener("resize", _.throttle(updateWidth, 200));
  }, []);

  const getScreenSize = screenSizes => {
    // returns the current screen size as a string
    return Object.entries(screenSizes).filter(entry => entry[1])[0][0];
  };

  useEffect(() => {
    // only update screenSizes if prev is different than current
    const currentScreenSizes = getScreenSizes(getWidth());
    if (_.isEqual(currentScreenSizes, screenSizes)) return;

    setScreenSizes(prevScreenSizes => {
      setPrevScreenSize(getScreenSize(prevScreenSizes));
      return currentScreenSizes;
    });
  }, [width, setScreenSizes]);

  return (
    <ScreenSizesContext.Provider value={{ ...screenSizes, prevScreenSize }}>
      {children}
    </ScreenSizesContext.Provider>
  );
}

export default ScreenSizesProvider;
