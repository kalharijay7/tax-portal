"use client";

import { AuthPage } from "@/components/auth/auth-page";
import { useEffect, useState } from "react";

export default function SignupPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <AuthPage />;
}
