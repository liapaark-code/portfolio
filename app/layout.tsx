import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import SmoothScroll from "./components/SmoothScroll";
import ScrollReveal from "./components/ScrollReveal";

const clother = localFont({
  src: [
    { path: "../public/fonts/TRYClother-Light.ttf",      weight: "300", style: "normal" },
    { path: "../public/fonts/TRYClother-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "../public/fonts/TRYClother-Regular.ttf",    weight: "400", style: "normal" },
    { path: "../public/fonts/TRYClother-Italic.ttf",     weight: "400", style: "italic" },
    { path: "../public/fonts/TRYClother-Bold.ttf",       weight: "700", style: "normal" },
    { path: "../public/fonts/TRYClother-BoldItalic.ttf", weight: "700", style: "italic" },
    { path: "../public/fonts/TRYClother-Black.ttf",      weight: "900", style: "normal" },
    { path: "../public/fonts/TRYClother-BlackItalic.ttf",weight: "900", style: "italic" },
  ],
  variable: "--font-clother",
});

export const metadata: Metadata = {
  title: "Lydia Park",
  description: "Portfolio",
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon2.png",   sizes: "any" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${clother.variable} antialiased`}>
        {/* Apply the stored theme before first paint so dark mode doesn't flash light */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.theme==="dark")document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
        <CustomCursor />
        <SmoothScroll />
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
