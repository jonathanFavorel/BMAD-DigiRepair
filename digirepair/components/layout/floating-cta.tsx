import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export function FloatingCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] md:hidden">
      <WhatsAppButton variant="floating" />
    </div>
  );
}
