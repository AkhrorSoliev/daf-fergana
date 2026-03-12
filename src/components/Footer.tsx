"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/i18n/I18nProvider";
import { Phone, Mail, MapPin, Send, Instagram } from "lucide-react";
import { branches, branchCity } from "@/data/branches";

export default function Footer() {
  const { t, locale } = useI18n();
  const isDe = locale === "de";
  const contactPhone = "+998 90 535 10 99";
  const contactPhoneHref = "tel:+998905351099";
  const contactEmail = "info@daf-sprachzentrum.uz";
  const contactEmailHref = `mailto:${contactEmail}`;
  const [showTelegramMenu, setShowTelegramMenu] = useState(false);
  const telegramMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        telegramMenuRef.current &&
        !telegramMenuRef.current.contains(e.target as Node)
      ) {
        setShowTelegramMenu(false);
      }
    }
    if (showTelegramMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showTelegramMenu]);

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
                alt="DaF Sprachzentrum logo"
                width={65}
                height={65}
                priority
                className="w-auto h-15 object-contain block dark:hidden"
                unoptimized={true}
              />
              <Image
                src="/assets/daf-logo-white.png"
                alt="DaF Sprachzentrum logo"
                width={65}
                height={65}
                priority
                className="w-auto h-15 object-contain hidden dark:block"
                unoptimized={true}
              />
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
                  {t("footer.address")}
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("footer.social")}</h3>
            <div className="flex space-x-4">
              {/* Telegram with branch menu */}
              <div className="relative" ref={telegramMenuRef}>
                <button
                  onClick={() => setShowTelegramMenu((prev) => !prev)}
                  className="p-2 bg-foreground/10 rounded-lg hover:bg-foreground/20 transition-colors"
                  aria-label="Telegram"
                >
                  <Send className="w-5 h-5" />
                </button>
                {showTelegramMenu && (
                  <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-card border border-border/60 rounded-xl shadow-lg overflow-hidden z-50">
                    {branches.map((b) => (
                      <a
                        key={b.id}
                        href={b.telegramChannel}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-accent/10 transition-colors"
                        onClick={() => setShowTelegramMenu(false)}
                      >
                        <Send className="w-3.5 h-3.5 text-accent" />
                        {branchCity(b, locale)}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/daf_fergana/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-foreground/10 rounded-lg hover:bg-foreground/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-foreground/70 text-sm">
              © {new Date().getFullYear()} DaF Sprachzentrum.{" "}
              {t("footer.rights")}
            </p>
            <Link
              href="/maxfiylik"
              className="text-foreground/70 hover:text-foreground transition-colors text-sm"
            >
              {t("footer.privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
