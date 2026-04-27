import { motion } from 'framer-motion';

export default function FadeContent({
  children,
  blur = false,
  duration = 0.8,
  delay = 0,
  threshold = 0.1,
  className = '',
}) {
  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        y: 20,
        filter: blur ? 'blur(6px)' : 'none' 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        filter: 'blur(0px)' 
      }}
      viewport={{ once: true, threshold }}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.1, 0.25, 1] 
      }}
    >
      {children}
    </motion.div>
  );
}
