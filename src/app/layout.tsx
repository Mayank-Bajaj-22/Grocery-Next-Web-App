import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Snapcart | 10 minutes grocery delivery app",
  description: "10 minutes grocery delivery app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full h-screen bg-linear-to-b from-green-100 to-white">
        {children}
      </body>
    </html>
  );
}
