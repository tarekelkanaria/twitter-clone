import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "./config";

export const getCommentsCount = async (id: string) => {
  const commentsSnapshot = await getCountFromServer(
    collection(db, "posts", id, "comments")
  );
  return commentsSnapshot.data().count;
};
