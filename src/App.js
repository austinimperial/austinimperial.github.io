import React from 'react';
import SvgBackground from 'components/svgBackground/index'
import SvgElementsProvider from 'globalState/SvgElementsProvider'

function App() {
  return (
    <SvgElementsProvider>
      <SvgBackground />
    </SvgElementsProvider>
  );
}

export default App;
