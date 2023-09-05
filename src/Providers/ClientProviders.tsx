"use client";

import { SessionProvider } from "next-auth/react";
import type { ClientProvidersProps } from "@/types";

const ClientProviders = ({ children, session }: ClientProvidersProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default ClientProviders;
