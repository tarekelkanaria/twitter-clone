import getPost from "@/firebase/get-post";
import getComments from "@/firebase/get-comments";
import FeedHeader from "@/components/Feed/Header/FeedHeader";
import IndividualPost from "@/components/Feed/Posts/Post/IndividualPost";
import CommentsList from "@/components/Feed/Posts/Post/Comments/CommentsList";
import type { PostPageProps } from "@/types";

export default async function Post({ params }: PostPageProps) {
  const { id } = params;
  const post = await getPost(id);
  const comments = await getComments(id);
  const hasComments = comments.length > 0;

  return (
    <>
      {post && (
        <>
          <FeedHeader isInPost={true} />
          <IndividualPost {...post} hasComments={hasComments} />
          <CommentsList commentsList={comments} />
        </>
      )}
    </>
  );
}
