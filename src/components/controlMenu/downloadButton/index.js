import React, { useContext, useState, useEffect } from "react";
import { SvgElementsContext } from "globalState/svgElementsProvider/index";
import TextInput from "./textInput";
import {
  StyledContainer,
  StyledDownloadButton,
  StyledWindow,
  StyledSlider
} from "./styles";

function DownloadButton({small}) {
  // local state
  const [name, setName] = useState("");

  // global state
  const {
    download,
    downloadPrompt,
    toggleDownloadPrompt,
    setSelectedCircle
  } = useContext(SvgElementsContext);

  useEffect(() => {
    if (!downloadPrompt) setName("")
  },[downloadPrompt]);

  const handleIconClick = e => {
    e.preventDefault();

    if (small) {
      download('blob');
      toggleDownloadPrompt();
      setName("");
      return
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

  return (
    <StyledContainer>
      <div>
        <StyledDownloadButton
          onClick={handleIconClick}
          valid={name.length > 0}
        />
      </div>
      <StyledWindow>
        <StyledSlider active={downloadPrompt && !small} onSubmit={handleIconClick}>
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

export default DownloadButton;
