import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "33600000000";
const DEFAULT_MESSAGE = "Bonjour, je souhaite un devis pour une réparation.";

function getWhatsAppUrl(message?: string) {
  const encodedMessage = encodeURIComponent(message || DEFAULT_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

interface WhatsAppButtonProps {
  variant?: "floating" | "inline" | "compact";
  message?: string;
  className?: string;
}

export function WhatsAppButton({
  variant = "inline",
  message,
  className,
}: WhatsAppButtonProps) {
  const url = getWhatsAppUrl(message);

  if (variant === "compact") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("inline-flex items-center justify-center h-9 w-9 rounded-full bg-[#25D366] text-white hover:bg-[#20BD5A] transition-colors", className)}
        aria-label="Contacter via WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
    );
  }

  if (variant === "floating") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex items-center justify-center gap-2 w-full rounded-full bg-[#25D366] text-white font-medium py-3 px-6 shadow-lg hover:bg-[#20BD5A] transition-colors",
          className,
        )}
      >
        <MessageCircle className="h-5 w-5" />
        <span>Nous contacter sur WhatsApp</span>
      </a>
    );
  }

  // inline variant
  return (
    <Button asChild className={cn("bg-[#25D366] hover:bg-[#20BD5A] text-white", className)}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="h-4 w-4" />
        Nous contacter
      </a>
    </Button>
  );
}
