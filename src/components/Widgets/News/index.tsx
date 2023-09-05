"use client";

import { useState } from "react";
import AnimateClient from "@/Providers/AnimateClient";
import MotionClient from "@/Providers/MotionClient";
import type { NewsProps } from "@/types";
import NewsItem from "./NewsItem";

const News = ({ items, count }: NewsProps) => {
  const [articlesCount, setArticlesCount] = useState<number>(3);
  const showedItems = items.slice(0, articlesCount);

  return (
    <section className="widget-container">
      <h2 className="widget-title">What&apos;s happening</h2>
      <AnimateClient>
        {showedItems.map((item) => (
          <MotionClient key={item.title}>
            <NewsItem {...item} />
          </MotionClient>
        ))}
      </AnimateClient>
      {articlesCount < count && (
        <button
          type="button"
          onClick={() => setArticlesCount((prevArticles) => prevArticles + 3)}
          className="widget-btn"
        >
          Show more
        </button>
      )}
    </section>
  );
};

export default News;
