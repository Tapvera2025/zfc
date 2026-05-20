import type { Metadata } from "next";
import "./our-client.css";
import "../services/services.css";
import "../(home)/home.css";

export const metadata: Metadata = {
  title: "Our Client – ZF Canada Immigration Consultants",
  description:
    "ZF Canada serves all types of prospective immigrants to Canada including skilled workers, students, refugees, entrepreneurs and businesses.",
};

export default function OurClientLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
