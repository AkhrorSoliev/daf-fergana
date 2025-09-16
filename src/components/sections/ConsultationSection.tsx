'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Ism kamida 2 ta harfdan iborat bo\'lishi kerak'),
  phone: z.string().min(1, 'Telefon raqam kiritish majburiy'),
});

type FormData = z.infer<typeof formSchema>;

export default function ConsultationSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        // Hide success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="consultation" className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Bepul konsultatsiya
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Nemis tilini o'rganish yoki Germaniyada ta'lim olish haqida maslahat oling. 
            Mutaxassislarimiz sizga yordam berishga tayyor!
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8 shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Ism Familiya *
                </label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="Ismingizni kiriting"
                  className="h-12"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-destructive flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Telefon raqam *
                </label>
                <Input
                  id="phone"
                  {...register('phone')}
                  placeholder="+998 XX XXX XX XX"
                  className="h-12"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-destructive flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground text-lg"
              >
                {isSubmitting ? (
                  'Yuborilmoqda...'
                ) : (
                  <>
                    <Phone className="w-5 h-5 mr-2" />
                    Konsultatsiya so'rang
                  </>
                )}
              </Button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-800"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-800"
                >
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.
                </motion.div>
              )}
            </form>

            {/* Contact Info */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex flex-col sm:flex-row gap-4 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <Phone className="w-4 h-4 text-accent" />
                  <span className="text-sm text-foreground/70">+998 90 535 10 99</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <Mail className="w-4 h-4 text-accent" />
                  <span className="text-sm text-foreground/70">info@daf-fergana.uz</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
