import styled from "styled-components";

export const Contanier = styled.div<{ isClicked: boolean }>`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ isClicked }) => (isClicked ? "0 3px 5px rgba(0, 0, 0, 0.3)" : null)};
`;

export const Card = styled.div<{ isClicked: boolean }>`
  display: flex;
  border: ${({ theme }) => `1px solid ${theme.colors.GREY_HEAVY}`};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  min-height: 138px;
  width: 768px;
  padding: 24px;
`;

export const ClickHighlight = styled.div<{ isClicked: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme, isClicked }) => (isClicked ? theme.colors.BLUE_HEAVY : "")};
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
