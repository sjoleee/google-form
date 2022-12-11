import React from "react";
import { useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";

import PreviewCard from "../../components/PreviewCard";
import { StateProps } from "../../store";

const Preview = () => {
  const { cards } = useSelector((state: StateProps) => state);
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <div>
        {cards.map((card) => (
          <PreviewCard key={card.id} id={card.id} />
        ))}
      </div>
    </FormProvider>
  );
};

export default Preview;
