"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Asosiy sahifa", href: "/" },
  { name: "Oqituvchilar", href: "/oqituvchilar" },
  { name: "Kurslar", href: "/kurslar" },
  { name: "Filallar", href: "/filiallar" },
  { name: "Natijalar", href: "/natijalar" },
];

export default function Navbar() {
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

  const scrollToConsultation = () => {
    const element = document.getElementById("consultation");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

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
            <div className="w-8 h-8 lg:w-9 lg:h-9 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary/90 transition-colors">
              <span className="text-primary-foreground font-bold text-lg lg:text-xl">
                D
              </span>
            </div>
            <span className="text-lg lg:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              DaF Fergana
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-muted/60 ${
                  pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {item.name}
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

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <Button
              asChild
              size="sm"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              <Link href="/#consultation" className="inline-flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Bepul konsultatsiya
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
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 mx-2 rounded-lg text-base font-medium transition-all duration-200 ${
                      pathname === item.href
                        ? "text-primary bg-primary/10 border border-primary/20"
                        : "text-foreground hover:text-primary hover:bg-muted/60"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile CTA */}
                <div className="px-2 pt-4">
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
                      Bepul konsultatsiya
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
