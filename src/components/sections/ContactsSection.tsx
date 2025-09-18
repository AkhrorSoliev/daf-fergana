"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Mail, MapPin, MessageCircle, ExternalLink } from "lucide-react";

const branches = [
  {
    id: "fergana",
    name: "Farg'ona filiali",
    address:
      "Ma'rifat ko'chasi 73, 150100, Farg'ona shahri, Farg'ona viloyati, O'zbekiston",
    phone: "+998 90 535 10 99",
    email: "fergana@daf-fergana.uz",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d458.9196921568029!2d71.78530216685563!3d40.387179363413175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb83fb91cc7da3%3A0x36a25812ad51e334!2sDAF%20sprachzentrum!5e0!3m2!1sen!2s!4v1758038227609!5m2!1sen!2s",
  },
  {
    id: "tashkent",
    name: "Toshkent filiali",
    address: "Amir Temur ko'chasi 15, 100000, Toshkent shahri, O'zbekiston",
    phone: "+998 71 123 45 67",
    email: "tashkent@daf-fergana.uz",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.1234567890!2d69.2401!3d41.2995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xfd5af35cac3e4c90!2sTashkent%20City!5e0!3m2!1sen!2s!4v1758038227609!5m2!1sen!2s",
  },
  {
    id: "samarkand",
    name: "Samarqand filiali",
    address: "Registon maydoni 1, 140100, Samarqand shahri, O'zbekiston",
    phone: "+998 66 234 56 78",
    email: "samarkand@daf-fergana.uz",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.1234567890!2d66.9597!3d39.6547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4d191960077df7%3A0x487636d6d6a7b8a2!2sRegistan!5e0!3m2!1sen!2s!4v1758038227609!5m2!1sen!2s",
  },
];

export default function ContactsSection() {
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  const handleBranchChange = (branchId: string) => {
    const branch = branches.find((b) => b.id === branchId);
    if (branch) {
      setSelectedBranch(branch);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-secondary/10 via-background to-muted/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-16 right-16 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-24 left-16 w-32 h-32 bg-accent/15 rounded-full blur-2xl" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4"
          >
            📍 Bizning manzillar
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Manzillar & Filiallar
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-secondary mx-auto mb-6" />
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Bizning filiallarimizni tanlang va aloqa ma'lumotlarini ko'ring
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 xl:gap-12">
          {/* Enhanced Branch Selection & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="relative overflow-hidden p-6 md:p-8 bg-white/95 dark:bg-card border border-border/60 shadow-lg">
              {/* Subtle background */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5 opacity-50" />

              <div className="relative">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">
                  Filialni tanlang
                </h3>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <Select
                    value={selectedBranch.id}
                    onValueChange={handleBranchChange}
                  >
                    <SelectTrigger className="w-full h-12 md:h-14 text-base border-border/60 focus:border-accent">
                      <SelectValue placeholder="Filialni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem
                          key={branch.id}
                          value={branch.id}
                          className="text-base"
                        >
                          {branch.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div
                  className="mt-8 space-y-6"
                  key={selectedBranch.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground mb-1">
                        Manzil
                      </p>
                      <p className="text-foreground/70 text-sm md:text-base leading-relaxed">
                        {selectedBranch.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">
                        Telefon
                      </p>
                      <a
                        href={`tel:${selectedBranch.phone}`}
                        className="text-foreground/70 text-sm md:text-base hover:text-accent transition-colors duration-200 hover:underline"
                      >
                        {selectedBranch.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">
                        Email
                      </p>
                      <a
                        href={`mailto:${selectedBranch.email}`}
                        className="text-foreground/70 text-sm md:text-base hover:text-accent transition-colors duration-200 hover:underline"
                      >
                        {selectedBranch.email}
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Enhanced Action Buttons */}
                <div className="mt-8 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button
                      asChild
                      className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <a
                        href={`tel:${selectedBranch.phone}`}
                        className="flex items-center justify-center"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Qo'ng'iroq qiling
                      </a>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="border-border/60 hover:border-accent hover:bg-accent/5 font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <a
                        href={`mailto:${selectedBranch.email}`}
                        className="flex items-center justify-center"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email yuboring
                      </a>
                    </Button>
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-border/60 hover:border-secondary hover:bg-secondary/10 font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <a href="#" className="flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Telegram orqali yozing
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Enhanced Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="relative overflow-hidden p-6 md:p-8 bg-white/95 dark:bg-card border border-border/60 shadow-lg">
              {/* Subtle background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-secondary/5 opacity-50" />

              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    Joylashuv
                  </h3>
                  <motion.a
                    href={selectedBranch.mapUrl.replace("/embed", "")}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-1 text-sm text-accent hover:text-accent/80 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Katta xaritada ko'rish
                  </motion.a>
                </div>

                <motion.div
                  className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg"
                  key={selectedBranch.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <iframe
                    src={selectedBranch.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-2xl"
                  />
                  <div className="absolute inset-0 ring-1 ring-border/20 rounded-2xl pointer-events-none" />
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
