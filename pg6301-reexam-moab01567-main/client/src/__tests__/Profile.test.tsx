import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Profile } from "../components/profile/Profile";
import React from "react";
import * as profile from "../components/profile/Profile";

describe("Testing profile components", () => {
  test("renders", () => {
    const profilePictureExistSpy = vi.spyOn(profile, "checkIfGetAble");
    profilePictureExistSpy.mockReturnValue(new Promise(() => false));
    render(<Profile imgUrl={"http://test.com"} name={"test"} />);
    expect(screen.getByText("test")).toBeDefined();
  });
});
