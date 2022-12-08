import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { StyledEngineProvider } from "@mui/material/styles";

import App from "./App";
import Theme from "./style/Theme";
import GlobalStyle from "./style/GlobalStyle";
import Layout from "./components/Layout";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Layout>
          <App />
        </Layout>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
);
