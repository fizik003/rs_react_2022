/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import React from "react";
import { render } from "@testing-library/react";
import { cardsMock } from "mocks";
// import { Card } from "./PersoneCard";

describe("Card", () => {
  it("should shows card is right", () => {
    const { amountLikes, amountViews, createdAt, createdBy, img, title } =
      cardsMock[0];

    // const { getByText, getByAltText } = render();
    // <Card
    //   amountLikes={amountLikes}
    //   amountViews={amountViews}
    //   createdAt={createdAt}
    //   createdBy={createdBy}
    //   img={img}
    //   title={title}
    // />

    // expect(getByText(amountLikes)).toBeInTheDocument();
    // expect(getByText(amountViews)).toBeInTheDocument();
    // expect(getByText(new Date(createdAt).toDateString())).toBeInTheDocument();
    // expect(getByText(createdBy)).toBeInTheDocument();
    // expect(getByAltText("Card img").getAttribute("src")).toEqual(img);
    // expect(getByText(title)).toBeInTheDocument();
  });
});
