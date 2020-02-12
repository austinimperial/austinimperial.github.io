import React, { useContext } from "react";
import SvgBackground from "components/svgBackground/index";
import ControlMenu from "components/controlMenu/index";
import { StyledAppContainer } from "./styles/AppStyles";
import { ScreenSizesContext } from "globalState/screenSizes/index";
import Logo from "components/logo/index";

function App() {
  // global state
  const { xxs, xs, sm, md, lg, xl } = useContext(ScreenSizesContext);

  if (xxs || xs || sm) {
    return (
      <StyledAppContainer>
        <Logo />
        <SvgBackground />
      </StyledAppContainer>
    );
  }

  if (md || lg || xl) {
    return (
      <StyledAppContainer>
        <SvgBackground />
        <ControlMenu />
      </StyledAppContainer>
    );
  }
}

export default App;
