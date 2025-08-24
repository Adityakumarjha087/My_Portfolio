import { motion } from 'framer-motion';
import { FiMail } from 'react-icons/fi';

const AnimatedMail = ({ className = '', size = 24 }: { className?: string; size?: number }) => {
  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <FiMail size={size} className="text-indigo-500" />
    </motion.div>
  );
};

export default AnimatedMail;
