import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MockLocalStorage } from "mocks";
import Main from "./Main";

describe("Main", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: new MockLocalStorage(),
      writable: true,
    });
  });

  it("should renders Main", async () => {
    const { findByPlaceholderText } = render(<Main />, {
      wrapper: MemoryRouter,
    });

    const inputElemnt = await findByPlaceholderText(/search value/i);
    expect(inputElemnt).toBeInTheDocument();
  });

  it("should take value from local storage", () => {
    const curentValueFromLocalStorage = "test";
    localStorage.setItem("searchValue", curentValueFromLocalStorage);
    const { getByPlaceholderText } = render(<Main />, {
      wrapper: MemoryRouter,
    });

    const inputElemnt = getByPlaceholderText(/search value/i);
    expect((inputElemnt as HTMLInputElement).value).toBe(
      curentValueFromLocalStorage
    );
  });

  it("should save value from input to local storage", () => {
    const testValue = "test react";

    const { unmount } = render(<Main />, {
      wrapper: MemoryRouter,
    });

    const searchInputValue = screen.getByPlaceholderText(
      "search value"
    ) as HTMLInputElement;

    fireEvent.change(searchInputValue, { target: { value: testValue } });
    unmount();

    expect(localStorage.getItem("searchValue")).toBe(testValue);
  });
});
