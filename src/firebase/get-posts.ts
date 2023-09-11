import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "./config";
import type { RetrievedPostType } from "@/types";

export default async function getPosts() {
  const queryRef = query(
    collection(db, "posts"),
    orderBy("timestamp", "desc"),
    limit(4)
  );
  const posts = (await getDocs(queryRef)).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as RetrievedPostType[];
  return posts;
}
