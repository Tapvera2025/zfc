import type { Metadata } from "next";
import "./about.css";

export const metadata: Metadata = {
  title: "About Us – ZF Canada Immigration Consultants",
  description:
    "Learn about ZF Canada — a Regulated Canadian Immigration Consultant (RCIC-IRB) serving clients since 1992 from Mississauga, Ontario.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
