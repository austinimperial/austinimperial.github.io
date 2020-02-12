import React, { useContext } from "react";
import { 
  StyledContainer,
  StyledControlContainer
} from "./styles";
import { StyledMenuButton } from "components/controlMenu/shared/sharedStyles";
import DownloadButton from "components/controlMenu/downloadButton/index";
import ToggleButton from "components/controlMenu/toggleButton/index";
import { SvgElementsContext } from "globalState/svgElementsProvider/index";
import { ScreenSizesContext } from 'globalState/screenSizes/index'
import ClearButton from "components/controlMenu/clearButton/index";

function ControlMenu() {
  // global state
  const {
    setIsOverMenu,
    canAdd,
    showLines,
    toggleShowLines,
    toggleCanAdd,
    melt,
    handleClearClick
  } = useContext(SvgElementsContext);
  const {xxs,xs,sm,md,lg,xl} = useContext(ScreenSizesContext)

  if (xxs || xs || sm) {
    return (
      <StyledContainer small>
        <StyledControlContainer left >
          <StyledMenuButton
            style={{ margin: "5px 10px 0px 0px" }}
            onClick={() => melt()}
          >
            melt
          </StyledMenuButton>
          <ToggleButton
            label="add points"
            containerStyle={{ margin: "5px 10px 0px 0px" }}
            onClick={toggleCanAdd}
            value={canAdd}
          />
          <ToggleButton
            label="show lines"
            containerStyle={{ margin: "5px 0px 0px 0px" }}
            onClick={toggleShowLines}
            value={showLines}
          />    
        </StyledControlContainer>
        <StyledControlContainer right >      
          <ClearButton
            onClick={handleClearClick}
            containerStyle={{ margin: "5px 0px 0px 0px", minHeight: "32px" }}
          />            
          <DownloadButton small />
        </StyledControlContainer>
      </StyledContainer>
    )
  }

  if (md || lg || xl ) {
    return (
      <StyledContainer
        big
        onMouseEnter={() => setIsOverMenu(true)}
        onMouseLeave={() => setIsOverMenu(false)}
        onMouseMove={() => setIsOverMenu(true)}
      >
        <ToggleButton
          label="add points"
          containerStyle={{ margin: "10px 0px 0px 0px" }}
          onClick={toggleCanAdd}
          value={canAdd}
        />
        <ToggleButton
          label="show lines"
          containerStyle={{ margin: "10px 0px 0px 0px" }}
          onClick={toggleShowLines}
          value={showLines}
        />
        <StyledMenuButton
          style={{ margin: "10px 0px 0px 0px" }}
          onClick={() => melt()}
        >
          melt
        </StyledMenuButton>
        <ClearButton
          onClick={handleClearClick}
          containerStyle={{ margin: "60px 0px 0px 0px", minHeight: "32px" }}
        />
        <DownloadButton />
      </StyledContainer>
    );    
  }

}

export default ControlMenu;
