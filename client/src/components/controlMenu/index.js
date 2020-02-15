import React, { useContext } from "react";
import { 
  StyledContainer,
  StyledControlContainer,
  StyledMeltAndMoveContainer,
  StyledDownloadButtonContainer
} from "./styles";
import { StyledMenuButton } from "components/controlMenu/shared/sharedStyles";
import DownloadButton from "components/controlMenu/downloadButton/index";
import MoveButton from 'components/controlMenu/moveButton/index'
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
          <StyledMeltAndMoveContainer>
            <StyledMenuButton
              style={{ margin: "0px 10px 0px 0px" }}
              onClick={() => melt()}
            >
              melt
            </StyledMenuButton>
            <MoveButton />
          </StyledMeltAndMoveContainer>
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
          <StyledDownloadButtonContainer>
            <DownloadButton />
          </StyledDownloadButtonContainer>    
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
        <MoveButton />
        <DownloadButton />
      </StyledContainer>
    );    
  }

}

export default ControlMenu;
