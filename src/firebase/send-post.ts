"use server";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "./config";
import { revalidatePath } from "next/cache";
import type { UploadedPostType } from "@/types";

export default async function sendPost({
  uid,
  name,
  userName,
  userImg,
  postText,
  postImg,
}: UploadedPostType) {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      uid,
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
  } catch (error) {
    return error;
  }
}
