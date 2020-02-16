import React, { useContext, useRef, useEffect } from "react";
import Circle from "components/circle/index";
import { ControlStateContext } from "globalState/controlState/index";
import Lines from "components/lines/index";
import GuideLines from "components/guideLines/index";
import Blob from "components/blob/index";
import { StyledContainerSVG } from "./styles";
import { ScreenSizesContext } from "globalState/screenSizes/index";
import { TouchScreenDetectionContext } from 'globalState/touchScreenDetection/index'
import { PointsContext } from "globalState/points/index";
import BackgroundRect from "components/backgroundRect/index";
import Logo from "components/logo/index";

function SvgBackground() {
  // global state
  const {
    setMouseDown,
    showLines,
    canAdd,
    setDownloadPrompt,
    setIsOverSvg,
    setSvgBackgroundRef
  } = useContext(ControlStateContext);
  const { points } = useContext(PointsContext);
  const { isTouchScreen } = useContext(TouchScreenDetectionContext)

  const { md, lg, xl, prevScreenSize } = useContext(ScreenSizesContext);

  // ref
  const backgroundRef = useRef();

  useEffect(() => {
    setSvgBackgroundRef(backgroundRef);
  }, [prevScreenSize, setSvgBackgroundRef]);

  return (
    <div
      ref={backgroundRef}
      style={{ position: "absolute" }}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      onClick={() => setDownloadPrompt(false)}
      onMouseEnter={() => setIsOverSvg(true)}
      onMouseLeave={() => setIsOverSvg(false)}
    >
      <StyledContainerSVG>
        <BackgroundRect />
        {(md || lg || xl) && <Logo />}
        <Blob />
        {showLines && <Lines />}
        {showLines && canAdd && !isTouchScreen && <GuideLines />}
        {showLines &&
          points.map((circle, i) => {
            return <Circle key={Math.random()} i={i} circle={circle} />;
          })}
      </StyledContainerSVG>
    </div>
  );
}

export default SvgBackground;
