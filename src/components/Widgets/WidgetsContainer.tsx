import type { FollowerProfile, NewsItemType } from "@/types";
import SearchBar from "./SearchBar";
import NewsList from "./News/NewsList";
import FollowersList from "./Followers/FollowersList";

export default async function WidgetsContainer() {
  const newsResponse = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json"
  );
  if (!newsResponse.ok) throw new Error("Error has occurred");

  const news = await newsResponse.json();
  const {
    articles,
    totalResults,
  }: { articles: NewsItemType[]; totalResults: number } = news;

  const followersResponse = await fetch(
    "https://randomuser.me/api/?results=30&inc=name,login,picture"
  );

  if (!followersResponse.ok) throw new Error("Error has occurred");

  const followers = await followersResponse.json();
  const { results }: { results: FollowerProfile[] } = followers;

  return (
    <aside className="ml-8 w-[400px] xl:w-[500px] relative space-y-5 hidden lg:block">
      <SearchBar />
      <NewsList items={articles} count={totalResults} />
      <FollowersList items={results} />
    </aside>
  );
}
