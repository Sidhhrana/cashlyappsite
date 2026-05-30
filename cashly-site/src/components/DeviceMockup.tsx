import { ReactNode } from "react";
import { motion } from "framer-motion";

interface DeviceMockupProps {
  src: string;
  alt: string;
  className?: string;
  floatOffset?: number;
  delay?: number;
}

export function DeviceMockup({ src, alt, className = "", floatOffset = 20, delay = 0 }: DeviceMockupProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={`relative group ${className}`}
    >
      <motion.div
        animate={{ y: [-floatOffset, floatOffset, -floatOffset] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay }}
        className="relative z-10"
      >
        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-colors duration-500" />
        <div className="relative rounded-[40px] border-[8px] border-zinc-900 bg-zinc-950 shadow-2xl overflow-hidden
                      ring-1 ring-white/10 ring-offset-4 ring-offset-black/50 aspect-[9/19] w-full max-w-[300px] mx-auto
                      group-hover:ring-primary/50 transition-all duration-500">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 rounded-b-3xl z-20" />
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
      </motion.div>
    </motion.div>
  );
}
