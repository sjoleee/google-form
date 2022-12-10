import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
`;

export const Title = styled.span<{ isTitle: boolean }>`
  padding: 8px 0;
  font-size: ${({ isTitle }) => (isTitle ? "32px" : "16px")};
`;

export const RequireMark = styled.span`
  padding-left: 4px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.RED};
`;
