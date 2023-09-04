"use server";

import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from ".";
import { revalidatePath } from "next/cache";
import type { UploadedPost } from "@/types";

export async function getPostsCount() {
  const snapshot = await getCountFromServer(collection(db, "posts"));
  const postsCount = snapshot.data().count;
  return postsCount;
}

export async function sendPost({
  name,
  userName,
  userImg,
  postText,
  postImg,
}: UploadedPost) {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      name,
      userName,
      userImg,
      postText,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (postImg) {
      await uploadString(imageRef, postImg, "data_url").then(async () => {
        const downloadUrl = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "posts", docRef.id), {
          postImg: downloadUrl,
        });
      });
    } else {
      await updateDoc(doc(db, "posts", docRef.id), {
        postImg: null,
      });
    }
    revalidatePath("/");
    return await getPostsCount();
  } catch (error) {
    return error;
  }
}
