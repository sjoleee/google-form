import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 16px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: ${({ theme }) => `1px solid ${theme.colors.GREY_HEAVY}`};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  min-height: 131px;
  width: 640px;
  padding: 24px;
  box-sizing: border-box;
  gap: 16px;
`;

export const TitleHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.PURPLE_HEAVY};
  min-width: 100%;
  width: 100%;
  height: 10px;
  z-index: 20;
`;

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
  border-radius: 4px;
  border: ${({ theme }) => `1px solid ${theme.colors.PURPLE_LIGHT}`};
`;

export const ResultTitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

export const ResultTitle = styled.span`
  font-size: 32px;
`;

export const ResultType = styled.span`
  font-size: 12px;
  background-color: ${({ theme }) => theme.colors.PURPLE_HEAVY};
  color: ${({ theme }) => theme.colors.WHITE};
  padding: 6px;
  border-radius: 4px;
`;

export const RequiredMark = styled.span`
  font-size: 12px;
  background-color: ${({ theme }) => theme.colors.RED};
  color: ${({ theme }) => theme.colors.WHITE};
  padding: 6px;
  border-radius: 4px;
`;

export const ResultAnswerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const NoTextAnswer = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.RED};
`;

export const TextAnswer = styled.span`
  font-size: 16px;
`;

export const TrueAnswerMark = styled.span`
  width: fit-content;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.BLUE_HEAVY};
  color: ${({ theme }) => theme.colors.WHITE};
  padding: 6px;
  border-radius: 4px;
  margin-bottom: 8px;
`;

export const FalseAnswerMark = styled.span`
  width: fit-content;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.RED};
  color: ${({ theme }) => theme.colors.WHITE};
  padding: 6px;
  border-radius: 4px;
  margin-bottom: 8px;
`;

export const SelectAnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
`;

export const SelectAnswer = styled.span`
  font-size: 16px;
  margin: 4px 0;
`;
