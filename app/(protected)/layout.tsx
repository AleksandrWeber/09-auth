import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { isAuthenticated } from "@/lib/auth";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/sign-in");
  }

  return <>{children}</>;
}
