"use server";

import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db, storage } from "./config";
import { deleteObject, ref } from "firebase/storage";
import { revalidatePath } from "next/cache";

const deleteNestedCollections = async (docPath: string, docId: string) => {
  const likesSnapshot = await getDocs(collection(db, docPath, docId, "likes"));
  const commentsSnapshot = await getDocs(
    collection(db, docPath, docId, "comments")
  );

  if (likesSnapshot.docs) {
    likesSnapshot.docs.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  }
  if (commentsSnapshot.docs) {
    commentsSnapshot.docs.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  }
};

export default async function deletePost(postId: string, postImg?: string) {
  await deleteDoc(doc(db, "posts", postId));
  await deleteNestedCollections("posts", postId);

  if (postImg) {
    await deleteObject(ref(storage, `posts/${postId}/image`));
  }

  revalidatePath("/");
}
