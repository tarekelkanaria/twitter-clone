"use client";

import getMorePosts from "@/firebase/get-more-posts";
import { useEffect, useState } from "react";
import AnimateClient from "@/Providers/AnimateClient";
import MotionClient from "@/Providers/MotionClient";
import type { ClientRetrievedPostType, PostsListProps } from "@/types";
import IndividualPost from "./Post/IndividualPost";

const PostsList = ({ initialPosts }: PostsListProps) => {
  const [posts, setPosts] = useState<ClientRetrievedPostType[]>(initialPosts);
  const stringCopyOfPosts = JSON.stringify(initialPosts);

  useEffect(() => {
    setPosts(initialPosts);
  }, [stringCopyOfPosts]);

  const updatePosts = async (lastPostTime: Date) => {
    await getMorePosts(lastPostTime).then((newPosts) =>
      setPosts((prevPosts) => [...prevPosts, ...newPosts])
    );
  };

  return (
    <>
      {posts && (
        <section>
          <AnimateClient>
            {posts.map((post, index) => (
              <MotionClient key={post.id}>
                <IndividualPost
                  {...post}
                  isLast={index === posts.length - 1}
                  getNewPosts={updatePosts}
                />
              </MotionClient>
            ))}
          </AnimateClient>
        </section>
      )}
    </>
  );
};

export default PostsList;
