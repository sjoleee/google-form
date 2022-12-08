import React from "react";

import * as S from "./styles";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <S.Container>{children}</S.Container>
);

export default Layout;
