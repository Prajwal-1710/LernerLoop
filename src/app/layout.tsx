import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "LearnLoop Intelligence",
  description: "Learning that understands every student. Education that works everywhere.",
  manifest: "/manifest.json",
  themeColor: "#0f172a",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LearnLoop Intelligence",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <AuthProvider>
        <body className="min-h-full flex flex-col">
          {children}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.register('/sw.js').then(reg => {
                    console.log('Service Worker registered:', reg.scope);
                  }).catch(err => {
                    console.log('Service Worker registration failed:', err);
                  });
                }
              `,
            }}
          />
        </body>
      </AuthProvider>
    </html>
  );
}
