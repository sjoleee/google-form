import styled from "styled-components";
import { TextField as MuiTextField } from "@mui/material";

import { ReactComponent as SvgDelete } from "../../assets/delete.svg";
import { ReactComponent as SvgSqare } from "../../assets/sqare.svg";
import { ReactComponent as SvgCircle } from "../../assets/circle.svg";

export const Container = styled.div<{ $isFocused: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  font-size: 14px;
  padding-left: 12px;
  :hover {
    & .MuiInputBase-root {
      ::before {
        border-bottom: none;
      }
      :not(.Mui-disabled) {
        border-bottom: ${({ $isFocused, theme }) =>
          $isFocused ? `1px solid ${theme.colors.GREY_HEAVY}` : "none"} !important;
      }
      .Mui-disabled {
        border-bottom: ${({ $isFocused, theme }) =>
          $isFocused ? `1px dotted ${theme.colors.GREY_HEAVY}` : "none"} !important;
      }
    }
  }

  & .MuiInputBase-root {
    font-size: 14px;
    ::before {
      border-bottom: none !important;
    }
    ::after {
      border-bottom: ${({ theme }) => `2px solid ${theme.colors.PURPLE_HEAVY}`};
    }
  }
`;

export const TextField = styled(MuiTextField)<{ $isFocused: boolean }>`
  width: 637px;
  height: 30px;
  padding: 12px 8px;
`;

export const DeleteIcon = styled(SvgDelete)`
  width: 25px;
  height: 25px;
  padding: 8px;
  cursor: pointer;
  :hover {
    border-radius: 100%;
    background-color: ${({ theme }) => theme.colors.GREY_MEDIUM};
  }
`;

export const Sqare = styled(SvgSqare)`
  width: 23px;
  height: 23px;
`;

export const Circle = styled(SvgCircle)`
  width: 23px;
  height: 23px;
`;

export const NumberSpan = styled.span`
  width: 23px;
  height: 23px;
  text-align: center;
  box-sizing: border-box;
  padding-top: 5px;
`;

export const ItemAddButton = styled.button`
  background-color: transparent;
  border: none;
  height: 30px;
  padding: 4px 0 5px 0;
  margin: 12px 8px;
  color: ${({ theme }) => theme.colors.GREY_EXTRA_HEAVY};
  :hover {
    padding-bottom: 4px;
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.GREY_HEAVY}`};
  }
`;

export const EtcAddButton = styled.button`
  border-radius: 4px;
  background-color: transparent;
  border: none;
  padding: 8px 8px;
  color: ${({ theme }) => theme.colors.BLUE_HEAVY};
  :hover {
    background-color: ${({ theme }) => theme.colors.BLUE_LIGHT};
  }
`;

export const ContentDndHandle = styled.div<{ $isFocused: boolean }>`
  display: ${({ $isFocused }) => ($isFocused ? "flex" : "none")};
  position: absolute;
  top: 0;
  left: 0;
  min-height: 60%;
  top: 10px;
  width: 10px;
  height: 60%;
  z-index: 20;
  border-radius: 4px;
  :hover {
    background-color: ${({ theme }) => theme.colors.PURPLE_MEDIUM};
  }
`;
