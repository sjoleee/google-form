import React from "react";
import { StyledEngineProvider } from "@mui/styled-engine";

import GlobalStyle from "./style/GlobalStyle";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <GlobalStyle />
    </StyledEngineProvider>
  );
}

export default App;
