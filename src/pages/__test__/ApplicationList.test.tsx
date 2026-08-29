import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ApplicationList from "../ApplicationList";

describe("ApplicationList", () => {
  it("filters visible applications by applicant search", async () => {
    render(
      <MemoryRouter>
        <ApplicationList />
      </MemoryRouter>,
    );

    // Wait for mock API data
    expect(await screen.findByText("Aarav Sharma")).toBeInTheDocument();
    expect(screen.getByText("Priya Nair")).toBeInTheDocument();

    // Search by applicant name
    const searchInput = screen.getByPlaceholderText(/search by applicant/i);

    fireEvent.change(searchInput, { target: { value: "aarav" } });

    // Matching applicant remains
    expect(screen.getByText("Aarav Sharma")).toBeInTheDocument();

    // Non-matching applicant is filtered out
    expect(screen.queryByText("Priya Nair")).not.toBeInTheDocument();
  });
});
