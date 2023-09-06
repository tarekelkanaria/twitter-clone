"use client";

import { SessionProvider } from "next-auth/react";
import { Provider as StateProvider } from "react-redux";
import store from "@/redux/store";
import type { ClientProvidersProps } from "@/types";

const ClientProviders = ({ children, session }: ClientProvidersProps) => {
  return (
    <SessionProvider session={session}>
      <StateProvider store={store}>{children}</StateProvider>
    </SessionProvider>
  );
};

export default ClientProviders;
