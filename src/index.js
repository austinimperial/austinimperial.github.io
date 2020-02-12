import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "styled-components";
import { mainTheme } from "styles/mainTheme";
import ScreenSizesProvider from "globalState/screenSizes/index";
import SvgElementsProvider from "globalState/svgElementsProvider/index";
import ResponsivePointShiftProvider from 'globalState/responsivePointShiftProvider/index'

ReactDOM.render(
  <ThemeProvider theme={mainTheme}>
    <ScreenSizesProvider>
      <SvgElementsProvider>
        <ResponsivePointShiftProvider>
          <App />
        </ResponsivePointShiftProvider>
      </SvgElementsProvider>
    </ScreenSizesProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
