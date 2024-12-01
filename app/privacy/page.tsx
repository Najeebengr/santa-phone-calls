import { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";
import { marked } from "marked";
import Header from "../components/Header";
import "../globals.css";

export const metadata: Metadata = {
  title: "Privacy Policy - Santa Phone Calls",
  description: "Privacy policy for Santa Phone Calls service",
};

export default async function PrivacyPage() {
  // Read and parse the markdown file
  const privacyPath = path.join(process.cwd(), "app/lib/privacy-policy.md");
  let htmlContent: string | undefined = "";

  try {
    const privacyContent = await fs.readFile(privacyPath, "utf8");
    htmlContent = marked(privacyContent) as string;
  } catch {
    htmlContent =
      "<h1>Privacy Policy</h1><p>Our privacy policy is currently being updated. Please check back later.</p>";
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header className="mb-5" />
      <div className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-12">
          <article
            className="prose prose-lg max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h1:mb-8 prose-h2:text-3xl prose-h2:mt-12 prose-h3:text-2xl prose-p:text-gray-600 prose-p:my-6 prose-a:text-blue-600 prose-strong:font-semibold prose-ul:list-disc prose-ol:list-decimal"
            dangerouslySetInnerHTML={{ __html: htmlContent! }}
          />
        </div>
      </div>
    </div>
  );
}
