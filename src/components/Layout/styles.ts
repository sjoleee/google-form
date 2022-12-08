import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0 auto;
  background-color: ${({ theme }) => theme.colors.PURPLE_LIGHT};
`;
