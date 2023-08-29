"use client";

import { useState } from "react";
import type { NewsItemType } from "@/types";
import NewsItem from "./NewsItem";

type Props = {
  items: NewsItemType[];
};

const News = ({ items }: Props) => {
  const [articlesCount, setArticlesCount] = useState<number>(3);
  const showedItems = items.slice(0, articlesCount);

  return (
    <section className="widget-container">
      <h2 className="widget-title">What&apos;s happening</h2>
      {showedItems.map((item) => (
        <NewsItem key={item.title} {...item} />
      ))}
      <button
        type="button"
        onClick={() => setArticlesCount((prevArticles) => prevArticles + 3)}
        className="widget-btn"
      >
        Show more
      </button>
    </section>
  );
};

export default News;
