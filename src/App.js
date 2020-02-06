import React from 'react';
import SvgBackground from 'components/svgBackground/index'
import SvgElementsProvider from 'globalState/SvgElementsProvider'
import ControlMenu from 'components/controlMenu/index'

function App() {
  return (
    <SvgElementsProvider>
      <SvgBackground />
      <ControlMenu />
    </SvgElementsProvider>
  );
}

export default App;
