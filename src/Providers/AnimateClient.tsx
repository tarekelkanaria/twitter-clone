"use client";

import { AnimatePresence } from "framer-motion";
import type { ParentProps } from "@/types";

const AnimateClient = ({ children }: ParentProps) => {
  return <AnimatePresence>{children}</AnimatePresence>;
};

export default AnimateClient;
