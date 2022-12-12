import styled from "styled-components";

export const PreviewSubmitSection = styled.div`
  display: flex;
  width: 640px;
  justify-content: space-between;
  margin-top: 16px;
`;

export const ClearButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.PURPLE_HEAVY};
  border-radius: 4px;
  padding: 6px;
  :hover {
    background-color: ${({ theme }) => theme.colors.BLUE_LIGHT};
  }
`;

export const SubmitButton = styled.button`
  width: 72px;
  height: 36px;
  background-color: ${({ theme }) => theme.colors.PURPLE_HEAVY};
  color: ${({ theme }) => theme.colors.WHITE};
  border: none;
  border-radius: 4px;
`;
