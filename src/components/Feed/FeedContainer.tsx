import getPosts from "@/firebase/get-posts";
import FormSection from "./FormSection";
import FeedHeader from "./Header/FeedHeader";
import PostsList from "./Posts/PostsList";
import type { ClientRetrievedPostType } from "@/types";

export default async function FeedContainer() {
  const posts: ClientRetrievedPostType[] = await getPosts().then((posts) =>
    posts.map((post) => ({
      ...post,
      timestamp: post.timestamp.toDate(),
    }))
  );

  return (
    <>
      <FeedHeader isInPost={false} />
      <FormSection />
      <PostsList initialPosts={posts} />
    </>
  );
}
