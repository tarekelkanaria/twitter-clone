import type { CommentsListProps } from "@/types";
import IndividualPost from "../IndividualPost";

export default function CommentsList({ commentsList }: CommentsListProps) {
  return (
    <section>
      {commentsList.length > 0 &&
        commentsList.map((comment) => (
          <IndividualPost
            key={comment.id}
            {...comment}
            id={comment.postId}
            commentId={comment.id}
            postText={comment.text}
            postImg={null}
          />
        ))}
    </section>
  );
}
