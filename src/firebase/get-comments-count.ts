"use server";

import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "./config";

export default async function getCommentsCount(id: string) {
  const commentsSnapshot = await getCountFromServer(
    collection(db, "posts", id, "comments")
  );
  return commentsSnapshot.data().count;
}
