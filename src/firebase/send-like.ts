"use server";

import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./config";
import { revalidatePath } from "next/cache";
import { UploadedLikeType } from "@/types";

export default async function sendLike({
  id,
  userId,
  userName,
  userImg,
  hasLiked,
  commentId,
}: UploadedLikeType) {
  let docRef = doc(db, "posts", id, "likes", userId);
  if (commentId)
    docRef = doc(db, "posts", id, "comments", commentId, "likes", userId);
  if (hasLiked) {
    await deleteDoc(docRef);
  } else {
    await setDoc(docRef, {
      userName,
      userImg,
    });
  }
  if (commentId) revalidatePath(`/posts/${id}`);
  else revalidatePath("/");
}
