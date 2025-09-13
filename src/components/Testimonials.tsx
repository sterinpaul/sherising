import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Amanda L.",
    location: "Toronto",
    text: "Joining Wealth Flow changed my entire perspective on trading. The course content is easy to follow, and the community is always there to support each other. My trading skills have improved dramatically.",
  },
  {
    id: 2,
    name: "Jason T.",
    location: "",
    text: "I didn't expect a free course to be this comprehensive. It's packed with practical advice, and I've gained so much insight. Wealth Flow really knows how to teach trading!",
  },
  {
    id: 3,
    name: "Priya K.",
    location: "London",
    text: "I've always been nervous about trading, but Wealth Flow helped me build the confidence I needed. Their signals are consistently accurate, and the team is so supportive.",
  },
  {
    id: 4,
    name: "Mark B.",
    location: "Los Angeles",
    text: "Wealth Flow is all about real results. There's no nonsense, just clear strategies that I can apply. I've seen a noticeable difference in my trading performance.",
  },
  {
    id: 5,
    name: "Emily C.",
    location: "Sydney",
    text: "The signals from Wealth Flow are fantastic. I've gone from being a beginner to making smarter trades, and it's all thanks to the guidance from the community.",
  },
  {
    id: 6,
    name: "Carlos D.",
    location: "",
    text: "I've tried a lot of courses, but nothing compares to the quality of content and support at Wealth Flow. It's more than just a community; it's a place where traders thrive.",
  },
  {
    id: 7,
    name: "Sarah W.",
    location: "Vancouver",
    text: "The team at Wealth Flow is amazing. They break things down in a way that makes sense, and I feel so much more confident making trades now.",
  },
  {
    id: 8,
    name: "John H.",
    location: "Chicago",
    text: "As a newbie, I was lost when I first started, but Wealth Flow took me through everything step by step. I now feel like I understand the market and can make informed decisions.",
  },
  {
    id: 9,
    name: "Linda R.",
    location: "Dubai",
    text: "I've been part of several trading groups, but Wealth Flow is different. They focus on strategies that actually work, and the resources are second to none.",
  },
  {
    id: 10,
    name: "Raj P.",
    location: "Toronto",
    text: "Thanks to Wealth Flow, I was able to leave my 9 to 5. The strategies they teach are straightforward, and I've seen a steady increase in my profits.",
  },
  {
    id: 11,
    name: "Megan T.",
    location: "Los Angeles",
    text: "The content at Wealth Flow is invaluable. They really focus on teaching the fundamentals, and that's made a huge difference in my trading outcomes.",
  },
  {
    id: 12,
    name: "David S.",
    location: "London",
    text: "From day one, I felt like I belonged in the Wealth Flow community. It's not just about trading; it's about learning and growing together.",
  },
  {
    id: 13,
    name: "Sophie G.",
    location: "Paris",
    text: "I'm so glad I found Wealth Flow. The focus on Smart Money Concepts has helped me gain a deeper understanding of how the market works, and my trades have been more successful as a result.",
  },
  {
    id: 14,
    name: "Chris A.",
    location: "Dubai",
    text: "Before Wealth Flow, I was overwhelmed by the complexity of trading. Now, I feel like I have a clear direction and the tools I need to succeed.",
  },
  {
    id: 15,
    name: "Nathan K.",
    location: "Melbourne",
    text: "I've tried so many different strategies, but Wealth Flow's approach has been the most effective. Their course content is top-notch, and I've seen consistent results.",
  },
];

const SPEED_PX_PER_MS = 0.06; // tweak this (higher = faster)

const Testimonials = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return; // respect user preference

    let rafId: number;
    let lastTs: number | null = null;

    const loop = (ts: number) => {
      if (lastTs == null) lastTs = ts;
      const delta = ts - lastTs;
      lastTs = ts;

      if (!pause) {
        const half = el.scrollWidth / 2; // because we duplicated the content
        el.scrollLeft += delta * SPEED_PX_PER_MS;

        if (el.scrollLeft >= half) {
          // jump back by half to create the infinite loop illusion
          el.scrollLeft -= half;
        }
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [pause]);

  const duplicated = [...testimonials, ...testimonials];

  return (
    <div
      id="testimonials"
      className="min-h-screen bg-black flex flex-col gap-12 justify-center items-center px-4"
    >
      {/* Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-lime-300 mb-10 tracking-widest"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        TESTIMONIALS
      </motion.h1>
      <div className="relative h-full w-full">
        <div className="absolute left-0 w-1/3 h-full bg-[linear-gradient(to_right,_rgba(0,0,0,1)_0%,_rgba(0,0,0,0.8)_25%,_rgba(0,0,0,0.5)_50%,_rgba(0,0,0,0.2)_75%,_rgba(0,0,0,0)_100%)]"></div>
        <div className="absolute right-0 w-1/3 h-full bg-[linear-gradient(to_left,_rgba(0,0,0,1)_0%,_rgba(0,0,0,0.8)_25%,_rgba(0,0,0,0.5)_50%,_rgba(0,0,0,0.2)_75%,_rgba(0,0,0,0)_100%)]"></div>
        <div className="absolute -top-4 h-10 w-full rounded-[100%] bg-black"></div>
        <div className="absolute -bottom-4 h-10 w-full rounded-[100%] bg-black"></div>

        <div
          ref={scrollerRef}
          onMouseEnter={() => setPause(true)}
          onMouseLeave={() => setPause(false)}
          className="w-full grid grid-flow-col auto-cols-min gap-6 overflow-x-auto hide-scrollbar"
        >
          {duplicated.map((testimonial, idx) => (
            <div
              key={`${testimonial.id}-${idx}`}
              className="min-w-72 h-full flex flex-col bg-gradient-to-br from-lime-300 via-lime-400 to-lime-500 shadow-2xl px-6 py-10"
            >
              {/* GROWING TEXT BLOCK */}
              <div className="grow py-2">
                <p className="text-black/20 leading-5 text-4xl font-serif">"</p>
                <p className="text-black text-sm leading-relaxed italic">
                  {testimonial.text}
                </p>
              </div>

              {/* AUTHOR BLOCK */}
              <div className="mt-4 pt-4 border-t border-black/10">
                <div className="flex flex-col items-end">
                  
                    <h3 className="text-black font-bold text-base">
                      {testimonial.name}
                    </h3>
                    <p className="text-black/70 text-xs font-semibold">
                      {testimonial.location}
                    </p>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Get in Touch Button */}
      <motion.button
        className="bg-lime-300 hover:bg-lime-400 text-black px-10 py-4 rounded-2xl text-lg cursor-pointer font-bold tracking-wider transition-all duration-300 custom-box-shadow transform hover:scale-105"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        whileTap={{ scale: 0.95 }}
      >
        GET IN TOUCH
      </motion.button>
    </div>
  );
};

export default Testimonials;
