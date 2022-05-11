import React from "react";
import { StarIcon } from "@heroicons/react/solid";

export interface PersoneCardProps {
  img: string;
  name: string;
  gender: string;
  status: string;
  cardClick(): void;
}

export function PersoneCard({
  status,
  gender,
  img,
  name,
  cardClick,
}: PersoneCardProps) {
  return (
    <div
      className="max-w-lg font-sans shadow-lg group overflow-hidden w-full cursor-pointer"
      onClick={cardClick}
      onKeyDown={cardClick}
      role="button"
      tabIndex={0}
    >
      <img
        src={img}
        className="h-60 object-cover w-full group-hover:scale-105 duration-500 ease-in-out"
        alt="Card img"
      />
      <div className="border-2">
        <div className="p-2 text-gray-500 border-b-2">
          <p className="font-bold text-lg text-blue-600">{name}</p>
          <p className="py-2 border-b-2">
            gender <span className="text-blue-500">{gender}</span>
          </p>
          <p className="text-center py-1">{status}</p>
        </div>

        <div className="flex p-2 justify-end bg-gray-100 text-gray-500">
          <button type="button">
            <StarIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
