import getPosts from "@/firebase/get-posts";
import AnimateClient from "@/Providers/AnimateClient";
import MotionClient from "@/Providers/MotionClient";
import IndividualPost from "./Post/IndividualPost";

export default async function PostsList() {
  const posts = await getPosts();

  return (
    <>
      {posts && (
        <section>
          <AnimateClient>
            {posts.map((post) => (
              <MotionClient key={post.id}>
                <IndividualPost {...post} />
              </MotionClient>
            ))}
          </AnimateClient>
        </section>
      )}
    </>
  );
}
