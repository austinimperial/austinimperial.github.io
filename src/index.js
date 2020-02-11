import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from 'styled-components'
import { mainTheme } from 'styles/mainTheme'
import ScreenSizesProvider from 'globalState/screenSizes/index'
import SvgElementsProvider from "globalState/svgElementsProvider/index";

ReactDOM.render(
    <ThemeProvider theme={mainTheme} >
    <ScreenSizesProvider>
    <SvgElementsProvider>
         <App />
    </SvgElementsProvider>
    </ScreenSizesProvider>
    </ThemeProvider>
, document.getElementById("root"));

serviceWorker.unregister();
