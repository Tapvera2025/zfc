import type { Metadata } from "next";
import "./toronto.css";
import "../services/services.css";
import "../(home)/home.css";

export const metadata: Metadata = {
  title: "Immigration Consultants Serving Toronto – ZF Canada",
  description:
    "ZF Canada provides expert immigration consulting services for Toronto residents. Skilled workers, students, refugees, businesses – we handle all Canadian immigration pathways.",
};

export default function TorontoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
