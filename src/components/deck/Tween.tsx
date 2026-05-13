import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export function Tween({ value, format = (v: number) => v.toFixed(0), className }: {
  value: number;
  format?: (v: number) => string;
  className?: string;
}) {
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { stiffness: 120, damping: 22, mass: 0.6 });
  const display = useTransform(spring, (v) => format(v));
  useEffect(() => { mv.set(value); }, [value, mv]);
  return <motion.span className={className}>{display}</motion.span>;
}
