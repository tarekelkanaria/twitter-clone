import { collection, getDocs } from "firebase/firestore";
import { db } from ".";
import { RetrievedLikeType } from "@/types";

export default async function getLikes(id: string) {
  const docRef = collection(db, "posts", id, "likes");
  const likes = (await getDocs(docRef)).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as RetrievedLikeType[];

  return likes;
}
