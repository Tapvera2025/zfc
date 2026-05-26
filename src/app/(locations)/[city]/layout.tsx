import type { Metadata } from "next";
import "../../location/location.css";
import "../../services/services.css";
import "../../(home)/home.css";

export const metadata: Metadata = {
  title: "Location - ZF Canada Immigration Consultants",
  description:
    "ZF Canada immigration consultant location pages for Ontario communities including Toronto, Ottawa, Mississauga, Brampton, Markham, and more.",
};

export default function CityLocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
