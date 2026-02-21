import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-dr-dark text-white/90">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Tablettes
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  PC Portables
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Mac
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Consoles
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Microsoudure
                </Link>
              </li>
            </ul>
          </div>

          {/* Infos pratiques */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Infos pratiques
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Haulchin, 59121</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Lun - Sam : 9h - 19h</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <a href="tel:+33600000000" className="hover:text-white transition-colors">
                  06 00 00 00 00
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <a href="mailto:contact@digirepair.fr" className="hover:text-white transition-colors">
                  contact@digirepair.fr
                </a>
              </li>
            </ul>
          </div>

          {/* Mentions legales */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Informations
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/mentions-legales" className="hover:text-white transition-colors">
                  Mentions legales
                </Link>
              </li>
              <li>
                <Link href="/politique-confidentialite" className="hover:text-white transition-colors">
                  Politique de confidentialite
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="hover:text-white transition-colors">
                  Conditions generales de vente
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-xs text-white/60">
          <p>&copy; 2026 DigiRepair. Tous droits reserves.</p>
        </div>
      </div>
    </footer>
  );
}
