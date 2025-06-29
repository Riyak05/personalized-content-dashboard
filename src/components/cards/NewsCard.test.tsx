import React from "react";
import { render, screen } from "@testing-library/react";
import NewsCard from "./NewsCard";
import { Provider } from "react-redux";
import { store } from "../../features/store";

const article = {
  title: "Test News",
  description: "Test description",
  url: "http://example.com",
  urlToImage: "",
  publishedAt: "",
  source: { name: "Test Source" },
};

describe("NewsCard", () => {
  it("renders news article", () => {
    render(
      <Provider store={store}>
        <NewsCard article={article} />
      </Provider>
    );
    expect(screen.getByText("Test News")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByText(/favorite/i)).toBeInTheDocument();
  });
});
