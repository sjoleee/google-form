import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Form from "./pages/Form";
import Preview from "./pages/Preview";
import Result from "./pages/Result";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/preview" element={<Preview />} />
      <Route path="/preview/result" element={<Result />} />
    </Routes>
  </BrowserRouter>
);

export default App;
