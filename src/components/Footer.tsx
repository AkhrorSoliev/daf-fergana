"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/i18n/I18nProvider";
import { Phone, Mail, MapPin, Send, Instagram, Sparkles } from "lucide-react";

const socialLinks = [
  { name: "Telegram", href: "https://t.me/daffergana", icon: Send },
  {
    name: "Instagram",
    href: "https://www.instagram.com/daf_fergana/",
    icon: Instagram,
  },
];

export default function Footer() {
  const { t, locale } = useI18n();
  const isDe = locale === "de";
  const contactPhone = isDe ? "+49 176 238 97 113" : "+998 90 535 10 99";
  const contactPhoneHref = isDe ? "tel:+4917623897113" : "tel:+998905351099";
  const contactEmail = isDe
    ? "orif.ahmadaliyev@consultinguz.de"
    : "info@daf-fergana.uz";
  const contactEmailHref = `mailto:${contactEmail}`;
  const visibleSocialLinks = isDe
    ? socialLinks.filter((l) => l.name !== "Telegram")
    : socialLinks;

  const navigation = [
    { name: t("navbar.home"), href: "/" },
    { name: t("navbar.teachers"), href: "/oqituvchilar" },
    { name: t("navbar.courses"), href: "/kurslar" },
    { name: t("navbar.branches"), href: "/filiallar" },
    { name: t("navbar.results"), href: "/natijalar" },
  ];
  return (
    <footer className="bg-white text-foreground dark:bg-card dark:text-foreground border-t border-border/60">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {/* Light/Dark logo */}
              <Image
                src="/assets/daf-logo-black.png"
                alt="DaF Fergana logo"
                width={65}
                height={65}
                priority
                className="w-auto h-15 object-contain block dark:hidden"
                unoptimized={true}
              />
              <Image
                src="/assets/daf-logo-white.png"
                alt="DaF Fergana logo"
                width={65}
                height={65}
                priority
                className="w-auto h-15 object-contain hidden dark:block"
                unoptimized={true}
              />
              <span className="text-xl font-bold relative -left-10 -top-4">
                {" "}
                Fergana
              </span>
            </div>
            <p className="text-foreground/80 text-sm leading-relaxed">
              {t("footer.desc1")} {t("footer.desc2")}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("footer.navigation")}</h3>
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-foreground/80 hover:text-foreground transition-colors text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("footer.contact")}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-accent" />
                <a
                  href={contactPhoneHref}
                  className="text-foreground/80 hover:text-foreground transition-colors text-sm"
                >
                  {contactPhone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-accent" />
                <a
                  href={contactEmailHref}
                  className="text-foreground/80 hover:text-foreground transition-colors text-sm"
                >
                  {contactEmail}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                <span className="text-foreground/80 text-sm">
                  Ma'rifat ko'chasi 73,
                  <br />
                  Farg'ona shahri, 150100
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("footer.social")}</h3>
            <div className="flex space-x-4">
              {visibleSocialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-foreground/10 rounded-lg hover:bg-foreground/20 transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-foreground/70 text-sm flex items-center flex-wrap gap-2">
              <span>
                © {new Date().getFullYear()} DaF Sprachzentrum Fergana.{" "}
                {t("footer.rights")}
              </span>
              {!isDe && (
                <>
                  <span className="mx-1 text-foreground/40">•</span>
                  <a
                    href="https://t.me/akhror_soliev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-foreground/10 border border-foreground/20 text-foreground hover:bg-foreground/20 transition-colors"
                    aria-label="Telegramda muallif profili — Ahror Soliyev"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    Ahror Soliyev
                  </a>
                </>
              )}
              <span>{t("footer.madeBy")}</span>
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="#"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                {t("footer.privacy")}
              </Link>
              <Link
                href="#"
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                {t("footer.terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
