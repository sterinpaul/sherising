import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const About2 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const sdgSectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: { opacity: 1, scale: 1, rotate: 0 }
  };
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

  return (
    <section ref={ref} id="about" className="bg-[#f7f7f7e7] pt-20">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        

        <div className="max-w-5xl mx-auto space-y-8 text-black">
          <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.h1 
            className="text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight mb-8"
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
              className="text-[#4D361E] mb-1 tracking-wide"
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
      </motion.div>

      {/* UN SDG Section */}
      <motion.div 
        className="bg-[#C4A173] py-16 mt-20 inner-shadow"
        variants={sdgSectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div 
              className="text-center lg:text-left mb-12 lg:mb-0"
              variants={titleVariants}
            >
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                UNITED NATION'S<br />
                SUSTAINABLE DEVELOPMENT GOALS
              </h3>
            </motion.div>
            
            <div className="flex flex-col sm:flex-row gap-8 lg:gap-12">
              <motion.div 
                className="text-center"
                variants={iconVariants}
                whileHover={{ 
                  scale: 1.1,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-[#8B4513] rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                  <img src="/icons/quality-education.svg" alt="Quality Education" />
                </div>
                <p className="text-[#8B4513] font-semibold text-sm md:text-base">QUALITY EDUCATION</p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                variants={iconVariants}
                whileHover={{ 
                  scale: 1.1,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-[#E74C3C] rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                  <img src="/icons/gender-equality.svg" alt="Gender Equality" />
                </div>
                <p className="text-[#8B4513] font-semibold text-sm md:text-base">GENDER EQUALITY</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About2;