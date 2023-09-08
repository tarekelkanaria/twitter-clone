"use server";

import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db, storage } from "./config";
import { deleteObject, ref } from "firebase/storage";
import { revalidatePath } from "next/cache";
import type { DeletedPostType } from "@/types";

const deleteNestedCollections = async (
  docPath: string,
  docId: string,
  subDoc?: string,
  subDocId?: string
) => {
  const commentsSnapshot = await getDocs(
    collection(db, docPath, docId, "comments")
  );
  if (commentsSnapshot.docs) {
    commentsSnapshot.docs.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  }

  const likesSnapshot = await getDocs(collection(db, docPath, docId, "likes"));

  if (likesSnapshot.docs) {
    likesSnapshot.docs.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  }

  const commentsLikesSnapshot = await getDocs(
    collection(db, docPath, docId, subDoc!, subDocId!, "likes")
  );
  if (commentsLikesSnapshot.docs) {
    likesSnapshot.docs.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  }
};

export default async function deletePost({
  postId,
  postImg,
  commentId,
}: DeletedPostType) {
  if (commentId) {
    await deleteDoc(doc(db, "posts", postId, "comments", commentId));
    await deleteNestedCollections("posts", postId, "comments", commentId);
    revalidatePath(`/posts/${postId}`);
    return;
  }
  await deleteDoc(doc(db, "posts", postId));
  await deleteNestedCollections("posts", postId);

  if (postImg) {
    await deleteObject(ref(storage, `posts/${postId}/image`));
  }

  revalidatePath("/");
}
