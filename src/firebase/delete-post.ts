"use server";

import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from ".";
import { deleteObject, ref } from "firebase/storage";
import { revalidatePath } from "next/cache";

export default async function deletePost(postId: string, postImg?: string) {
  await deleteDoc(doc(db, "posts", postId));
  if (postImg) {
    await deleteObject(ref(storage, `posts/${postId}/image`));
  }
  revalidatePath("/");
}
