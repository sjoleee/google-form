import styled from "styled-components";
import { TextField as MuiTextField } from "@mui/material";

import { ReactComponent as SvgDelete } from "../../assets/delete.svg";
import { ReactComponent as SvgSqare } from "../../assets/sqare.svg";
import { ReactComponent as SvgCircle } from "../../assets/circle.svg";

export const Container = styled.div<{ $isFocused: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;

  :hover {
    & .MuiInputBase-root {
      ::before {
        border-bottom: none;
      }
      border-bottom: ${({ $isFocused, theme }) =>
        $isFocused ? `1px solid ${theme.colors.GREY_HEAVY}` : "none"} !important;
    }

    div {
      font-size: 14px;
      ::before {
        border-bottom: none;
      }
      ::after {
        border-bottom: ${({ theme }) => `2px solid ${theme.colors.PURPLE_HEAVY}`};
      }
    }
  }
`;

export const TextField = styled(MuiTextField)<{ $isFocused: boolean }>`
  width: 637px;
  height: 30px;
  padding: 12px 8px;

  & .MuiInputBase-root:hover {
    ::before {
      border-bottom: none;
    }
    border-bottom: ${({ $isFocused, theme }) =>
      $isFocused ? `1px solid ${theme.colors.GREY_HEAVY}` : "none"} !important;
  }

  div {
    font-size: 14px;
    ::before {
      border-bottom: none;
    }
    ::after {
      border-bottom: ${({ theme }) => `2px solid ${theme.colors.PURPLE_HEAVY}`};
    }
  }
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
