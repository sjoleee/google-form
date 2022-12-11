import styled from "styled-components";
import { TextField as MuiTextField } from "@mui/material";

export const Radio = styled.input`
  appearance: none;
  border: ${({ theme }) => `2px solid ${theme.colors.GREY_EXTRA_HEAVY}`};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  :checked {
    border: ${({ theme }) => `6px solid ${theme.colors.PURPLE_HEAVY}`};
  }
`;

export const TextField = styled(MuiTextField)`
  width: 200px;

  div {
    font-size: 14px;

    ::before {
      border-bottom: ${({ theme }) => `1px solid ${theme.colors.GREY_HEAVY}`} !important;
    }

    ::after {
      border-bottom: ${({ theme }) => `2px solid ${theme.colors.PURPLE_HEAVY}`};
    }
  }
`;
