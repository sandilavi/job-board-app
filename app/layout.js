'use client';
import { SessionProvider } from "next-auth/react";
import SessionWatcher from "./components/SessionWatcher";

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body>
        <SessionProvider>
          <SessionWatcher />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
