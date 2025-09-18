import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Instagram,
  Youtube,
} from "lucide-react";

const navigation = [
  { name: "Asosiy sahifa", href: "/" },
  { name: "Oqituvchilar", href: "/oqituvchilar" },
  { name: "Kurslar", href: "/kurslar" },
  { name: "Filallar", href: "/filiallar" },
  { name: "Natijalar", href: "/natijalar" },
];

const socialLinks = [
  { name: "Telegram", href: "#", icon: MessageCircle },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "YouTube", href: "#", icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold">DaF Fergana</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              DaF Sprachzentrum M.CH.J — nemis tilini o'qitishga ixtisoslashgan
              til markazi. O'zbekiston bo'ylab 8 ta filial.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Navigatsiya</h3>
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Aloqa</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-accent" />
                <a
                  href="tel:+998905351099"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  +998 90 535 10 99
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-accent" />
                <a
                  href="mailto:info@daf-fergana.uz"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  info@daf-fergana.uz
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  Ma'rifat ko'chasi 73,
                  <br />
                  Farg'ona shahri, 150100
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Ijtimoiy tarmoqlar</h3>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} DaF Sprachzentrum Fergana. Barcha
              huquqlar himoyalangan.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="#"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                Maxfiylik siyosati
              </Link>
              <Link
                href="#"
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                Foydalanish shartlari
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
