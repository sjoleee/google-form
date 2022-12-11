import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 8px;
`;

export const TitleSection = styled.div`
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

export const DescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const Description = styled.span`
  font-size: 16px;
  margin-bottom: 16px;
`;

export const Footer = styled.div`
  width: 100%;
  padding: 24px 0 0 0;
  border-top: ${({ theme }) => `1px solid ${theme.colors.GREY_HEAVY}`};
`;
