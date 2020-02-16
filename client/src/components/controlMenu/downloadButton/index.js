import React, { useContext, useState, useEffect } from "react";
import { ControlStateContext } from "globalState/controlState/index";
import { ScreenSizesContext } from "globalState/screenSizes/index";
import { PointsContext } from "globalState/points/index";
import TextInput from "components/controlMenu/downloadButton/textInput/index";
import {
  StyledContainer,
  StyledDownloadButton,
  StyledWindow,
  StyledSlider
} from "./styles";

function DownloadButton() {
  // local state
  const [name, setName] = useState("");

  // global state
  const {
    downloadPrompt,
    toggleDownloadPrompt,
    setSelectedCircle
  } = useContext(ControlStateContext);
  const { xxs, xs, sm, md, lg, xl } = useContext(ScreenSizesContext);
  const { download } = useContext(PointsContext);

  useEffect(() => {
    if (!downloadPrompt) setName("");
  }, [downloadPrompt]);

  const handleIconClick = e => {
    e.preventDefault();

    if (xxs || xs || sm) {
      download("blob");
      toggleDownloadPrompt();
      setName("");
      return;
    }

    if (downloadPrompt && name.length > 0) {
      download(name);
      toggleDownloadPrompt();
      setName("");
      return;
    }

    if (downloadPrompt) {
      toggleDownloadPrompt();
      setName("");
      return;
    }

    toggleDownloadPrompt();
    setSelectedCircle(null);
  };

  if (xxs || xs || sm) {
    return (
      <StyledContainer>
        <StyledDownloadButton small onClick={handleIconClick} />
      </StyledContainer>
    );
  }

  if (md || lg || xl) {
    return (
      <StyledContainer>
        <div>
          <StyledDownloadButton
            big
            onClick={handleIconClick}
            valid={name.length > 0}
          />
        </div>
        <StyledWindow>
          <StyledSlider active={downloadPrompt} onSubmit={handleIconClick}>
            <TextInput
              label="save as"
              value={name}
              onChange={e => setName(e.target.value)}
              labelStyle={{ fontFamily: "Titillium Web", fontWeight: "400" }}
            />
          </StyledSlider>
        </StyledWindow>
      </StyledContainer>
    );
  }
}

export default DownloadButton;
