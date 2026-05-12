import type { Metadata } from "next";
import "./services.css";

export const metadata: Metadata = {
  title: "Our Services – ZF Canada Immigration Consultants",
  description: "Explore ZF Canada immigration services including Express Entry, Family Sponsorship, Study Permits, Work Permits, and more.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
