"use server";

import { collection, getDocs } from "firebase/firestore";
import { db } from "./config";
import type { RetrievedLikeType } from "@/types";

export default async function getLikes(id: string, commentId?: string) {
  let docRef = collection(db, "posts", id, "likes");
  if (commentId)
    docRef = collection(db, "posts", id, "comments", commentId, "likes");
  const likes = (await getDocs(docRef)).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as RetrievedLikeType[];
  return likes;
}
