import type { CommentsListProps } from "@/types";
import IndividualPost from "../IndividualPost";
import AnimateClient from "@/Providers/AnimateClient";
import MotionClient from "@/Providers/MotionClient";

export default function CommentsList({ commentsList }: CommentsListProps) {
  return (
    <section>
      {commentsList.length > 0 && (
        <AnimateClient>
          {commentsList.map((comment) => (
            <MotionClient key={comment.id}>
              <IndividualPost
                {...comment}
                id={comment.postId}
                commentId={comment.id}
                postText={comment.text}
                postImg={null}
                timestamp={comment.timestamp.toDate()}
              />
            </MotionClient>
          ))}
        </AnimateClient>
      )}
    </section>
  );
}
