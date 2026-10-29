import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ItemCard from "../components/ItemCard";
import type { Item } from "../types";
import { ItemStatus } from "../types";

// Sample item data based on the real Item interface
const sampleItem: Item = {
  id: "abc123",
  title: "Blue Water Bottle",
  description: "A blue Hydro Flask left at the library entrance.",
  location: "Main Library – Ground Floor",
  reportedByUserId: "user-42",
  status: ItemStatus.Found,
};

describe("ItemCard component", () => {
  it("renders the item title, location, and status badge", () => {
    render(<ItemCard item={sampleItem} onSelect={vi.fn()} />);

    // Title is always shown
    expect(screen.getByText("Blue Water Bottle")).toBeInTheDocument();

    // Location text comes from the item.location prop
    expect(screen.getByText("Location: Main Library – Ground Floor")).toBeInTheDocument();

    // Status badge reflects the item.status value exactly
    expect(screen.getByText("FOUND")).toBeInTheDocument();
  });

  it("hides the description when variant is compact", () => {
    render(<ItemCard item={sampleItem} onSelect={vi.fn()} variant="compact" />);

    // In compact mode ItemCard omits the description paragraph
    expect(
      screen.queryByText(/A blue Hydro Flask left at the library entrance/i)
    ).not.toBeInTheDocument();
  });

  it("shows the description when variant is default", () => {
    render(<ItemCard item={sampleItem} onSelect={vi.fn()} variant="default" />);

    expect(
      screen.getByText("Description: A blue Hydro Flask left at the library entrance.")
    ).toBeInTheDocument();
  });
});




