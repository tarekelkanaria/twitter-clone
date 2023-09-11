"use server";

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "./config";
import { Timestamp } from "firebase/firestore";
import type { ClientRetrievedPostType } from "@/types";

export default async function getMorePosts(startKey: Date) {
  const queryRef = query(
    collection(db, "posts"),
    orderBy("timestamp", "desc"),
    limit(4),
    startAfter(Timestamp.fromDate(startKey))
  );
  const morePosts = (await getDocs(queryRef)).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data().timestamp.toDate(),
  })) as ClientRetrievedPostType[];
  return morePosts;
}
