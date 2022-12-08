import styled from "styled-components";
import { Fab as MuiFab } from "@mui/material";

export const Fab = styled(MuiFab)`
  position: fixed;
  background-color: ${({ theme }) => theme.colors.WHITE};
  color: ${({ theme }) => theme.colors.BLACK};
  border: ${({ theme }) => `1px solid ${theme.colors.GREY_HEAVY}`};
  border-radius: 8px;
  box-shadow: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.GREY_LIGHT};
  }
`;
