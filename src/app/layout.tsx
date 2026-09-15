import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { HeroField } from "@/components/graphics/HeroField";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { RouteTransition } from "@/components/motion/RouteTransition";
import { Header } from "@/components/shell/Header";
import { Footer } from "@/components/shell/Footer";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="grain flex min-h-full flex-col bg-ink-0">
        <MotionProvider>
          <RouteTransition />
          <HeroField />
          <div className="relative z-10 flex min-h-full flex-1 flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
