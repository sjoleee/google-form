import styled from "styled-components";
import { TextField as MuiTextField } from "@mui/material";

import { InputTypes } from "../../store";

export const TextField = styled(MuiTextField)<{
  $isTitle: boolean;
  $isFocused: boolean;
  $inputType: string;
}>`
  width: ${({ $isTitle, $inputType }) => {
    if ($isTitle) return "100%";
    if ($inputType === InputTypes.TEXT) return "365px";
    return "620px";
  }};

  div {
    font-size: 14px;

    ::before {
      border-bottom: ${({ $isTitle, $isFocused, theme }) => {
        if ($isTitle) {
          return $isFocused ? `1px solid ${theme.colors.GREY_HEAVY}` : "none";
        }
        return `1px dotted ${theme.colors.GREY_HEAVY}`;
      }} !important;
    }

    ::after {
      border-bottom: ${({ theme }) => `2px solid ${theme.colors.PURPLE_HEAVY}`};
    }
  }
`;
