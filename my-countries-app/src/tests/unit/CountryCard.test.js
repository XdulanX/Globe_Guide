import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CountryCard from "../../components/CountryCard"; // adjust the path as needed

const mockCountry = {
  name: { common: "France" },
  flags: {
    svg: "https://flagcdn.com/fr.svg",
    png: "https://flagcdn.com/fr.png",
  },
  region: "Europe",
  capital: ["Paris"],
  population: 67000000,
  cca3: "FRA",
};

describe("CountryCard", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test("renders country information correctly", () => {
    render(
      <BrowserRouter>
        <CountryCard country={mockCountry} />
      </BrowserRouter>
    );
    expect(screen.getByText("France")).toBeInTheDocument();
    expect(screen.getByText("Europe")).toBeInTheDocument();
    expect(screen.getByText("Paris")).toBeInTheDocument();
    expect(screen.getByText("67,000,000")).toBeInTheDocument();
    // Flag image alt text
    expect(screen.getByAltText("Flag of France")).toBeInTheDocument();
  });

  test("add to favorites shows login notification if not logged in", () => {
    render(
      <BrowserRouter>
        <CountryCard country={mockCountry} />
      </BrowserRouter>
    );
    const favButton = screen.getByRole("button");
    fireEvent.click(favButton);
    // Since showNotification uses DOM, you can check for the notification text
    expect(document.body.textContent).toMatch(
      /please log in to add favorites/i
    );
  });

  test("add to favorites stores country in localStorage if logged in", () => {
    localStorage.setItem("currentUser", JSON.stringify("testuser"));
    render(
      <BrowserRouter>
        <CountryCard country={mockCountry} />
      </BrowserRouter>
    );
    const favButton = screen.getByRole("button");
    fireEvent.click(favButton);
    const stored = JSON.parse(localStorage.getItem('favorites_"testuser"'));
    expect(stored).toBeTruthy();
    expect(stored[0].cca3).toBe("FRA");
  });
});