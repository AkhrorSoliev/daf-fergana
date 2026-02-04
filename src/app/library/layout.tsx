import { notFound } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  // Library page is temporarily private - return 404
  notFound();
  return children as React.ReactNode;
}
