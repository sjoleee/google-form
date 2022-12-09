import styled from "styled-components";
import { TextField as MuiTextField, Select as MuiSelect } from "@mui/material";

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const TextField = styled(MuiTextField)<{ $isTitle: boolean; $isFocused: boolean }>`
  width: ${({ $isTitle }) => ($isTitle ? "100%" : "492px")};
  padding: 8px 0;

  div {
    font-size: ${({ $isTitle }) => ($isTitle ? "32px" : "16px")};
    padding: ${({ $isTitle, $isFocused }) => {
      if ($isFocused) {
        return $isTitle ? 0 : "16px";
      }
      return 0;
    }};
    background-color: ${({ $isTitle, $isFocused, theme }) => {
      if ($isFocused) {
        return $isTitle ? "transparent" : theme.colors.GREY_LIGHT;
      }
      return "transparent";
    }};

    ::before {
      border-bottom: ${({ $isFocused, theme }) =>
        $isFocused ? `1px solid ${theme.colors.GREY_HEAVY}` : "none"};
    }

    ::after {
      border-bottom: ${({ theme }) => `2px solid ${theme.colors.PURPLE_HEAVY}`};
    }
  }

  input {
    padding: 0;
  }
`;

export const Select = styled(MuiSelect)`
  width: 208px;
  height: 48px;
  fieldset {
    border-color: ${({ theme }) => theme.colors.GREY_HEAVY} !important;
    border-width: 1px !important;
  }
`;
