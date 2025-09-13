import { motion } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const Hero = () => {

  const slideInFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 1
      }
    }
  };

  const slideInFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 1
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const scrollToImpact = () => {
    const element = document.getElementById('impact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center pt-20 pb-16 relative overflow-hidden bg-[#E8DDD4]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-grow flex flex-col justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight mb-8"
          >
            <motion.div 
              variants={slideInFromLeft}
              className="text-[#C4A173] mb-1 tracking-wide"
              whileHover={{ 
                scale: 1.05, 
                textShadow: "0px 0px 8px rgb(196,161,115)",
                transition: { duration: 0.2 }
              }}
            >
              ELEVATE
            </motion.div>
            <motion.div 
              variants={scaleIn}
              className="text-[#8B4513] mb-1 tracking-wide"
              whileHover={{ 
                scale: 1.05,
                textShadow: "0px 0px 8px rgb(139,69,19)",
                transition: { duration: 0.2 }
              }}
            >
              ENRICH
            </motion.div>
            <motion.div 
              variants={slideInFromRight}
              className="text-[#C4A173] tracking-wide"
              whileHover={{ 
                scale: 1.05,
                textShadow: "0px 0px 8px rgb(196,161,115)",
                transition: { duration: 0.2 }
              }}
            >
              EMPOWER
            </motion.div>
          </motion.h1>
        </motion.div>
      </div>
      
      {/* Circular Call-to-Action Button */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-8 right-8"
      >
        <motion.button 
          onClick={scrollToImpact}
          className="w-32 h-32 bg-[#F5F1ED] rounded-full shadow-xl hover:bg-[#EFEBE7] transition-colors duration-300 flex flex-col items-center justify-center group relative border-2 border-[#D4C4B0]"
          whileHover={{ 
            scale: 1.08,
            boxShadow: "0 15px 40px rgba(139, 69, 19, 0.15)",
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <div className="text-[#8B4513] text-sm font-semibold leading-tight">Jump to Our Impact</div>
          <motion.div 
            className="text-center mb-2 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
              <img src="/icons/arrow-down.svg" className='w-20 h-20' alt="arrow button" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ChevronDownIcon className="w-7 h-7 text-[#8B4513]" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;