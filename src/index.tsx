import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { StyledEngineProvider } from "@mui/material/styles";
import { Provider } from "react-redux";

import App from "./App";
import GlobalStyle from "./style/GlobalStyle";
import Layout from "./components/Layout";
import store from "./store";
import defaultTheme from "./style/defaultTheme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={defaultTheme}>
        <Provider store={store}>
          <GlobalStyle />
          <Layout>
            <App />
          </Layout>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
);
