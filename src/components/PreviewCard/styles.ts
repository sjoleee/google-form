import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 16px;
`;

export const Card = styled.div<{ isTitle: boolean }>`
  display: flex;
  flex-direction: column;
  border: ${({ theme }) => `1px solid ${theme.colors.GREY_HEAVY}`};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  min-height: 131px;
  width: 640px;
  padding: 24px;
  box-sizing: border-box;
`;

export const TitleHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.PURPLE_HEAVY};
  min-width: 100%;
  width: 100%;
  height: 10px;
  z-index: 20;
`;
