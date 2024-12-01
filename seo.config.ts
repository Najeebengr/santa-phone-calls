// seo.config.ts

export const seoConfig = {
  // Basic Metadata
  title: "Santa Phone Calls | Live Personalized Calls from Santa Claus",
  description:
    "Experience the magic of Christmas with live, personalized phone calls from Santa Claus! Delight your kids with a real-time conversation they'll never forget. Book now!",
  applicationName: "Santa Phone Calls",
  keywords: [
    "Santa phone calls",
    "Christmas",
    "Santa Claus",
    "kids",
    "personalized calls",
  ],
  authors: [{ name: "Santa Phone Calls" }],

  // Links & DNS
  canonicalUrl: "https://santaphonecalls.com",
  dnsPrefetch: ["//www.googletagmanager.com"],

  // Viewport
  viewport: "width=device-width, initial-scale=1",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://santaphonecalls.com/",
    siteName: "Santa Phone Calls",
    title: "Santa Phone Calls | Live Personalized Calls from Santa Claus",
    description:
      'Experience the magic of Christmas with live, personalized phone calls from Santa Claus! Delight your kids with a real-time conversation they"ll never forget. Book now!',
    images: [
      {
        url: "/santaphonecalls.png",
        width: 1179,
        height: 1561,
        type: "image/jpeg",
        alt: "Santa Phone Calls",
      },
      {
        url: "/giftbox.png",
        width: 512,
        height: 512,
        type: "image/png",
        alt: "Gift Box Icon",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Santa Phone Calls | Live Personalized Calls from Santa Claus",
    description:
      'Experience the magic of Christmas with live, personalized phone calls from Santa Claus! Delight your kids with a real-time conversation they"ll never forget. Book now!',
    images: ["/giftbox.png"],
  },

  // Icons
  icons: {
    icon: "/favicon-32x32-1.png",
    apple: "/favicon-32x32-1.png",
    shortcut: "/favicon-32x32-1.png",
    sizes: {
      "32": "/favicon-32x32-1.png",
      "192": "/favicon-32x32-1.png",
    },
  },

  // Verification Tags
  verification: {
    facebook: "kovayfjyoe8a57couoc46zwafuslh5",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },

  // Schema.org JSON-LD
  schema: {
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Santa Phone Calls | Live Personalized Calls from Santa Claus",
      alternateName: "Santa Calls Live | Personalized Holiday Magic for Kids",
      description:
        'Experience the magic of Christmas with live, personalized phone calls from Santa Claus! Delight your kids with a real-time conversation they"ll never forget. Book now!',
      url: "https://santaphonecalls.com",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://santaphonecalls.com/?s={search_term_string}",
        },
        "query-input": {
          "@type": "PropertyValueSpecification",
          valueRequired: true,
          valueName: "search_term_string",
        },
      },
    },
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Santa Phone Calls",
      url: "https://santaphonecalls.com/",
      logo: {
        "@type": "ImageObject",
        url: "/Favicon.png",
        width: 1448,
        height: 485,
      },
      sameAs: ["http://instagram.com/santaphonecalls"],
    },
  },

  // Alternative Languages
  alternateRefs: [
    {
      rel: "alternate",
      type: "application/rss+xml",
      title: "Santa Phone Calls » Feed",
      href: "https://santaphonecalls.com/feed/",
    },
    {
      rel: "alternate",
      type: "application/rss+xml",
      title: "Santa Phone Calls » Comments Feed",
      href: "https://santaphonecalls.com/comments/feed/",
    },
  ],

  // Manifest
  manifest: {
    name: "Santa Phone Calls",
    short_name: "Santa Calls",
    start_url: "/",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    display: "standalone",
    icons: [
      {
        src: "/favicon-32x32-1.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  },
};

// Helper function to get meta tags for robots
export const getRobotsContent = () => {
  const { robots } = seoConfig;
  return Object.entries(robots)
    .map(([key, value]) => `${key}:${value}`)
    .join(", ");
};

// Helper function to get formatted schema
export const getSchemaString = () => {
  return Object.values(seoConfig.schema).map((schema) =>
    JSON.stringify(schema),
  );
};
