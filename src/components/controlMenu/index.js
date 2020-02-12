import React, { useContext, useRef, useEffect } from "react";
import { StyledContainer } from "./styles";
import { StyledMenuButton } from "components/controlMenu/shared/sharedStyles";
import DownloadButton from "components/controlMenu/downloadButton/index";
import ToggleButton from "components/controlMenu/toggleButton/index";
import { SvgElementsContext } from "globalState/svgElementsProvider/index";
import ClearButton from "components/controlMenu/clearButton/index";

function ControlMenu() {
  // global state
  const {
    setIsOverMenu,
    canAdd,
    showLines,
    toggleLines,
    toggleCanAdd,
    melt,
    handleClearClick,
    setMenuRef
  } = useContext(SvgElementsContext);

  // ref
  const menuRef = useRef()

  useEffect(() => {
    setMenuRef(menuRef)
  },[])

  return (
    <StyledContainer
      ref={menuRef}
      onMouseEnter={() => setIsOverMenu(true)}
      onMouseLeave={() => setIsOverMenu(false)}
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
        onClick={toggleLines}
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

export default ControlMenu;
