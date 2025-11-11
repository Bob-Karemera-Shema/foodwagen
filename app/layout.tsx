import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "FoodWagen",
  description: "Find the best food near you with FoodWagen!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceSans3.className} antialiased`}
      >
        <Toaster position="top-right" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
