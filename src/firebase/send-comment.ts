"use server";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./config";
import { revalidatePath } from "next/cache";
import type { UploadedCommentType } from "@/types";

export default async function sendComment({
  id,
  uid,
  name,
  userName,
  userImg,
  text,
}: UploadedCommentType) {
  await addDoc(collection(db, "posts", id, "comments"), {
    name,
    uid,
    userName,
    userImg,
    text,
    timestamp: serverTimestamp(),
  });
  revalidatePath(`/`);
  revalidatePath(`/posts/${id}`);
}
