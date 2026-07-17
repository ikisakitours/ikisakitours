import type { Metadata } from "next";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { blogPosts } from "@/data/blog";
import UserPageLayout from "@/components/pageLayouts/UserPageLayout";
export const metadata: Metadata = {
  title: "Journal",
  description: "Curated Sri Lanka travel stories, guides, and cultural notes from LankaElite.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-lanka-dark ">
      <UserPageLayout>
        <BlogExplorer posts={blogPosts} />
      </UserPageLayout>
    </main>
  );
}
