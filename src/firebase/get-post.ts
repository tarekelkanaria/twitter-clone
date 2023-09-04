import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from ".";
import { RetrievedPostType } from "@/types";

export default async function getPost() {
  const queryRef = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  const posts = (await getDocs(queryRef)).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as RetrievedPostType[];
  return posts;
}
