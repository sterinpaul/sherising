import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Involve = () => {
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

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section ref={ref} id="contact" className="bg-[#C4A173] py-20">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Main Title */}
        <div className="text-center mb-20">
          <motion.h1 
            variants={titleVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-wide"
            whileHover={{ 
              scale: 1.02,
              textShadow: "0px 0px 20px rgba(255, 255, 255, 0.3)",
              transition: { duration: 0.3 }
            }}
          >
            GET INVOLVED
          </motion.h1>
        </div>

        {/* Collaborate With Us Section */}
        <motion.div 
          variants={sectionVariants}
          className="mb-16"
        >
          <motion.h2 
            variants={titleVariants}
            className="text-2xl md:text-3xl font-bold text-amber-50 mb-4"
          >
            COLLABORATE WITH US
          </motion.h2>
          <motion.p 
            variants={titleVariants}
            className="text-black text-base md:text-lg leading-relaxed max-w-5xl mb-8"
          >
            Are you an educator, researcher, organization, or youth-led initiative passionate about gender equity, education, or social justice? Let's 
            build something powerful together. She Rising collaborates with individuals and institutions to create events, workshops, educational 
            content, and research-based projects that center community voices and lived experiences.
          </motion.p>
        </motion.div>

        {/* Volunteer With Us Section */}
        <motion.div 
          variants={sectionVariants}
          className="mb-16"
        >
          <motion.h2 
            variants={titleVariants}
            className="text-2xl md:text-3xl font-bold text-amber-50 mb-4"
          >
            VOLUNTEER WITH US
          </motion.h2>
          <motion.p 
            variants={titleVariants}
            className="text-black text-base md:text-lg leading-relaxed max-w-5xl mb-8"
          >
            Want to be part of something meaningful? Whether you're skilled in writing, design, content creation, research, or simply have a heart for 
            justice, there is space for you at She Rising. Our volunteer program is flexible, collaborative, and impact driven. From behind-the-scenes 
            roles to public-facing initiatives, your time and talent can help amplify change.
          </motion.p>
        </motion.div>

        {/* Join Our Community Section */}
        <motion.div 
          variants={sectionVariants}
          className="mb-20"
        >
          <motion.h2 
            variants={titleVariants}
            className="text-2xl md:text-3xl font-bold text-amber-50 mb-4"
          >
            JOIN OUR COMMUNITY
          </motion.h2>
          <motion.p 
            variants={titleVariants}
            className="text-black text-base md:text-lg leading-relaxed max-w-5xl mb-8"
          >
            She Rising is more than a platform. It is a growing global community of young people committed to building a more just, inclusive, and 
            educated world. When you join us, you gain access to workshops, resources, support circles, conversations, and calls for action that 
            matter.
          </motion.p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div 
          variants={containerVariants}
          className="flex flex-col sm:flex-row gap-8 justify-center items-center"
        >
          {/* Gmail Card */}
          <motion.div
            variants={cardVariants}
            className="group"
            whileHover={{ 
              scale: 1.05,
              y: -5,
              transition: { duration: 0.3 }
            }}
          >
            <a 
              href="mailto:thesherising@gmail.com"
              className="bg-[#E8DDD4] rounded-2xl p-8 w-64 h-40 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Gmail Icon */}
              <div className="mb-4">
                <svg className="w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.64l8.073-6.147C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
              </div>
              <p className="text-black font-bold text-sm text-center">
                thesherising@gmail.com
              </p>
            </a>
          </motion.div>

          {/* Instagram Card */}
          <motion.div
            variants={cardVariants}
            className="group"
            whileHover={{ 
              scale: 1.05,
              y: -5,
              transition: { duration: 0.3 }
            }}
          >
            <a 
              href="https://instagram.com/sherisingofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#E8DDD4] rounded-2xl p-8 w-64 h-40 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Instagram Icon */}
              <div className="mb-4">
                <svg className="w-12 h-12 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.52.204 5.036.43a5.329 5.329 0 0 0-1.912 1.245A5.329 5.329 0 0 0 1.88 3.587c-.226.483-.348 1.057-.382 2.004C1.463 6.54 1.45 6.947 1.45 10.568c0 3.62.013 4.028.048 4.975.034.947.156 1.522.382 2.005a5.33 5.33 0 0 0 1.244 1.912 5.33 5.33 0 0 0 1.912 1.244c.483.226 1.058.348 2.005.382.947.035 1.354.048 4.975.048 3.621 0 4.027-.013 4.974-.048.947-.034 1.522-.156 2.005-.382a5.33 5.33 0 0 0 1.912-1.244 5.33 5.33 0 0 0 1.244-1.912c.226-.483.348-1.058.382-2.005.035-.947.048-1.354.048-4.975 0-3.621-.013-4.027-.048-4.974-.034-.947-.156-1.522-.382-2.005A5.33 5.33 0 0 0 19.229 1.88 5.33 5.33 0 0 0 17.317.636c-.483-.226-1.058-.348-2.005-.382C14.365.013 13.958 0 10.337 0h1.68zm-.081 1.802h.468c3.456 0 3.877.011 5.244.048.762.035 1.332.161 1.732.267.435.169.745.371 1.072.697.326.326.529.636.697 1.071.106.4.232.97.267 1.732.037 1.368.045 1.787.045 5.287 0 3.5-.008 3.919-.045 5.286-.035.762-.161 1.332-.267 1.732-.168.435-.371.745-.697 1.072-.326.326-.636.529-1.071.697-.4.106-.97.232-1.732.267-1.367.036-1.786.045-5.286.045-3.5 0-3.919-.009-5.287-.045-.762-.035-1.331-.161-1.732-.267a2.89 2.89 0 0 1-1.071-.697 2.89 2.89 0 0 1-.697-1.072c-.106-.4-.232-.97-.267-1.732-.036-1.367-.045-1.786-.045-5.286 0-3.5.009-3.919.045-5.287.035-.762.161-1.331.267-1.732a2.89 2.89 0 0 1 .697-1.071 2.89 2.89 0 0 1 1.071-.697c.4-.106.97-.232 1.732-.267 1.368-.036 1.787-.045 5.287-.045l-.468.002zm-.081 2.945a3.81 3.81 0 1 0 0 7.618 3.81 3.81 0 0 0 0-7.618zm0 1.441a2.37 2.37 0 1 1 0 4.74 2.37 2.37 0 0 1 0-4.74zm4.742-1.813a.893.893 0 1 0 0 1.787.893.893 0 0 0 0-1.787z"/>
                </svg>
              </div>
              <p className="text-black font-bold text-sm text-center">
                @sherisingofficial
              </p>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Involve;