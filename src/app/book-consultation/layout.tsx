import type { Metadata } from "next";
import "./booking.css";
import "../services/services.css";

export const metadata: Metadata = {
  title: "Book a Consultation – ZF Canada Immigration Consultants",
  description:
    "Book a 45-minute consultation with ZF Canada's Regulated Canadian Immigration Consultants. Choose your service, pick a time, and confirm your appointment online.",
};

export default function BookConsultationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
