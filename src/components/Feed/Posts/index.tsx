import getPost from "@/firebase/get-post";
import Post from "./Post";

export default async function Posts() {
  const posts = await getPost();
  return (
    <>
      {posts && (
        <section>
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </section>
      )}
    </>
  );
}
