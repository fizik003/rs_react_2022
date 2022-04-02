import React from "react";
import { ThumbUpIcon, EyeIcon, StarIcon } from "@heroicons/react/solid";

export interface ICardProps {
  img: string;
  title: string;
  createdBy: string;
  createdAt: number;
  amountLikes: number;
  amountViews: number;
}

export function Card({
  amountLikes,
  amountViews,
  createdAt,
  createdBy,
  img,
  title,
}: ICardProps) {
  return (
    <div className="max-w-lg font-sans shadow-lg group overflow-hidden">
      <img
        src={img}
        className="h-60 object-cover w-full group-hover:scale-105 duration-500 ease-in-out"
        alt=""
      />
      <div className="border-2">
        <div className="p-2 text-gray-500 border-b-2">
          <p className="font-bold text-lg text-blue-600 h-16 ">{title}</p>
          <p className="py-1 border-b-2">
            by <span className="text-blue-500">{createdBy}</span>
          </p>
          <p className="text-center py-1">
            {new Date(createdAt).toDateString()}
          </p>
        </div>

        <div className="flex p-2 bg-gray-100 text-gray-500">
          <div className="flex items-center mr-3">
            <button type="button" className="mr-1">
              <ThumbUpIcon className="h-5 w-5" />
            </button>
            {amountLikes}
          </div>
          <div className="flex items-center mr-auto">
            <EyeIcon className="h-5 w-5 mr-1" /> {amountViews}
          </div>
          <button type="button">
            <StarIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
