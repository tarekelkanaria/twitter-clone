"use server";

import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from ".";
import { revalidatePath } from "next/cache";
import { UploadedLike } from "@/types";

export default async function likePost({
  id,
  userId,
  userName,
  userImg,
  hasLiked,
}: UploadedLike) {
  if (hasLiked) {
    await deleteDoc(doc(db, "posts", id, "likes", userId));
  } else {
    await setDoc(doc(db, "posts", id, "likes", userId), {
      userName,
      userImg,
    });
  }
  revalidatePath("/");
}
