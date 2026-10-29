import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useToggle } from "../hooks/useToggle";

describe("useToggle hook", () => {
  it("starts with the provided initial value (false by default)", () => {
    const { result } = renderHook(() => useToggle());
    const [value] = result.current;
    expect(value).toBe(false);
  });

  it("starts with true when initialValue is true", () => {
    const { result } = renderHook(() => useToggle(true));
    const [value] = result.current;
    expect(value).toBe(true);
  });

  it("flips false → true when toggle() is called", () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      const [, toggle] = result.current;
      toggle();
    });

    const [value] = result.current;
    expect(value).toBe(true);
  });

  it("flips back to false when toggle() is called a second time", () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1]();
    });

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(false);
  });
});
