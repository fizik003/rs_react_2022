import { ICard } from "interfaces";
import React from "react";
import { Card } from "..";

interface ICardListProps {
  cards: ICard[];
}

export function CardsList({ cards }: ICardListProps) {
  return (
    <div className=" py-2 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
      {cards.map(
        ({
          title,
          img,
          createdAt,
          createdBy,
          amountLikes,
          amountViews,
          id,
        }) => (
          <Card
            title={title}
            img={img}
            amountLikes={amountLikes}
            amountViews={amountViews}
            createdAt={createdAt}
            createdBy={createdBy}
            key={id}
          />
        )
      )}
    </div>
  );
}
