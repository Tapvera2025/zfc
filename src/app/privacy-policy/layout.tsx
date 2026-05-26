import type { Metadata } from "next";
import "./privacy-policy.css";
import "../services/services.css";
import "../(home)/home.css";

export const metadata: Metadata = {
  title: "Privacy Policy - ZF Canada Immigration Consultants",
  description:
    "Read the ZF Canada privacy policy, including how personal data is collected, used, shared, retained, and protected.",
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
