'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const branches = [
  {
    id: 'fergana',
    name: 'Farg\'ona filiali',
    address: 'Ma\'rifat ko\'chasi 73, 150100, Farg\'ona shahri, Farg\'ona viloyati, O\'zbekiston',
    phone: '+998 90 535 10 99',
    email: 'fergana@daf-fergana.uz',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d458.9196921568029!2d71.78530216685563!3d40.387179363413175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb83fb91cc7da3%3A0x36a25812ad51e334!2sDAF%20sprachzentrum!5e0!3m2!1sen!2s!4v1758038227609!5m2!1sen!2s',
  },
  {
    id: 'tashkent',
    name: 'Toshkent filiali',
    address: 'Amir Temur ko\'chasi 15, 100000, Toshkent shahri, O\'zbekiston',
    phone: '+998 71 123 45 67',
    email: 'tashkent@daf-fergana.uz',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.1234567890!2d69.2401!3d41.2995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xfd5af35cac3e4c90!2sTashkent%20City!5e0!3m2!1sen!2s!4v1758038227609!5m2!1sen!2s',
  },
  {
    id: 'samarkand',
    name: 'Samarqand filiali',
    address: 'Registon maydoni 1, 140100, Samarqand shahri, O\'zbekiston',
    phone: '+998 66 234 56 78',
    email: 'samarkand@daf-fergana.uz',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.1234567890!2d66.9597!3d39.6547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4d191960077df7%3A0x487636d6d6a7b8a2!2sRegistan!5e0!3m2!1sen!2s!4v1758038227609!5m2!1sen!2s',
  },
];

export default function ContactsSection() {
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  const handleBranchChange = (branchId: string) => {
    const branch = branches.find(b => b.id === branchId);
    if (branch) {
      setSelectedBranch(branch);
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Manzillar & Filiallar
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Bizning filiallarimizni tanlang va aloqa ma'lumotlarini ko'ring
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Branch Selection & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Filialni tanlang
              </h3>
              
              <Select value={selectedBranch.id} onValueChange={handleBranchChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filialni tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="mt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Manzil</p>
                    <p className="text-foreground/70 text-sm">{selectedBranch.address}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-medium text-foreground">Telefon</p>
                    <a
                      href={`tel:${selectedBranch.phone}`}
                      className="text-foreground/70 text-sm hover:text-accent transition-colors"
                    >
                      {selectedBranch.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a
                      href={`mailto:${selectedBranch.email}`}
                      className="text-foreground/70 text-sm hover:text-accent transition-colors"
                    >
                      {selectedBranch.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button
                  asChild
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <a href={`tel:${selectedBranch.phone}`} className="flex items-center justify-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Qo'ng'iroq qiling
                  </a>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  className="flex-1"
                >
                  <a href={`mailto:${selectedBranch.email}`} className="flex items-center justify-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email yuboring
                  </a>
                </Button>
              </div>

              <div className="mt-4">
                <Button
                  asChild
                  variant="outline"
                  className="w-full"
                >
                  <a href="#" className="flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Telegram orqali yozing
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Joylashuv
              </h3>
              
              <div className="relative w-full h-96 rounded-lg overflow-hidden">
                <iframe
                  src={selectedBranch.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
