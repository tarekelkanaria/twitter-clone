import getPost from "@/firebase/get-post";
import AnimateClient from "@/Providers/AnimateClient";
import MotionClient from "@/Providers/MotionClient";
import Post from "./Post";

export default async function Posts() {
  const posts = await getPost();
  return (
    <>
      {posts && (
        <section>
          <AnimateClient>
            {posts.map((post) => (
              <MotionClient key={post.id}>
                <Post {...post} />
              </MotionClient>
            ))}
          </AnimateClient>
        </section>
      )}
    </>
  );
}
