import FormSection from "./FormSection";
import FeedHeader from "./Header/FeedHeader";
import PostsList from "./Posts/PostsList";

export default function FeedContainer() {
  return (
    <>
      <FeedHeader isInPost={false} />
      <FormSection />
      <PostsList />
    </>
  );
}
