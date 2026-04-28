import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <Container className="flex min-h-16 items-center justify-between gap-4 py-4 text-sm text-zinc-500">
        <p>{siteConfig.name}</p>
        <p>Built with Next.js App Router.</p>
      </Container>
    </footer>
  );
}
