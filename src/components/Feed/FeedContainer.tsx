import FormSection from "./FormSection";
import Header from "./Header";
import PostsList from "./Posts/PostsList";

export default function FeedContainer() {
  return (
    <>
      <Header isInPost={false} />
      <FormSection />
      <PostsList />
    </>
  );
}
