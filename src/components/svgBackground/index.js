import React, { useContext } from "react";
import Circle from "components/circle/index";
import { SvgElementsContext } from "globalState/svgElementsProvider/index";
import Lines from "components/lines/index";
import GuideLines from "components/guideLines/index";
import Blob from "components/blob/index";
import { StyledContainerSVG } from "./styles";
import { ScreenSizesContext } from 'globalState/screenSizes/index'
import BackgroundRect from 'components/backgroundRect/index'
import Logo from 'components/logo/index';

function SvgBackground() {
  // global state
  const {
    setMouseDown,
    points,
    showLines,
    canAdd,
    setDownloadPrompt
  } = useContext(SvgElementsContext);

  const {md,lg,xl} = useContext(ScreenSizesContext)

  return (
    <div
      style={{ position: "absolute" }}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      onClick={() => setDownloadPrompt(false)}
    >
      <StyledContainerSVG>
        <BackgroundRect />
        {(md || lg || xl) && <Logo />}
        <Blob />
        {showLines && <Lines />}
        {showLines && canAdd && <GuideLines />}
        {showLines &&
          points.map((circle, i) => {
            return <Circle key={Math.random()} i={i} circle={circle} />;
          })}
      </StyledContainerSVG>
    </div>
  );
}

export default SvgBackground;
