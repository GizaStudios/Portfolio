"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect, useRef } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaMobile,
  FaAppStore,
  FaGooglePlay,
  FaUnity,
  FaPython,
  FaJs,
  FaHtml5,
  FaCode,
  FaArrowUp,
  FaFileDownload,
  FaQuoteLeft,
  FaGamepad,
  FaPuzzlePiece,
  FaBolt,
  FaLayerGroup,
} from "react-icons/fa";
import {
  SiElectron,
  SiFlutter,
  SiFirebase,
  SiSupabase,
  SiOpenai,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { CheckIcon } from "@heroicons/react/24/outline";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.2,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.2,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.5,
    },
  },
};

// Custom hook for tilt effect
const useTilt = (
  ref: React.RefObject<HTMLDivElement>,
  maxTilt: number = 15,
  isGridItem: boolean = false,
  isReference: boolean = false
) => {
  useEffect(() => {
    const elem = ref.current;
    if (!elem) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = elem.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const centerX = width / 2;
      const centerY = height / 2;

      let tiltX, tiltY;

      if (isGridItem) {
        // Grid items: Reverse Y tilt only, less noticeable
        tiltX = -((y - centerY) / centerY) * maxTilt;
        tiltY = ((x - centerX) / centerX) * maxTilt; // Reversed Y tilt
      } else if (isReference) {
        // References: Reverse X tilt only
        tiltX = -((y - centerY) / centerY) * maxTilt; // Reversed X tilt
        tiltY = -((centerX - x) / centerX) * maxTilt;
      } else {
        // Normal behavior
        tiltX = -((y - centerY) / centerY) * maxTilt;
        tiltY = ((centerX - x) / centerX) * maxTilt;
      }

      elem.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
    };

    const handleMouseLeave = () => {
      elem.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    };

    const handleMouseEnter = () => {
      elem.style.transition = "transform 0.1s ease-out";
    };

    elem.addEventListener("mousemove", handleMouseMove as EventListener);
    elem.addEventListener("mouseleave", handleMouseLeave);
    elem.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      if (elem) {
        elem.removeEventListener("mousemove", handleMouseMove as EventListener);
        elem.removeEventListener("mouseleave", handleMouseLeave);
        elem.removeEventListener("mouseenter", handleMouseEnter);
      }
    };
  }, [ref, maxTilt, isGridItem, isReference]);
};

