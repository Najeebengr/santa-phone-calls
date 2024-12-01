import { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";
import { marked } from "marked";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Terms and Conditions - Santa Phone Calls",
  description: "Terms and conditions for Santa Phone Calls service",
};

export default async function TermsPage() {
  // Read and parse the markdown file
  const termsPath = path.join(process.cwd(), "app/lib/terms.md");
  let htmlContent: string = "";

  try {
    const termsContent = await fs.readFile(termsPath, "utf8");
    htmlContent = marked(termsContent) as string;
  } catch {
    htmlContent =
      "<h1>Terms and Conditions</h1><p>Our terms and conditions are currently being updated. Please check back later.</p>";
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header className="mb-5" />
      <div className="flex-1 bg-white">
        <div className="container mx-auto px-4 py-8">
          <div
            className="prose prose-lg max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-a:text-blue-600 prose-strong:font-semibold prose-ul:list-disc prose-ol:list-decimal"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>
    </div>
  );
}
