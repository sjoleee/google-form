import styled from "styled-components";

import { ReactComponent as SvgEye } from "../../assets/eye.svg";

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Container = styled.div`
  display: flex;
`;

export const Header = styled.div`
  position: relative;
  display: flex;
  height: 65px;
  width: 100%;
  margin-bottom: 16px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.GREY_HEAVY}`};
  align-items: center;
`;

export const Eye = styled(SvgEye)`
  position: absolute;
  right: 200px;
  width: 30px;
  height: 30px;
  padding: 8px;
  cursor: pointer;
  :hover {
    border-radius: 100%;
    background-color: ${({ theme }) => theme.colors.GREY_MEDIUM};
  }
`;
