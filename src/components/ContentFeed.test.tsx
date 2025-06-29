import React from "react";
import { render, screen } from "@testing-library/react";
import ContentFeed from "./ContentFeed";
import { Provider } from "react-redux";
import { store } from "../features/store";

describe("ContentFeed", () => {
  it("renders without crashing and shows loading", () => {
    render(
      <Provider store={store}>
        <ContentFeed />
      </Provider>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument?.() ||
      expect(document.body.textContent?.toLowerCase()).toContain("loading");
  });
  // More tests can be added for infinite scroll and drag-and-drop using mocks
});
