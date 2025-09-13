import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const Articles = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [visibleArticles, setVisibleArticles] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  // Sample articles data
  const allArticles = [
    { id: 1, title: "Understanding Gender Equality in Education", category: "Education", date: "2024-01-15" },
    { id: 2, title: "The Impact of Menstrual Health Programs", category: "Health", date: "2024-01-20" },
    { id: 3, title: "Breaking Barriers: Women in STEM", category: "STEM", date: "2024-01-25" },
    { id: 4, title: "Community-Based Learning Initiatives", category: "Community", date: "2024-02-01" },
    { id: 5, title: "Mental Health and Academic Success", category: "Mental Health", date: "2024-02-05" },
    { id: 6, title: "Empowering Rural Women Through Technology", category: "Technology", date: "2024-02-10" },
    { id: 7, title: "The Role of Podcasts in Social Change", category: "Media", date: "2024-02-15" },
    { id: 8, title: "Sustainable Development and Gender Equity", category: "Sustainability", date: "2024-02-20" },
    { id: 9, title: "Digital Literacy for Marginalized Communities", category: "Digital", date: "2024-02-25" },
    { id: 10, title: "Intersectionality in Modern Feminism", category: "Feminism", date: "2024-03-01" },
    { id: 11, title: "Climate Change and Women's Rights", category: "Environment", date: "2024-03-05" },
    { id: 12, title: "Educational Policy and Social Justice", category: "Policy", date: "2024-03-10" },
    { id: 13, title: "Youth Activism in the Digital Age", category: "Activism", date: "2024-03-15" },
    { id: 14, title: "Cultural Barriers to Women's Education", category: "Culture", date: "2024-03-20" },
    { id: 15, title: "The Economics of Gender Inequality", category: "Economics", date: "2024-03-25" },
    { id: 16, title: "Reproductive Rights and Health Access", category: "Health", date: "2024-03-30" },
    { id: 17, title: "Technology as a Tool for Empowerment", category: "Technology", date: "2024-04-01" },
    { id: 18, title: "Building Inclusive Communities", category: "Community", date: "2024-04-05" },
    { id: 19, title: "The Future of Gender Studies", category: "Academic", date: "2024-04-10" },
    { id: 20, title: "Global Perspectives on Women's Rights", category: "Global", date: "2024-04-15" }
  ];

  const displayedArticles = allArticles.slice(0, visibleArticles);
  const hasMoreArticles = visibleArticles < allArticles.length;

  const loadMoreArticles = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisibleArticles(prev => Math.min(prev + 10, allArticles.length));
      setIsLoading(false);
    }, 800);
  };

  return (
    <section ref={ref} id="articles" className="bg-[#C4A173] py-20">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Title Section */}
        <div className="mb-16">
          <motion.h1 
            variants={titleVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-wide"
            whileHover={{ 
              scale: 1.02,
              textShadow: "0px 0px 20px rgba(255, 255, 255, 0.3)",
              transition: { duration: 0.3 }
            }}
          >
            ARTICLES & BLOGS
          </motion.h1>
          
          <motion.h2 
            variants={textVariants}
            className="text-lg md:text-xl text-white font-medium mb-6"
          >
            BRIDGING RESEARCH AND RESISTANCE
          </motion.h2>
          
          <motion.p 
            variants={textVariants}
            className="text-black text-base md:text-lg leading-relaxed max-w-5xl"
          >
            This is where academia meets activism. Our blog features short articles, reflections, and summaries of peer-reviewed journals that connect scholarly 
            work with real-world issues. Whether you're a student, educator, or curious reader, our articles help you understand key social topics without the 
            academic jargon.
          </motion.p>
        </div>

        {/* Articles Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12"
          variants={containerVariants}
        >
          {displayedArticles.map((article, index) => (
            <motion.div
              key={article.id}
              variants={cardVariants}
              transition={{ delay: (index % 10) * 0.05 }}
              className="group"
              whileHover={{ 
                scale: 1.03,
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <div className="bg-white rounded-2xl p-6 h-48 flex flex-col justify-end shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Placeholder for article image */}
                <div className="flex-grow mb-4 bg-gray-200 rounded-lg"></div>
                
                {/* Article info */}
                <div>
                  <h3 className="text-black font-bold text-sm mb-2 leading-tight line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-600 font-medium">{article.category}</span>
                    <span className="text-gray-500">{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        {hasMoreArticles && (
          <div className="text-center">
            <motion.button
              onClick={loadMoreArticles}
              disabled={isLoading}
              className="w-16 h-16 bg-[#8B4513] rounded-full flex items-center justify-center shadow-lg hover:bg-[#6B3410] transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={isLoading ? { rotate: 360 } : {}}
              transition={isLoading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
            >
              <ChevronDownIcon className="w-8 h-8 text-white" />
            </motion.button>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Articles;