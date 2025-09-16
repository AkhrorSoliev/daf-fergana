"use client";

import { motion } from "framer-motion";

export default function BranchesPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="container py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Coming soon: Filiallar
          </h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Bizning barcha filiallarimiz va ularning joylashuvi haqida ma'lumot
            tez orada qo'shiladi.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
