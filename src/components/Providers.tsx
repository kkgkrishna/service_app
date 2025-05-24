"use client";

import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--toast-bg)",
            color: "var(--toast-color)",
          },
          success: {
            className:
              "!bg-green-50 !text-green-800 dark:!bg-green-900/30 dark:!text-green-400",
          },
          error: {
            className:
              "!bg-red-50 !text-red-800 dark:!bg-red-900/30 dark:!text-red-400",
          },
        }}
      />
      {children}
    </>
  );
}
