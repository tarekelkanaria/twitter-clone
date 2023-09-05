"use server";

import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "./config";
import { revalidatePath } from "next/cache";
import { UploadedLikeType } from "@/types";

export default async function likePost({
  id,
  userId,
  userName,
  userImg,
  hasLiked,
}: UploadedLikeType) {
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
