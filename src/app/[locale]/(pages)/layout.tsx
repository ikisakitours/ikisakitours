import UserPageLayout from "@/components/pageLayouts/UserPageLayout";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return <UserPageLayout>{children}</UserPageLayout>;
}
