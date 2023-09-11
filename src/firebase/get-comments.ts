import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./config";
import type { RetrievedCommentType } from "@/types";

export default async function getComments(id: string) {
  const queryRef = query(
    collection(db, "posts", id, "comments"),
    orderBy("timestamp", "desc")
  );
  const comments = (await getDocs(queryRef)).docs.map((doc) => ({
    id: doc.id,
    postId: id,
    ...doc.data(),
  })) as RetrievedCommentType[];
  return comments;
}
