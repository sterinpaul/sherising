import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const impactEvents = [
    {
      id: "1",
      title: "Webinar: Food & Climate Change",
      date: "August 5, 2024"
    },
    {
      id: "2",
      title: "Menstruation 101: Kerala Outreach",
      date: "August 30, 2024"
    },
    {
      id: "3",
      title: "Empowering Dreams: Scholarship Guidance Session",
      date: "August 31, 2024"
    },
    {
      id: "4",
      title: "Menstruation 101: Kerala Outreach",
      date: "August 30, 2024"
    },
    {
      id: "5",
      title: "Roundtable Discussion: Gender Roles And Stereotypes",
      date: "February 28, 2025"
    },
    {
      id: "6",
      title: "Reproductive Rights & Sustainable Period Care",
      date: "March 14, 2025"
    },
    {
      id: "7",
      title: "Read More",
      date: "",
      isReadMore: true
    },
    {
      id: "8",
      title: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
      date: "XXX XX, 20XX"
    }
  ];

const Impact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigation = useNavigate()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  return (
    <section ref={ref} id="impact" className="bg-gradient-to-b from-white to-[#c4b4a7] py-24">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Title */}
        <div className="text-center mb-12">
          <motion.h2 
            variants={titleVariants}
            className="text-6xl font-bold text-[#4D361E] mb-8 tracking-wide"
            whileHover={{ 
              scale: 1.02,
              textShadow: "0px 0px 20px rgba(139, 69, 19, 0.3)",
              transition: { duration: 0.3 }
            }}
          >
            OUR IMPACT
          </motion.h2>
        </div>

        {/* Description Text */}
        <motion.div
          variants={textVariants}
          className="max-w-5xl mx-auto mb-16"
        >
          <p className="text-black text-lg md:text-xl leading-relaxed font-medium text-center">
            From 2021 To 2023, She Rising Offered Free Academic Tutoring And Life Skills Mentoring For Young Girls In Chalakudy, Kerala. These 
            Sessions Were More Than Just Homework Help, They Became Transformative Spaces Where Girls Explored Topics Often Excluded From 
            Traditional Education. In Addition To Core Subjects Like Science And Math, We Facilitated Discussions On Gender Equality, Menstruation 
            Stigma, Body Image, Self-Esteem, And Financial Independence. These Holistic Learning Experiences Helped Girls Build Confidence, Ask 
            Bold Questions, And Develop Skills To Thrive Both Inside And Outside The Classroom.
          </p>
        </motion.div>

        {/* Impact Events Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {impactEvents.map((event, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group"
              whileHover={{ 
                scale: 1.03,
                y: -5,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              onClick={()=>navigation(`/impact/${event.id}`)}
            >
              <div className={`rounded-2xl p-6 h-48 flex flex-col justify-end shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                event.isReadMore ? 'items-center justify-center bg-gradient-to-b from-[#C4A173] to-white' : 'bg-[#C4A173]'
              }`}>
                {event.isReadMore ? (
                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="text-black font-bold text-xl cursor-pointer"
                    >
                      {event.title} →
                    </motion.div>
                  </div>
                ) : (
                  <>
                    {/* Placeholder for event image */}
                    <div className="flex-grow mb-4 bg-[#B8956A] rounded-lg opacity-30"></div>
                    
                    {/* Event info */}
                    <div>
                      <h3 className="text-black font-bold text-sm mb-2 leading-tight">
                        {event.title}
                      </h3>
                      {event.date && (
                        <p className="text-black text-xs font-medium opacity-80">
                          {event.date}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Impact;