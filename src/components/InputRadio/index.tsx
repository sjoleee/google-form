import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Controller, useFormContext } from "react-hook-form";

import { CardProps, ItemTypeProps, StateProps } from "../../store";
import * as S from "./styles";

const InputRadio = ({ id }: Pick<CardProps, "id">) => {
  const etcRef = useRef<HTMLInputElement>(null);
  const etcRefRadio = useRef<HTMLInputElement>(null);
  const { control } = useFormContext();

  const contents = useSelector((state: StateProps) => {
    const currentCard = state.cards.find((card) => card.id === id) as CardProps;
    return currentCard.contents;
  }) as ItemTypeProps[];

  return (
    <Controller
      control={control}
      name={id}
      render={({ field: { onChange } }) => (
        <S.RadioContainer>
          {contents.map((content) => (
            <div key={content.id}>
              <S.Radio
                ref={etcRefRadio}
                type="radio"
                name={id}
                id={content.id}
                value={content.isEtc ? etcRef.current?.value : content.text}
                onChange={(e) => {
                  if (content.isEtc) {
                    onChange(etcRef.current?.value);
                  } else {
                    onChange(e.target.value);
                  }
                }}
              />
              <S.Label htmlFor={content.id}>
                {content.isEtc ? (
                  <>
                    <span>기타: </span>
                    <S.TextField
                      id="standard-basic"
                      variant="standard"
                      inputRef={etcRef}
                      onChange={() => {
                        if (etcRefRadio.current?.checked) {
                          onChange(etcRef.current?.value);
                        }
                      }}
                    />
                  </>
                ) : (
                  content.text
                )}
              </S.Label>
            </div>
          ))}
        </S.RadioContainer>
      )}
    />
  );
};

export default InputRadio;
