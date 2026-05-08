"use client";

import { Navbar } from "./navbar";
import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-6 lg:py-8">
        {children}
      </main>
    </div>
  );
}
