"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { useI18n } from "@/i18n/I18nProvider";

const navigation = [
  { key: "navbar.home", href: "/" },
  { key: "navbar.teachers", href: "/oqituvchilar" },
  { key: "navbar.courses", href: "/kurslar" },
  { key: "navbar.branches", href: "/filiallar" },
  { key: "navbar.results", href: "/natijalar" },
  { key: "navbar.library", href: "/library" },
];

export default function Navbar() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setIsOpen(false);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-lg"
          : "bg-background/80 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group"
            onClick={() => setIsOpen(false)}
          >
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
            <span className="hidden lg:block text-lg lg:text-xl font-bold text-foreground group-hover:text-primary transition-colors relative -ml-10">
              Fergana
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-muted/60 ${
                  pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {t(item.key)}
                {pathname === item.href && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Button
              asChild
              size="sm"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              <Link href="/#consultation" className="inline-flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                {t("navbar.cta")}
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-foreground hover:bg-muted/60 hover:text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden border-t border-border bg-background/98 backdrop-blur-lg"
            >
              <div className="py-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 mx-2 rounded-lg text-base font-medium transition-all duration-200 ${
                      pathname === item.href
                        ? "text-primary bg-primary/10 border border-primary/20"
                        : "text-foreground hover:text-primary hover:bg-muted/60"
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                ))}

                {/* Mobile actions */}
                <div className="px-2 pt-4">
                  <div className="flex items-center gap-2 px-2 pb-3">
                    <LanguageToggle />
                    <ThemeToggle />
                  </div>
                  <Button
                    asChild
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <Link
                      href="/#consultation"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center justify-center"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      {t("navbar.cta")}
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
