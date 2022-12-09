import styled from "styled-components";

export const Contanier = styled.div<{ isFocused: boolean }>`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ isFocused }) => (isFocused ? "0 3px 5px rgba(0, 0, 0, 0.3)" : null)};
`;

export const Card = styled.div<{ isFocused: boolean }>`
  display: flex;
  border: ${({ theme }) => `1px solid ${theme.colors.GREY_HEAVY}`};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  min-height: 138px;
  width: 768px;
  padding: 24px;
  box-sizing: border-box;
`;

export const ClickHighlight = styled.div<{ isFocused: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme, isFocused }) => (isFocused ? theme.colors.BLUE_HEAVY : "")};
  min-height: 100%;
  width: 6px;
  z-index: 10;
`;

export const TitleHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.PURPLE_HEAVY};
  min-width: 100%;
  height: 10px;
  z-index: 20;
`;
