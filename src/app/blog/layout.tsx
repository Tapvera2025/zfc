import "./blog.css";
import "../services/services.css";

export const metadata = {
  title: "Blog | ZF Canada",
  description: "Immigration insights, tips and guides from ZF Canada.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
