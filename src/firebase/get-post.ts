import { doc, getDoc } from "firebase/firestore";
import { db } from "./config";
import type { RetrievedPostType } from "@/types";

export default async function getPost(id: string) {
  const post = await getDoc(doc(db, "posts", id));
  return { id: post.id, ...post.data() } as RetrievedPostType;
}
