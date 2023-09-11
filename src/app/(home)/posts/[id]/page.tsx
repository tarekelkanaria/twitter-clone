import getPost from "@/firebase/get-post";
import getComments from "@/firebase/get-comments";
import FeedHeader from "@/components/Feed/Header/FeedHeader";
import IndividualPost from "@/components/Feed/Posts/Post/IndividualPost";
import CommentsList from "@/components/Feed/Posts/Post/Comments/CommentsList";
import type { PostPageProps } from "@/types";

export default async function Post({ params }: PostPageProps) {
  const { id } = params;
  const post = await getPost(id).then((post) => ({
    ...post,
    timestamp: post.timestamp.toDate(),
  }));

  const comments = await getComments(id);
  const hasComments = comments.length > 0;
  const postCommentsCount = comments.length;

  return (
    <>
      {post && (
        <>
          <FeedHeader isInPost={true} />
          <IndividualPost
            {...post}
            hasComments={hasComments}
            postCommentsCount={postCommentsCount}
          />
          <CommentsList commentsList={comments} />
        </>
      )}
    </>
  );
}
