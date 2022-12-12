import styled from "styled-components";
import { TextField as MuiTextField } from "@mui/material";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
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

export const CheckboxContainer = styled.div`
  align-items: center;
`;

export const Checkbox = styled.input`
  display: none;

  + label {
    cursor: pointer;
    > span {
      padding-left: 12px;
    }

    ::before {
      content: "";
      display: inline-block;
      width: 15px;
      height: 15px;
      border: ${({ theme }) => `2px solid ${theme.colors.GREY_EXTRA_HEAVY}`};
      border-radius: 4px;
      vertical-align: middle;
    }
  }

  :checked {
    + label {
      ::before {
        content: "";
        background-color: ${({ theme }) => theme.colors.PURPLE_HEAVY};
        border-color: ${({ theme }) => theme.colors.PURPLE_HEAVY};
      }
    }
  }
`;
