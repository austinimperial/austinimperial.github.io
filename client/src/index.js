import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "styled-components";
import { mainTheme } from "styles/mainTheme";
import ScreenSizesProvider from "globalState/screenSizes/index";
import ControlStateProvider from "globalState/controlState/index";
import ResponsivePointShiftProvider from "globalState/responsivePointShiftProvider/index";
import TouchScreenDetectionProvider from 'globalState/touchScreenDetection/index'
import MoveProvider from "globalState/move/index";
import PointsProvider from "globalState/points/index";

ReactDOM.render(
  <ThemeProvider theme={mainTheme}>
    <ScreenSizesProvider>
      <ControlStateProvider>
        <PointsProvider>
          <ResponsivePointShiftProvider>
            <TouchScreenDetectionProvider>
              <MoveProvider>
                <App />
              </MoveProvider>
            </TouchScreenDetectionProvider>
          </ResponsivePointShiftProvider>
        </PointsProvider>
      </ControlStateProvider>
    </ScreenSizesProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
