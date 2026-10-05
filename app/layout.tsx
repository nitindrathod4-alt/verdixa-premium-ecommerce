import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Verdixa — Nature’s Wellness, Made a Daily Ritual",
  description: "Premium botanical wellness products by Verdixa.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}