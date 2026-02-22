import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingCTA } from "@/components/layout/floating-cta";

export default function VitrineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      {/* pb-20 on mobile compensates for FloatingCTA height */}
      <div className="pb-20 md:pb-0" />
      <Footer />
      <FloatingCTA />
    </>
  );
}
