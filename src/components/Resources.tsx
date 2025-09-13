import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const Resources = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [courseModulesIndex, setCourseModulesIndex] = useState(0);
  const [conversationsIndex, setConversationsIndex] = useState(0);

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

  // Sample data for course modules
  const courseModules = [
    { id: 1, title: "Gender Equality Basics" },
    { id: 2, title: "Body Autonomy 101" },
    { id: 3, title: "Menstruation Education" },
    { id: 4, title: "Mental Health Awareness" },
    { id: 5, title: "Financial Independence" },
    { id: 6, title: "Self-Esteem Building" }
  ];

  // Sample data for conversations
  const conversations = [
    { id: 1, title: "Intersectional Feminism Discussion" },
    { id: 2, title: "Migration & Education" },
    { id: 3, title: "Reproductive Justice" },
    { id: 4, title: "Politics of Care" },
    { id: 5, title: "Community Leadership" },
    { id: 6, title: "Research & Activism" }
  ];

  const getVisibleItems = (items: any[], startIndex: number) => {
    const visibleCount = 4;
    const result = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (startIndex + i) % items.length;
      result.push(items[index]);
    }
    return result;
  };

  const nextCourseModules = () => {
    setCourseModulesIndex((prev) => (prev + 1) % courseModules.length);
  };

  const prevCourseModules = () => {
    setCourseModulesIndex((prev) => (prev - 1 + courseModules.length) % courseModules.length);
  };

  const nextConversations = () => {
    setConversationsIndex((prev) => (prev + 1) % conversations.length);
  };

  const prevConversations = () => {
    setConversationsIndex((prev) => (prev - 1 + conversations.length) % conversations.length);
  };

  return (
    <section ref={ref} id="resources" className="bg-[#C4A173] py-20">
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
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#8B4513] mb-8 tracking-wide"
            whileHover={{ 
              scale: 1.02,
              textShadow: "0px 0px 20px rgba(139, 69, 19, 0.3)",
              transition: { duration: 0.3 }
            }}
          >
            RESOURCES
          </motion.h1>
        </div>

        {/* Course Modules Section */}
        <motion.div 
          variants={sectionVariants}
          className="mb-20"
        >
          <div className="mb-12">
            <motion.h2 
              variants={titleVariants}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              COURSE MODULES
            </motion.h2>
            <motion.p 
              variants={titleVariants}
              className="text-lg md:text-xl text-white font-medium mb-2"
            >
              EXPLORE OUR FREE LEARNING SERIES ON YOUTUBE
            </motion.p>
            <motion.p 
              variants={titleVariants}
              className="text-black text-base md:text-lg leading-relaxed max-w-5xl"
            >
              Dive into our curated video modules covering gender equality, body autonomy, menstruation, mental health, and more. These educational videos, 
              developed by our team and informed by lived experiences and academic research, make complex ideas simple, accessible, and actionable.
            </motion.p>
          </div>

          {/* Course Modules Carousel */}
          <div className="relative">
            <div className="flex items-center justify-between">
              <motion.button
                onClick={prevCourseModules}
                className="w-12 h-12 bg-[#8B4513] rounded-full flex items-center justify-center shadow-lg hover:bg-[#6B3410] transition-colors z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeftIcon className="w-6 h-6 text-white" />
              </motion.button>

              <div className="flex-1 mx-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {getVisibleItems(courseModules, courseModulesIndex).map((module, index) => (
                    <motion.div
                      key={`${module.id}-${courseModulesIndex}`}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                      className="group"
                      whileHover={{ 
                        scale: 1.05,
                        y: -5,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <div className="bg-white rounded-2xl p-6 h-48 flex flex-col justify-end shadow-lg hover:shadow-xl transition-shadow duration-300">
                        {/* Placeholder for video thumbnail */}
                        <div className="flex-grow mb-4 bg-gray-200 rounded-lg"></div>
                        
                        {/* Module info */}
                        <div>
                          <h3 className="text-black font-bold text-sm leading-tight">
                            {module.title}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.button
                onClick={nextCourseModules}
                className="w-12 h-12 bg-[#8B4513] rounded-full flex items-center justify-center shadow-lg hover:bg-[#6B3410] transition-colors z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRightIcon className="w-6 h-6 text-white" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Conversations Section */}
        <motion.div 
          variants={sectionVariants}
        >
          <div className="mb-12">
            <motion.h2 
              variants={titleVariants}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              CONVERSATIONS THAT SPARK CHANGE
            </motion.h2>
            <motion.p 
              variants={titleVariants}
              className="text-lg md:text-xl text-white font-medium mb-2"
            >
              EXPLORE OUR FREE PODCAST SERIES ON YOUTUBE
            </motion.p>
            <motion.p 
              variants={titleVariants}
              className="text-black text-base md:text-lg leading-relaxed max-w-5xl"
            >
              Tune in to real, raw, and reflective conversations on our YouTube channel, where every episode is built on rigorous research, fact-checked information, 
              and lived experience. Hosted by members of She Rising, our podcasts bring together students, scholars, activists, and community leaders to explore 
              topics like intersectional feminism, migration, education, reproductive justice, and the politics of care. Each episode is crafted to inform, challenge, 
              and inspire, offering personal stories alongside critical insights and actionable steps for change.
            </motion.p>
          </div>

          {/* Conversations Carousel */}
          <div className="relative">
            <div className="flex items-center justify-between">
              <motion.button
                onClick={prevConversations}
                className="w-12 h-12 bg-[#8B4513] rounded-full flex items-center justify-center shadow-lg hover:bg-[#6B3410] transition-colors z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeftIcon className="w-6 h-6 text-white" />
              </motion.button>

              <div className="flex-1 mx-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {getVisibleItems(conversations, conversationsIndex).map((conversation, index) => (
                    <motion.div
                      key={`${conversation.id}-${conversationsIndex}`}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                      className="group"
                      whileHover={{ 
                        scale: 1.05,
                        y: -5,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <div className="bg-white rounded-2xl p-6 h-48 flex flex-col justify-end shadow-lg hover:shadow-xl transition-shadow duration-300">
                        {/* Placeholder for podcast thumbnail */}
                        <div className="flex-grow mb-4 bg-gray-200 rounded-lg"></div>
                        
                        {/* Conversation info */}
                        <div>
                          <h3 className="text-black font-bold text-sm leading-tight">
                            {conversation.title}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.button
                onClick={nextConversations}
                className="w-12 h-12 bg-[#8B4513] rounded-full flex items-center justify-center shadow-lg hover:bg-[#6B3410] transition-colors z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRightIcon className="w-6 h-6 text-white" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Resources;