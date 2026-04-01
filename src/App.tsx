import { HeroSection } from "@/components/hero-section";
import { ModeToggle } from "@/components/mode-toggle";
import { ProjectsCarousel } from "@/components/projects-carousel";
import { SiteFooter } from "@/components/site-footer";
import { Separator } from "@/components/ui/separator";
import { ThemeProvider } from "@/hooks/theme-provider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-ui-theme">
      <div className="min-h-screen bg-background">
        <div className="fixed top-4 right-4 z-50">
          <ModeToggle />
        </div>

        <main className="max-w-6xl mx-auto px-6 pt-16 space-y-6">
          <HeroSection />
          <Separator />
          <ProjectsCarousel />
        </main>

        <SiteFooter />
      </div>
    </ThemeProvider>
  );
}
