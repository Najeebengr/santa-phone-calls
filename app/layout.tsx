import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import { AnalyticsProvider } from "./components/Analytics-Provider";
import { seoConfig, getRobotsContent, getSchemaString } from "@/seo.config";
import Script from "next/script";

const harmoniaSans = localFont({
  src: [
    {
      path: "/fonts/HarmoniaSansProCyr-Regular.otf", // Absolute path from `public`
      weight: "300",
    },
  ],
  variable: "--font-harmonia-sans",
});
const theSeasons = localFont({
  src: [
    {
      path: "/fonts/Fontspring-DEMO-theseasons-bd.otf", // Absolute path from `public`
      weight: "900",
    },
    {
      path: "/fonts/Fontspring-DEMO-theseasons-lt.otf", // Absolute path from `public`
      weight: "400",
    },
  ],
  variable: "--font-the-seasons",
});

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.canonicalUrl),
  title: seoConfig.title,
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  authors: seoConfig.authors,
  openGraph: seoConfig.openGraph,
  twitter: seoConfig.twitter,
  icons: seoConfig.icons,
  robots: getRobotsContent(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if font variables are defined before using them
  // const fontClasses = [
  //   harmoniaSans.variable,
  //   theSeasons.variable,
  //   "antialiased",
  // ]
  //   .filter(Boolean)
  //   .join(" ");

  return (
    <html lang="en">
      <head>
        {seoConfig.dnsPrefetch.map((href) => (
          <link key={href} rel="dns-prefetch" href={href} />
        ))}
        {getSchemaString().map((schema, index) => (
          <Script
            key={`schema-${index}`}
            id={`schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: schema }}
            strategy="worker"
          />
        ))}
      </head>
      <body
        className={`${harmoniaSans?.variable || ""}   ${theSeasons?.variable || ""} antialiased`}
      >
        {children}
        <Toaster position="top-right" reverseOrder={false} />
        <AnalyticsProvider />
      </body>
    </html>
  );
}
