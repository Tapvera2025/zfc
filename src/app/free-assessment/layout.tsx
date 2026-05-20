import type { Metadata } from "next";
import "./free-assessment.css";
import "../services/services.css";

export const metadata: Metadata = {
  title: "Free Assessment – ZF Canada Immigration Consultants",
  description:
    "Get a free immigration assessment from ZF Canada's Regulated Canadian Immigration Consultants. Fill out our form and we'll evaluate your case.",
};

export default function FreeAssessmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
