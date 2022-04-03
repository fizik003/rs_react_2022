import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Header", () => {
  it("renders Header component", () => {
    const currentPageTest = "test";
    render(<Header currentPage={currentPageTest} />, { wrapper: MemoryRouter });
    const currentPage = screen.getByText(/test page/i);
    expect(currentPage).toBeInTheDocument();
  });

  it("should show navigation", () => {
    const { getByText } = render(<Header />, { wrapper: MemoryRouter });
    expect(getByText(/main page/i)).toBeInTheDocument();
    expect(getByText(/about us/i)).toBeInTheDocument();
  });

  it("should show logo", () => {
    const { getByText } = render(<Header />, { wrapper: MemoryRouter });
    expect(getByText(/logo/i)).toBeInTheDocument();
  });
});
