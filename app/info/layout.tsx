import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";

const harmoniaSans = localFont({
  src: [
    {
      path: "../fonts/HarmoniaSansProCyr-Regular.otf", // Absolute path from `public`
      weight: "300"
    }
  ],
  variable: "--font-harmonia-sans",
});
const theSeasons = localFont({
  src: [
    {
      path: "../fonts/Fontspring-DEMO-theseasons-bd.otf", // Absolute path from `public`
      weight: "900"
    },
    {
      path: "../fonts/Fontspring-DEMO-theseasons-lt.otf", // Absolute path from `public`
      weight: "400"
    }
  ],
  variable: "--font-the-seasons",
})

export const metadata: Metadata = {
  title: "Santa Phone Calls",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${harmoniaSans.variable} bg-[url('/christmas.jpeg')] bg-black/60 bg-cover bg-center bg-no-repeat h-screen w-full ${theSeasons.variable} antialiased`}
      >
        <div style={{background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 50%)'}} className="absolute inset-0"></div>

        {children}
      </body>
    </html>
  );
}