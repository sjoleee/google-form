import styled from "styled-components";
import { FormControlLabel as MuiFormControlLabel, Switch as MuiSwitch } from "@mui/material";

import { ReactComponent as SvgTrash } from "../../assets/trash.svg";
import { ReactComponent as SvgCopy } from "../../assets/copy.svg";

export const Container = styled.div`
  height: 48px;
  display: flex;
  padding: 8px 0;
  align-items: center;
  justify-content: flex-end;
  border-top: ${({ theme }) => `1px solid ${theme.colors.GREY_HEAVY}`};
`;

export const VerticalLine = styled.div`
  margin: 0 8px;
  width: 0;
  height: 32px;
  border-left: ${({ theme }) => `1px solid ${theme.colors.GREY_HEAVY}`};
`;

export const Trash = styled(SvgTrash)`
  width: 25px;
  height: 25px;
  padding: 8px;
  cursor: pointer;
  :hover {
    border-radius: 100%;
    background-color: ${({ theme }) => theme.colors.GREY_MEDIUM};
  }
`;

export const Copy = styled(SvgCopy)`
  width: 25px;
  height: 25px;
  padding: 8px;
  cursor: pointer;
  :hover {
    border-radius: 100%;
    background-color: ${({ theme }) => theme.colors.GREY_MEDIUM};
  }
`;

export const FormControlLabel = styled(MuiFormControlLabel)`
  margin: 0 0 0 8px;
  .MuiFormControlLabel-label {
    font-size: 14px;
  }
`;

export const Switch = styled(MuiSwitch)`
  .Mui-checked {
    color: ${({ theme }) => theme.colors.PURPLE_HEAVY} !important;
  }
  .MuiSwitch-track {
    background-color: ${({ theme }) => theme.colors.PURPLE_MEDIUM} !important;
  }
`;
