import type { Metadata } from "next";
import "./home.css";

export const metadata: Metadata = {
  title: "ZF Canada – Trusted & Licensed Immigration Consultant",
  description:
    "ZF Canada is a leading immigration consultancy firm in Canada. Established in 1992, we bring over 25 years of experience helping clients achieve their immigration goals.",
  keywords: "immigration consultant Canada, RCIC, ZF Canada, Canadian immigration, visa consultant Mississauga",
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
