import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function AnimatedNumber({ value, suffix = "", prefix = "", duration = 2000 }: AnimatedNumberProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const spring = useSpring(0, { duration, bounce: 0 });
  const display = useTransform(spring, (current) => `${prefix}${Math.round(current)}${suffix}`);

  useEffect(() => {
    spring.set(value);
    setHasAnimated(true);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}
