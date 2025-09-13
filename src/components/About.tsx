import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
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

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 30 },
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

  return (
    <section ref={ref} id="about" className="bg-[#E8DDD4] py-20">
      {/* Main About Section */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="text-center mb-16">
          <motion.h2 
            variants={titleVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#8B4513] mb-8 tracking-wide"
            whileHover={{ 
              scale: 1.02,
              textShadow: "0px 0px 20px rgba(139, 69, 19, 0.3)",
              transition: { duration: 0.3 }
            }}
          >
            ABOUT US
          </motion.h2>
          
          <motion.div
            variants={subtitleVariants}
            className="inline-block"
          >
            <div className="bg-[#C4A173] text-white px-8 py-4 rounded-full text-lg md:text-xl font-medium shadow-lg">
              Our Story, Our Vision, Our Why
            </div>
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto space-y-8 text-black">
          <motion.p 
            variants={paragraphVariants}
            className="text-lg md:text-xl leading-relaxed font-medium"
          >
            From a small online classroom in Kerala to a growing global community, She Rising began with one simple belief: education has the 
            power to change lives not just through textbooks, but through connection, courage, and care.
          </motion.p>
          
          <motion.p 
            variants={paragraphVariants}
            className="text-lg md:text-xl leading-relaxed font-medium"
          >
            At 18, our founder began tutoring young girls in her neighborhood, blending academic support with open conversations about body image, 
            menstruation, and gender roles, topics that were often left unaddressed. What began as small gatherings soon grew into a movement: a 
            space where education became a tool for empowerment, not just achievement.
          </motion.p>
          
          <motion.p 
            variants={paragraphVariants}
            className="text-lg md:text-xl leading-relaxed font-medium"
          >
            Today, She Rising is rooted in both grassroots action and academic thought. From workshops and podcasts to public events and 
            accessible resources, we bridge the gap between higher education and everyday people. Our mission is to create spaces where 
            knowledge is not a privilege, but a shared power where girls, students, and communities rise together.
          </motion.p>
        </div>
      </motion.div>

      {/* UN SDG Section */}
      <motion.div 
        className="bg-[#C4A173] py-16 mt-20"
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
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 15H8v-2h4v2zm6-4H6v-2h12v2zm0-4H6V8h12v2z"/>
                  </svg>
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
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9M15 11.5L21 12V10M7 7V9L1 8.5V7M1 10V12L7 11.5M12 7.5C11.2 7.5 10.5 7.6 9.8 7.8L8.8 9.8C9.4 10.3 10.2 10.5 11 10.5H13C13.8 10.5 14.6 10.3 15.2 9.8L14.2 7.8C13.5 7.6 12.8 7.5 12 7.5ZM12 11C10.9 11 10 11.9 10 13S10.9 15 12 15 14 14.1 14 13 13.1 11 12 11Z"/>
                  </svg>
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

export default About;