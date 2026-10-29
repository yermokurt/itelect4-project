import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

// Provide router context that LoginPage needs (useNavigate, Link)
function renderLoginPage() {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
}

describe("LoginPage form validation", () => {
  // Spy on fetch so we can assert no network call was made
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    fetchSpy = vi.spyOn(globalThis, "fetch");
  });

  it("shows 'Please enter your email address.' when email is empty and form is submitted", async () => {
    const user = userEvent.setup();
    renderLoginPage();

    // Submit without filling in any field
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(
      screen.getByText("⚠️ Please enter your email address.")
    ).toBeInTheDocument();

    // Fetch must never have been called – no API request sent for invalid input
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("shows 'Please enter your password.' when email is filled but password is empty", async () => {
    const user = userEvent.setup();
    renderLoginPage();

    // Fill in only the email field
    await user.type(screen.getByLabelText(/email address/i), "student@dlsl.edu.ph");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(
      screen.getByText("⚠️ Please enter your password.")
    ).toBeInTheDocument();

    // Still no API call
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
