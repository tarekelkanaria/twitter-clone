import type { FollowerProfile, NewsItemType } from "@/types";
import SearchBar from "./SearchBar";
import News from "./News";
import Followers from "./Followers";

export default async function Widgets() {
  const newsResponse = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json"
  );
  if (!newsResponse.ok) throw new Error("Error has occurred");

  const news = await newsResponse.json();
  const { articles }: { articles: NewsItemType[] } = news;

  const followersResponse = await fetch(
    "https://randomuser.me/api/?results=30&inc=name,login,picture"
  );

  if (!followersResponse.ok) throw new Error("Error has occurred");

  const followers = await followersResponse.json();
  const { results }: { results: FollowerProfile[] } = followers;

  return (
    <aside className="ml-8 w-[400px] xl:w-[500px] relative space-y-5 hidden lg:block">
      <SearchBar />
      <News items={articles} />
      <Followers items={results} />
    </aside>
  );
}
