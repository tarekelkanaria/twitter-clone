import type { NewsItemType } from "@/types";

const NewsItem = ({
  title,
  url,
  urlToImage,
  source: { name: sourceName },
}: NewsItemType) => {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <article className="widget-item-container justify-between space-x-1">
        <div>
          <h3 className="mb-0.5 text-sm font-bold text-gray-700">{title}</h3>
          <p className="text-xs font-medium text-gray-500">{sourceName}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={urlToImage} alt={title} width="70" className="rounded-xl" />
      </article>
    </a>
  );
};

export default NewsItem;
