/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { CardProps, InputTypes, ItemTypeProps, StateProps } from "../../store";
import * as S from "./styles";

interface AnswerProps {
  trueAnswer: string[];
  falseAnswer: string[];
}

interface ResultCardDataProps {
  id: string;
  title: string;
  inputType: string;
  answer: AnswerProps;
  isRequired: boolean;
}

const Result = () => {
  const { state } = useLocation();
  const [resultData, setResultData] = useState<ResultCardDataProps[]>([]);
  const { cards } = useSelector((state: StateProps) => state);

  useEffect(() => {
    const originalCardsArr = [] as CardProps[];
    for (const property in cards) {
      if (cards[property].inputType !== InputTypes.TITLE) {
        originalCardsArr.push(cards[property]);
      }
    }

    const resultCardsDataArr: ResultCardDataProps[] = [];
    for (let i = 0; i < originalCardsArr.length; i++) {
      const resultCardData: ResultCardDataProps = {
        id: originalCardsArr[i].id,
        title: originalCardsArr[i].cardTitle,
        inputType: originalCardsArr[i].inputType,
        answer: { trueAnswer: [], falseAnswer: [] },
        isRequired: originalCardsArr[i].isRequired,
      };

      const contentsResult = state[originalCardsArr[i].id];

      if (typeof contentsResult !== "object") {
        if (resultCardData.inputType === InputTypes.SELECT) {
          const originalContents = originalCardsArr[i].contents as ItemTypeProps[];
          const selectResultText = originalContents.find(
            (content) => content.id === contentsResult,
          )?.text;
          if (selectResultText) resultCardData.answer.trueAnswer.push(selectResultText);
        } else if (contentsResult) {
          resultCardData.answer.trueAnswer.push(contentsResult);
        }
      } else {
        const contentsResultArr = [] as { [key: string]: string }[];
        for (const property in contentsResult) {
          contentsResultArr.push({ [property]: contentsResult[property] });
        }

        contentsResultArr.forEach((result: { [key: string]: string }) => {
          if (Object.values(result)[0]) {
            const contentsArr = originalCardsArr[i].contents as ItemTypeProps[];
            if (contentsArr.find((content) => content.id === Object.keys(result)[0])) {
              const trueAnswerText = contentsArr.find(
                (content) => content.id === Object.keys(result)[0],
              )?.text as string;
              resultCardData.answer.trueAnswer.push(trueAnswerText);
            }
          } else {
            const contentsArr = originalCardsArr[i].contents as ItemTypeProps[];
            if (contentsArr.find((content) => content.id === Object.keys(result)[0])) {
              const falseAnswerText = contentsArr.find(
                (content) => content.id === Object.keys(result)[0],
              )?.text as string;
              resultCardData.answer.falseAnswer.push(falseAnswerText);
            }
          }
        });
      }

      resultCardsDataArr.push(resultCardData);
    }

    setResultData(resultCardsDataArr);
  }, []);

  const textAnswer = (inputType: string) =>
    inputType === InputTypes.TEXT || inputType === InputTypes.TEXTAREA;

  const noAnswer = ({ trueAnswer, falseAnswer }: AnswerProps) => {
    if (trueAnswer.length === 0 && falseAnswer.length === 0) return true;
    return false;
  };

  return (
    <S.Container>
      <S.Card>
        <S.TitleHighlight />
        {resultData.map((card) => (
          <S.ResultContainer>
            <S.ResultTitleSection>
              <S.ResultTitle>{card.title}</S.ResultTitle>
              {card.inputType === InputTypes.TEXT ? <S.ResultType>단답형</S.ResultType> : null}
              {card.inputType === InputTypes.TEXTAREA ? <S.ResultType>장문형</S.ResultType> : null}
              {card.inputType === InputTypes.RADIO ? (
                <S.ResultType>객관식 질문</S.ResultType>
              ) : null}
              {card.inputType === InputTypes.CHECKBOX ? (
                <S.ResultType>체크박스</S.ResultType>
              ) : null}
              {card.inputType === InputTypes.SELECT ? <S.ResultType>드롭다운</S.ResultType> : null}
              {card.isRequired ? <S.RequiredMark>필수</S.RequiredMark> : null}
            </S.ResultTitleSection>
            <S.ResultAnswerSection>
              {!textAnswer(card.inputType) ? null : noAnswer({
                  trueAnswer: card.answer.trueAnswer,
                  falseAnswer: card.answer.falseAnswer,
                }) ? (
                <S.NoTextAnswer> 응답하지 않았습니다.</S.NoTextAnswer>
              ) : (
                <S.TextAnswer>💬 {card.answer.trueAnswer}</S.TextAnswer>
              )}

              {textAnswer(card.inputType) ? null : card.answer.trueAnswer.length > 0 ? (
                <S.SelectAnswerContainer>
                  <S.TrueAnswerMark>선택한 항목</S.TrueAnswerMark>

                  {card.answer.trueAnswer.map((answer) => (
                    <S.SelectAnswer>✅ {answer}</S.SelectAnswer>
                  ))}
                </S.SelectAnswerContainer>
              ) : (
                <S.NoTextAnswer> 응답하지 않았습니다.</S.NoTextAnswer>
              )}

              {textAnswer(card.inputType) ? null : card.inputType !== InputTypes.SELECT &&
                card.inputType !== InputTypes.RADIO ? (
                <S.SelectAnswerContainer>
                  <S.FalseAnswerMark>선택하지 않은 항목</S.FalseAnswerMark>
                  {card.answer.falseAnswer.map((answer) => (
                    <S.SelectAnswer>⬜️ {answer}</S.SelectAnswer>
                  ))}
                </S.SelectAnswerContainer>
              ) : null}
            </S.ResultAnswerSection>
          </S.ResultContainer>
        ))}
      </S.Card>
    </S.Container>
  );
};

export default Result;
