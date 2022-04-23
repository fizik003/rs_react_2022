import { Persone } from "interfaces";
import React from "react";
import { PersoneCard } from "..";

interface ICardListProps {
  items: Persone[];
}

export function CardsList({ items }: ICardListProps) {
  return (
    <div className=" py-2 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
      {items.map(({ image, name, id, gender, status }) => (
        <PersoneCard
          name={name}
          img={image}
          status={status}
          gender={gender}
          key={id}
        />
      ))}
    </div>
  );
}
