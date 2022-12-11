import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 64px);
  height: 100%;
  box-sizing: border-box;
  margin: 0;
  margin-bottom: 64px;
  padding: 0 auto;
  background-color: ${({ theme }) => theme.colors.PURPLE_LIGHT};
`;
