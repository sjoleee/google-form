import styled from "styled-components";

export const Button = styled.button`
  width: 72px;
  height: 36px;
  background-color: ${({ theme }) => theme.colors.PURPLE_HEAVY};
  color: ${({ theme }) => theme.colors.WHITE};
  border: none;
  border-radius: 4px;
`;
