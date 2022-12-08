import styled from "styled-components";
import { TextField as MuiTextField } from "@mui/material";

export const TextField = styled(MuiTextField)<{ $isTitle: boolean; $isFocused: boolean }>``;
