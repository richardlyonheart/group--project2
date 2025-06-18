// layout.tsx
import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { AuthProvider } from '../context/authContext';

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"], 
  variable: "--font-merriweather",
});


export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "A marketplace for unique handcrafted items.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={merriweather.variable}>
      <body>
        <AuthProvider> 
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}