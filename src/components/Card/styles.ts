import styled from "styled-components";

import { ReactComponent as SvgDots } from "../../assets/dots.svg";

export const Container = styled.div<{ isFocused: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ isFocused }) => (isFocused ? "0 3px 5px rgba(0, 0, 0, 0.3)" : null)};
`;

export const Card = styled.div<{ isFocused: boolean; isTitle: boolean }>`
  left: 300;
  display: flex;
  flex-direction: column;
  border: ${({ theme }) => `1px solid ${theme.colors.GREY_HEAVY}`};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  min-height: 138px;
  width: 768px;
  padding: 24px;
  padding-bottom: ${({ isFocused, isTitle }) => (isFocused && !isTitle ? 0 : null)};
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
  width: 100%;
  height: 10px;
  z-index: 20;
`;

export const CardDndHandle = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  width: 100%;
  height: 30px;
  z-index: 20;

  :hover {
    > :last-child {
      visibility: visible;
    }
  }
`;

export const Dots = styled(SvgDots)`
  visibility: hidden;
  position: absolute;
  left: calc(50% - 10px);
  width: 20px;
  z-index: 30;
`;
