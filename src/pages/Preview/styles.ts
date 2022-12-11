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