// TiltCard component for feature items
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  gridItem?: boolean;
  isReference?: boolean;
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  gridItem = false,
  isReference = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // Reduced tilt for grid items, pass type information to useTilt
  useTilt(ref, gridItem ? 20 : 15, gridItem, isReference);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Handle scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Toggle video visibility
  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="min-h-screen flex items-center justify-center relative"
        style={{
          backgroundImage: "url(/Background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          position: "relative",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.3)",
          }}
        ></div>
        <div className="container text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-secondary-900">
              Devin Emmanuel Morgan
            </h1>
            <p className="text-xl md:text-2xl text-secondary-600 max-w-2xl mx-auto">
              Software Developer | Game Developer | Full Stack Engineer
            </p>
            <motion.div
              className="flex flex-wrap justify-center gap-4 mt-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <a
                href="mailto:morgandevin1029@gmail.com"
                className="btn btn-primary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <FaEnvelope className="mr-2" /> Contact Me
              </a>
              <a
                href="/DevinMorganResume.pdf"
                className="btn btn-secondary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFileDownload className="mr-2" /> Download Resume
              </a>
            </motion.div>
            <div className="flex justify-center mt-4">
              <p className="flex items-center text-secondary-600">
                <FaMapMarkerAlt className="mr-2" /> Hampton, Virginia, United
                States
              </p>
            </div>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <motion.div
            className="flex flex-col items-center text-secondary-600"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.6,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 0.4,
            }}
          >
            <p className="text-sm mb-2">Scroll Down</p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 16L19 9L17.59 7.59L12 13.17L6.41 7.59L5 9L12 16Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* About Section - Shorter, more concise */}
      <section className="section bg-white py-12">
        <div className="container">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
            <p className="text-lg text-secondary-600 mb-8">
              Software developer specializing in application and game
              development, with a degree in Computer Science from Old Dominion
              University. I combine technical expertise with creativity to build
              intuitive, impactful digital experiences. My portfolio showcases
              projects across mobile, game, and full-stack web development.
            </p>

            {/* Giza Studios Company Button */}
            <div className="flex justify-center">
              <a
                href="https://www.gizastudios.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-6 px-6 py-6 bg-white hover:bg-gray-50 text-secondary-900 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
              >
                {/* Logo with animated glowing gradient border */}
                <div className="relative">
                  {/* Compact glowing gradient border layers */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 via-purple-500 via-pink-500 to-blue-500 rounded-full opacity-100 blur-sm animate-gradient-glow transition-opacity duration-300 shadow-2xl"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 via-purple-500 via-pink-500 to-blue-500 rounded-full opacity-90 group-hover:opacity-100 animate-gradient-spin transition-opacity duration-300"></div>
                  {/* Logo container */}
                  <div className="relative bg-white rounded-full p-2 shadow-sm">
                    <img
                      src="/GizaStudiosLogoCircle.png"
                      alt="Giza Studios"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  </div>
                </div>

                {/* Text content */}
                <div className="text-left">
                  <div className="text-lg font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors duration-300">
                    Visit Giza Studios
                  </div>
                  <div className="text-sm text-secondary-500 group-hover:text-secondary-600 transition-colors duration-300">
                    Our Company Website
                  </div>
                </div>

                {/* Arrow icon */}
                <div className="text-primary-600 group-hover:text-primary-700 group-hover:translate-x-1 transform transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section - Now prioritized */}
      <section className="section bg-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Featured Projects
            </h2>

            {/* Genesis AI Project */}
            <motion.div variants={fadeInUp} className="mb-20">
              <div
                className="card overflow-hidden relative"
                style={{
                  backgroundImage: "url(/GenArt.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative z-10 p-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Genesis AI
                  </h3>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                      <p className="text-gray-200 text-left mb-6">
                        The ultimate AI chatbot app designed to unleash
                        imagination, boost productivity, and simplify your day.
                        Powered by multiple advanced AI models including GPT-4o,
                        Gemini 2.0, DeepSeek, and Claude, Genesis combines
                        cutting-edge tools with intuitive features for a
                        versatile and engaging experience.
                      </p>
                      <div className="text-left mb-6">
                        <h4 className="font-semibold text-gray-100 mb-2">
                          Key Features:
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-200">
                          <li>
                            Image Generator: Create stunning visuals from text
                            prompts
                          </li>
                          <li>
                            Web Chat: Access real-time information from the
                            internet
                          </li>
                          <li>
                            Image & Link Insights: Analyze uploads for text
                            extraction and summaries
                          </li>
                          <li>Speech-to-Text: Voice-controlled interaction</li>
                          <li>Specialized AI Assistants for various tasks</li>
                          <li>Role-Playing & Creative Writing tools</li>
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6 justify-start">
                        {[
                          "Flutter",
                          "Supabase",
                          "Firebase",
                          "Multiple AI APIs",
                        ].map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-white bg-opacity-20 text-white rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3 justify-start">
                        <a
                          href="https://www.genesisai.chat/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
                        >
                          <FaCode className="mr-2" /> Landing Page
                        </a>
                        <a
                          href="https://apps.apple.com/us/app/id6670447214"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
                        >
                          <FaAppStore className="mr-2" /> App Store
                        </a>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.gizastudios.genesisai"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
                        >
                          <FaGooglePlay className="mr-2" /> Google Play
                        </a>
                      </div>
                    </div>
                    <div className="md:w-1/2 flex items-center justify-center mt-6 md:mt-0">
                      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                        <TiltCard
                          gridItem={true}
                          className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center hover:bg-opacity-20"
                        >
                          <FaCode className="text-4xl text-white mb-2" />
                          <p className="text-sm text-center text-white">
                            GPT-4o & Claude
                          </p>
                        </TiltCard>
                        <TiltCard
                          gridItem={true}
                          className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center hover:bg-opacity-20"
                        >
                          <SiOpenai className="text-4xl text-white mb-2" />
                          <p className="text-sm text-center text-white">
                            Image Generation
                          </p>
                        </TiltCard>
                        <TiltCard
                          gridItem={true}
                          className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center hover:bg-opacity-20"
                        >
                          <SiFirebase className="text-4xl text-white mb-2" />
                          <p className="text-sm text-center text-white">
                            Web Search
                          </p>
                        </TiltCard>
                        <TiltCard
                          gridItem={true}
                          className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center hover:bg-opacity-20"
                        >
                          <SiSupabase className="text-4xl text-white mb-2" />
                          <p className="text-sm text-center text-white">
                            File Analysis
                          </p>
                        </TiltCard>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Plasma Puck Unlimited */}
            <motion.div variants={fadeInUp} className="mb-20">
              <div
                className="card overflow-hidden relative"
                style={{
                  backgroundImage: "url(/PPUArt.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative z-10 p-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Plasma Puck Unlimited
                  </h3>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                      <p className="text-gray-200 text-left mb-6">
                        A fast-paced mobile air hockey game with over 20,000
                        downloads, recognized and featured twice by the iOS App
                        Store. Plasma Puck Unlimited offers an exciting arcade
                        experience with vibrant visuals and intuitive touch
                        controls.
                      </p>
                      <div className="text-left mb-6">
                        <h4 className="font-semibold text-gray-100 mb-2">
                          Game Features:
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-200">
                          <li>Multiple game modes and difficulty levels</li>
                          <li>Unique power-ups and special abilities</li>
                          <li>Global leaderboards</li>
                          <li>Stunning neon visual effects</li>
                          <li>Optimized for both iOS and Android platforms</li>
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6 justify-start">
                        {[
                          "Unity",
                          "C#",
                          "Mobile Development",
                          "Game Design",
                        ].map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-white bg-opacity-20 text-white rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3 justify-start">
                        <a
                          href="https://apps.apple.com/us/app/id6479285186"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
                        >
                          <FaAppStore className="mr-2" /> App Store
                        </a>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.GizaStudios.PlasmaPuckUnlimited"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
                        >
                          <FaGooglePlay className="mr-2" /> Google Play
                        </a>
                      </div>
                    </div>
                    <div className="md:w-1/2 flex items-center justify-center mt-6 md:mt-0">
                      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                        <TiltCard
                          gridItem={true}
                          className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center hover:bg-opacity-20"
                        >
                          <FaGamepad className="text-4xl text-white mb-2" />
                          <p className="text-sm text-center text-white">
                            7 Unique Game Modes
                          </p>
                        </TiltCard>
                        <TiltCard
                          gridItem={true}
                          className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center hover:bg-opacity-20"
                        >
                          <FaPuzzlePiece className="text-4xl text-white mb-2" />
                          <p className="text-sm text-center text-white">
                            Level Editor
                          </p>
                        </TiltCard>
                        <TiltCard
                          gridItem={true}
                          className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center hover:bg-opacity-20"
                        >
                          <FaBolt className="text-4xl text-white mb-2" />
                          <p className="text-sm text-center text-white">
                            12 Wild Power-ups
                          </p>
                        </TiltCard>
                        <TiltCard
                          gridItem={true}
                          className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center hover:bg-opacity-20"
                        >
                          <FaLayerGroup className="text-4xl text-white mb-2" />
                          <p className="text-sm text-center text-white">
                            400+ Premade Levels
                          </p>
                        </TiltCard>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tello Drone Coding Lab */}
            <motion.div variants={fadeInUp}>
              <div className="card bg-white shadow-xl overflow-hidden">
                <div className="p-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">
                    Drone Coding Labs
                  </h3>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                      <p className="text-secondary-600 text-left mb-6">
                        A series of labs designed to teach programming through
                        controlling various types of drones. This structured
                        learning environment enables students to write and
                        execute Python code to control drones, progressing from
                        basic movements to advanced swarm coordination across
                        four comprehensive labs.
                      </p>
                      <div className="text-left mb-6">
                        <h4 className="font-semibold text-primary-600 mb-2">
                          Lab Structure:
                        </h4>
                        <ul className="list-disc list-inside space-y-3 text-secondary-600">
                          <li>
                            <span className="font-semibold">
                              Lab 1: Intro to Coding Drones
                            </span>{" "}
                            - Teaches programming fundamentals through
                            block-based coding and basic Python, covering
                            takeoff, landing, and simple maneuvers.
                          </li>
                          <li>
                            <span className="font-semibold">
                              Lab 2: Drone Control and Navigation
                            </span>{" "}
                            - Transitions students from block-based programming
                            to actual Python code, teaching the basics of Python
                            syntax while controlling drone movements and
                            navigation.
                          </li>
                          <li>
                            <span className="font-semibold">
                              Lab 3: Mission Pad Detection
                            </span>{" "}
                            - Focuses on precise positioning using mission pads,
                            specialized navigation commands, and automated
                            mission planning.
                          </li>
                          <li>
                            <span className="font-semibold">
                              Lab 4: Swarm Coding
                            </span>{" "}
                            - Teaches multi-drone programming, networking,
                            synchronization techniques, and choreographed flight
                            routines.
                          </li>
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6 justify-start">
                        {[
                          "Python",
                          "Drone Programming",
                          "Educational Software",
                          "TelloSwarm API",
                        ].map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3 justify-start mb-6">
                        <a
                          href="https://www.dronecodinglabs.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn bg-primary-600 hover:bg-primary-700 text-white"
                        >
                          <FaCode className="mr-2" /> Visit Website
                        </a>
                        <a
                          href="https://github.com/GizaStudios/DroneCodingLabs"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn bg-primary-600 hover:bg-primary-700 text-white"
                        >
                          <FaGithub className="mr-2" /> View on GitHub
                        </a>

                        <button
                          onClick={toggleVideo}
                          className="btn bg-primary-600 hover:bg-primary-700 text-white flex items-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Watch Demo
                        </button>
                      </div>
                    </div>
                    <div className="md:w-1/2">
                      <img
                        src="/DroneCamp.jpg"
                        alt="Drone Coding Camp"
                        className="rounded-lg shadow-lg object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Video Modal */}
            {showVideo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: 0.4,
                    ease: "easeInOut",
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.3,
                    ease: "easeInOut",
                  },
                }}
                className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
                onClick={toggleVideo}
              >
                <motion.div
                  className="bg-white rounded-lg overflow-hidden max-w-4xl w-full shadow-2xl"
                  onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
                  initial={{ scale: 0.9, y: 20, opacity: 0 }}
                  animate={{
                    scale: 1,
                    y: 0,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                      delay: 0.1,
                    },
                  }}
                  exit={{
                    scale: 0.9,
                    y: 20,
                    opacity: 0,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="p-4 bg-primary-50 flex justify-between items-center border-b">
                    <h3 className="text-xl font-semibold text-primary-600">
                      Demo: Tello Drone Coding Lab
                    </h3>
                    <button
                      onClick={toggleVideo}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="relative" style={{ paddingTop: "56.25%" }}>
                      <video
                        src="/CodingLabDemo.mp4"
                        controls
                        autoPlay
                        preload="metadata"
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Skills Section - Condensed */}
      <section className="section bg-secondary-50">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-10">
              Technical Skills
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
              {/* Software Development */}
              <motion.div variants={fadeInUp} className="card">
                <h3 className="text-xl font-bold text-primary-600 mb-4">
                  Software Development
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <FaPython className="text-xl mr-2 text-primary-500" />
                    <span>Python</span>
                  </div>
                  <div className="flex items-center">
                    <FaJs className="text-xl mr-2 text-primary-500" />
                    <span>JavaScript</span>
                  </div>
                  <div className="flex items-center">
                    <FaHtml5 className="text-xl mr-2 text-primary-500" />
                    <span>HTML</span>
                  </div>
                  <div className="flex items-center">
                    <TbBrandCSharp className="text-xl mr-2 text-primary-500" />
                    <span>C#</span>
                  </div>
                </div>
              </motion.div>

              {/* Game Development */}
              <motion.div variants={fadeInUp} className="card">
                <h3 className="text-xl font-bold text-primary-600 mb-4">
                  Game Development
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center">
                    <FaUnity className="text-xl mr-2 text-primary-500" />
                    <span>Unity Game Engine</span>
                  </div>
                  <div className="flex items-center">
                    <FaCode className="text-xl mr-2 text-primary-500" />
                    <span>Performance Optimization</span>
                  </div>
                  <div className="flex items-center">
                    <FaCode className="text-xl mr-2 text-primary-500" />
                    <span>User Experience Design</span>
                  </div>
                </div>
              </motion.div>

              {/* App & Full-Stack Development */}
              <motion.div variants={fadeInUp} className="card">
                <h3 className="text-xl font-bold text-primary-600 mb-4">
                  App & Full-Stack
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <SiFlutter className="text-xl mr-2 text-primary-500" />
                    <span>FlutterFlow</span>
                  </div>
                  <div className="flex items-center">
                    <SiFirebase className="text-xl mr-2 text-primary-500" />
                    <span>Firebase</span>
                  </div>
                  <div className="flex items-center">
                    <SiSupabase className="text-xl mr-2 text-primary-500" />
                    <span>Supabase</span>
                  </div>
                  <div className="flex items-center">
                    <SiElectron className="text-xl mr-2 text-primary-500" />
                    <span>Electron</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience & Education Combined - More concise */}
      <section className="section bg-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Experience Column */}
              <div>
                <h2 className="text-3xl font-bold mb-6 text-center">
                  Experience
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "Data Entry Specialist and Program Developer",
                      company: "Virginia Space Grant Consortium",
                      period: "June 2024 - Present",
                      description:
                        "Developed software applications for controlling small drones and providing high school students with foundational programming education.",
                    },
                    {
                      title: "Technology Analyst",
                      company: "ODU Procurement Services",
                      period: "September 2023 - Present",
                      description:
                        "Evaluated surplus hardware to determine quality and potential for resale. Explored options for refurbishing or recovering hardware to maximize value.",
                    },
                    {
                      title: "VICEROY Cybersecurity Research",
                      company: "DoD Funded | Old Dominion University",
                      period: "November 2024 - Present",
                      description:
                        "Research on GPS spoofing detection using transformer-based AI models. Applied machine learning techniques to real-world cybersecurity challenges.",
                    },
                  ].map((job, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="card text-left p-5"
                    >
                      <h3 className="text-lg font-semibold">{job.title}</h3>
                      <p className="text-primary-600">{job.company}</p>
                      <p className="text-secondary-500 text-sm mb-2">
                        {job.period}
                      </p>
                      <p className="text-secondary-600 text-sm">
                        {job.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Education Column */}
              <div>
                <h2 className="text-3xl font-bold mb-6 text-center">
                  Education
                </h2>
                <div className="space-y-6">
                  <motion.div
                    variants={fadeInUp}
                    className="card text-left p-5"
                  >
                    <h3 className="text-lg font-semibold">
                      BS in Computer Science
                    </h3>
                    <p className="text-primary-600">Old Dominion University</p>
                    <p className="text-secondary-500 text-sm mb-2">
                      Graduated: May 2025 | GPA: 3.39/4.0
                    </p>
                    <p className="text-secondary-600 text-sm">
                      Credits Earned: 128 Semester Hours
                    </p>
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    className="card text-left p-5"
                  >
                    <h3 className="text-lg font-semibold">Certifications</h3>
                    <ul className="text-secondary-600 space-y-1 mt-2 text-sm">
                      <li>Drone Flying Certificate - Completed July 2024</li>
                      <li>
                        <a
                          href="/AWS Certified Cloud Practitioner certificate.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 hover:underline"
                        >
                          AWS Certified Cloud Practitioner - April 2025
                        </a>
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    className="card text-left p-5"
                  >
                    <h3 className="text-lg font-semibold">
                      Community Involvement
                    </h3>
                    <p className="text-primary-600">
                      Virginia Peninsula Foodbank
                    </p>
                    <p className="text-secondary-600 text-sm">
                      Dedicated volunteer with over 80 hours contributed,
                      supporting local initiatives to combat food insecurity.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section bg-secondary-50">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-secondary-600 mb-8">
              Interested in working together? Let's discuss your project!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="mailto:morgandevin1029@gmail.com"
                className="btn btn-primary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEnvelope className="mr-2" /> morgandevin1029@gmail.com
              </motion.a>
              <motion.a
                href="tel:7573392700"
                className="btn btn-secondary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaMobile className="mr-2" /> 757-339-2700
              </motion.a>
              <motion.div className="flex gap-4 mt-4 w-full justify-center">
                <a
                  href="https://github.com/GizaStudios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-secondary"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/devin-morgan-76764231a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-secondary"
                >
                  <FaLinkedin />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-6">
        <div className="container text-center">
          <p>
            © {new Date().getFullYear()} Devin Emmanuel Morgan. All rights
            reserved.
          </p>
        </div>
      </footer>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-8 right-8 p-3 rounded-full bg-primary-600 text-white shadow-lg z-50"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3, delay: 0.1 }}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
